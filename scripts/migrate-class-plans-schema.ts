/**
 * One-time migration for class_plans schema changes (text price → numeric, new columns).
 * Run: pnpm migrate:class-plans
 */
import pg from "pg";

const { Client } = pg;

async function columnExists(
	client: pg.Client,
	columnName: string
): Promise<boolean> {
	const result = await client.query(
		`
		SELECT 1
		FROM information_schema.columns
		WHERE table_schema = 'public'
			AND table_name = 'class_plans'
			AND column_name = $1
		`,
		[columnName]
	);
	return (result.rowCount ?? 0) > 0;
}

async function columnType(
	client: pg.Client,
	columnName: string
): Promise<string | null> {
	const result = await client.query(
		`
		SELECT data_type
		FROM information_schema.columns
		WHERE table_schema = 'public'
			AND table_name = 'class_plans'
			AND column_name = $1
		`,
		[columnName]
	);
	return result.rows[0]?.data_type ?? null;
}

async function migrate() {
	const connectionString = process.env.DATABASE_URL;
	if (!connectionString) {
		throw new Error("DATABASE_URL is not set");
	}

	const needsSsl =
		connectionString.includes("sslmode=") ||
		connectionString.includes("neon.tech");

	const client = new Client({
		connectionString,
		ssl: needsSsl ? { rejectUnauthorized: false } : undefined,
	});

	await client.connect();

	const tableExists = await client.query(
		`
		SELECT 1
		FROM information_schema.tables
		WHERE table_schema = 'public' AND table_name = 'class_plans'
		`
	);

	if ((tableExists.rowCount ?? 0) === 0) {
		console.log("class_plans table does not exist yet — nothing to migrate.");
		await client.end();
		return;
	}

	console.log("Migrating class_plans schema...");

	// class_count from legacy "classes" text (e.g. "4 Classes") or default 1
	if (!(await columnExists(client, "class_count"))) {
		await client.query(`
			ALTER TABLE "class_plans"
			ADD COLUMN "class_count" numeric;
		`);

		if (await columnExists(client, "classes")) {
			await client.query(`
				UPDATE "class_plans"
				SET "class_count" = COALESCE(
					NULLIF(substring("classes" from '^[0-9]+'), '')::numeric,
					1
				)
				WHERE "class_count" IS NULL;
			`);
		} else {
			await client.query(`
				UPDATE "class_plans" SET "class_count" = 1 WHERE "class_count" IS NULL;
			`);
		}

		await client.query(`
			ALTER TABLE "class_plans"
			ALTER COLUMN "class_count" SET NOT NULL;
		`);
		console.log("Added class_count");
	}

	// max_slots — default 1; tiered plans may need manual fix in admin
	if (!(await columnExists(client, "max_slots"))) {
		await client.query(`
			ALTER TABLE "class_plans"
			ADD COLUMN "max_slots" numeric NOT NULL DEFAULT 1;
		`);
		console.log("Added max_slots");
	}

	if (await columnExists(client, "class_count")) {
		await client.query(`
			UPDATE "class_plans"
			SET "max_slots" = CASE
				WHEN "class_count" >= 12 THEN 3
				WHEN "class_count" >= 8 THEN 2
				ELSE 1
			END;
		`);
		console.log("Synced max_slots from class_count");
	}

	// price: varchar/text → numeric
	const priceType = await columnType(client, "price");
	if (priceType && priceType !== "numeric") {
		await client.query(`
			ALTER TABLE "class_plans"
			ALTER COLUMN "price" TYPE numeric
			USING NULLIF(regexp_replace("price"::text, '[^0-9.]', '', 'g'), '')::numeric;
		`);
		console.log("Converted price to numeric");
	}

	if (!(await columnExists(client, "price_sub_label"))) {
		await client.query(`
			ALTER TABLE "class_plans"
			ADD COLUMN "price_sub_label" varchar;
		`);
		console.log("Added price_sub_label");
	}

	// Drop removed columns
	for (const col of ["classes", "max_students", "is_popular"]) {
		if (await columnExists(client, col)) {
			await client.query(`ALTER TABLE "class_plans" DROP COLUMN "${col}";`);
			console.log(`Dropped legacy column ${col}`);
		}
	}

	await client.end();
	console.log("class_plans migration complete.");
}

migrate().catch((error) => {
	console.error("Migration failed:", error);
	process.exit(1);
});

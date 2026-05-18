import config from "@payload-config";
import { getPayload } from "payload";

type SeedPlan = {
	planName: string;
	deliveryMode: "virtual" | "physical";
	pricingType: "group" | "private";
	classCount: number;
	maxSlots: number;
	frequency: string;
	price: number;
	isBestValue?: boolean;
	priceSubLabel?: string;
};

const SEED_PLANS: SeedPlan[] = [
	// Virtual group
	{
		planName: "Starter",
		deliveryMode: "virtual",
		pricingType: "group",
		classCount: 4,
		maxSlots: 1,
		frequency: "1 Per Week",
		price: 180,
	},
	{
		planName: "Regular",
		deliveryMode: "virtual",
		pricingType: "group",
		classCount: 8,
		maxSlots: 2,
		frequency: "2 Per Week",
		price: 300,
		isBestValue: true,
	},
	{
		planName: "Intensive",
		deliveryMode: "virtual",
		pricingType: "group",
		classCount: 12,
		maxSlots: 3,
		frequency: "3 Per Week",
		price: 420,
	},
	// Virtual private
	{
		planName: "Starter",
		deliveryMode: "virtual",
		pricingType: "private",
		classCount: 4,
		maxSlots: 1,
		frequency: "1 Per Week",
		price: 350,
	},
	{
		planName: "Regular",
		deliveryMode: "virtual",
		pricingType: "private",
		classCount: 8,
		maxSlots: 2,
		frequency: "2 Per Week",
		price: 650,
		isBestValue: true,
	},
	{
		planName: "Intensive",
		deliveryMode: "virtual",
		pricingType: "private",
		classCount: 12,
		maxSlots: 3,
		frequency: "3 Per Week",
		price: 950,
	},
	// Physical group
	{
		planName: "Starter",
		deliveryMode: "physical",
		pricingType: "group",
		classCount: 4,
		maxSlots: 1,
		frequency: "1 Per Week",
		price: 250,
	},
	{
		planName: "Regular",
		deliveryMode: "physical",
		pricingType: "group",
		classCount: 8,
		maxSlots: 2,
		frequency: "2 Per Week",
		price: 450,
		isBestValue: true,
	},
	{
		planName: "Intensive",
		deliveryMode: "physical",
		pricingType: "group",
		classCount: 12,
		maxSlots: 3,
		frequency: "3 Per Week",
		price: 600,
	},
	// Physical private
	{
		planName: "1 Person",
		deliveryMode: "physical",
		pricingType: "private",
		classCount: 1,
		maxSlots: 1,
		frequency: "Per Session",
		price: 250,
	},
	{
		planName: "2-3 Person",
		deliveryMode: "physical",
		pricingType: "private",
		classCount: 1,
		maxSlots: 1,
		frequency: "Per Person",
		price: 200,
		priceSubLabel: "Per Person",
	},
];

async function seed() {
	const payload = await getPayload({ config });

	const { docs: existing } = await payload.find({
		collection: "class-plans",
		limit: 1,
		pagination: false,
	});

	if (existing.length > 0) {
		console.log(
			`Skipping seed: ${existing.length}+ class plan(s) already exist. Delete them first to re-seed.`
		);
		process.exit(0);
	}

	for (const plan of SEED_PLANS) {
		await payload.create({
			collection: "class-plans",
			data: plan,
		});
		console.log(
			`Created: ${plan.planName} (${plan.deliveryMode} / ${plan.pricingType})`
		);
	}

	console.log(`Seeded ${SEED_PLANS.length} class plans.`);
	process.exit(0);
}

seed().catch((error) => {
	console.error("Seed failed:", error);
	process.exit(1);
});

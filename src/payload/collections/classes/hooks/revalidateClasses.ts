import type {
	CollectionAfterChangeHook,
	CollectionAfterDeleteHook,
} from "payload";

async function safeRevalidatePath(path: string): Promise<void> {
	try {
		const { revalidatePath } = await import("next/cache");
		revalidatePath(path);
	} catch (error) {
		console.error(`Failed to revalidate path "${path}"`, error);
	}
}

async function revalidateClassesPages() {
	await safeRevalidatePath("/classes");
	await safeRevalidatePath("/sitemap.xml");
}

export const revalidateClassesAfterChange: CollectionAfterChangeHook = async ({
	doc,
}) => {
	await revalidateClassesPages();
	if (typeof doc?.slug === "string" && doc.slug.length > 0) {
		await safeRevalidatePath(`/classes/${doc.slug}`);
	}
	return doc;
};

export const revalidateClassesAfterDelete: CollectionAfterDeleteHook = async ({
	doc,
}) => {
	await revalidateClassesPages();
	if (typeof doc?.slug === "string" && doc.slug.length > 0) {
		await safeRevalidatePath(`/classes/${doc.slug}`);
	}
	return doc;
};

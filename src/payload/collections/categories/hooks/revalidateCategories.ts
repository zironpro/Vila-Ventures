import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";

async function safeRevalidatePath(path: string): Promise<void> {
	try {
		const { revalidatePath } = await import("next/cache");
		revalidatePath(path);
	} catch (error) {
		console.error(`Failed to revalidate path "${path}"`, error);
	}
}

async function revalidateCategoryPages() {
	await safeRevalidatePath("/shop");
	await safeRevalidatePath("/sitemap.xml");
}

export const revalidateCategoriesAfterChange: CollectionAfterChangeHook = async ({
	doc,
}) => {
	await revalidateCategoryPages();
	return doc;
};

export const revalidateCategoriesAfterDelete: CollectionAfterDeleteHook = async ({
	doc,
}) => {
	await revalidateCategoryPages();
	return doc;
};

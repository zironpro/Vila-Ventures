import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";

async function safeRevalidatePath(path: string): Promise<void> {
	try {
		const { revalidatePath } = await import("next/cache");
		revalidatePath(path);
	} catch (error) {
		console.error(`Failed to revalidate path "${path}"`, error);
	}
}

async function revalidateFaqPages() {
	await safeRevalidatePath("/");
	await safeRevalidatePath("/sitemap.xml");
}

export const revalidateFaqsAfterChange: CollectionAfterChangeHook = async ({ doc }) => {
	await revalidateFaqPages();
	return doc;
};

export const revalidateFaqsAfterDelete: CollectionAfterDeleteHook = async ({ doc }) => {
	await revalidateFaqPages();
	return doc;
};

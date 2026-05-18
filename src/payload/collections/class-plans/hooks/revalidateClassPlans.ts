import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";

async function safeRevalidatePath(path: string): Promise<void> {
	try {
		const { revalidatePath } = await import("next/cache");
		revalidatePath(path);
	} catch (error) {
		console.error(`Failed to revalidate path "${path}"`, error);
	}
}

async function revalidateClassPlanPages() {
	await safeRevalidatePath("/");
	await safeRevalidatePath("/classes");
	await safeRevalidatePath("/sitemap.xml");
}

export const revalidateClassPlansAfterChange: CollectionAfterChangeHook = async ({
	doc,
}) => {
	await revalidateClassPlanPages();
	return doc;
};

export const revalidateClassPlansAfterDelete: CollectionAfterDeleteHook = async ({
	doc,
}) => {
	await revalidateClassPlanPages();
	return doc;
};

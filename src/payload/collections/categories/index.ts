import type { CollectionConfig } from "payload";
import { slugField } from "payload";

import { adminOnly } from "@/payload/access/shared/adminOnly";
import {
	revalidateCategoriesAfterChange,
	revalidateCategoriesAfterDelete,
} from "@/payload/collections/categories/hooks/revalidateCategories";
import { ADMIN_GROUPS } from "@/payload/constants/admin-groups";

export const Categories: CollectionConfig = {
	slug: "categories",
	access: {
		create: adminOnly,
		delete: adminOnly,
		read: () => true,
		update: adminOnly,
	},
	admin: {
		useAsTitle: "title",
		group: ADMIN_GROUPS.SHOP,
	},
	hooks: {
		afterChange: [revalidateCategoriesAfterChange],
		afterDelete: [revalidateCategoriesAfterDelete],
	},
	fields: [
		{
			name: "title",
			type: "text",
			required: true,
			index: true,
		},
		slugField({
			position: undefined,
		}),
	],
};

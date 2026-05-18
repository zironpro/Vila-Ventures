import type { CollectionConfig } from "payload";
import { slugField } from "payload";

import { adminOnly } from "@/payload/access/shared/adminOnly";
import { ADMIN_GROUPS } from "@/payload/constants/admin-groups";

export const Tags: CollectionConfig = {
	slug: "tags",
	access: {
		create: adminOnly,
		delete: adminOnly,
		read: () => true,
		update: adminOnly,
	},
	admin: {
		hidden: true,
		useAsTitle: "title",
		group: ADMIN_GROUPS.SHOP,
	},
	fields: [
		{
			name: "title",
			type: "text",
			required: true,
		},
		slugField({
			position: undefined,
		}),
	],
};

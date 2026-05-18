import type { CollectionConfig } from "payload";

import { adminOnly } from "@/payload/access/shared/adminOnly";
import { adminOnlyFieldAccess } from "@/payload/access/shared/adminOnlyFieldAccess";
import { checkRole } from "@/payload/access/shared/checkRole";
import { publicAccess } from "@/payload/access/shared/publicAccess";
import { adminOrSelf } from "@/payload/access/users/adminOrSelf";

import { ADMIN_GROUPS } from "@/payload/constants/admin-groups";

import { ensureFirstUserIsAdmin } from "./hooks/ensureFirstUserIsAdmin";

export const Users: CollectionConfig = {
	slug: "users",
	access: {
		admin: ({ req: { user } }) => checkRole(["admin"], user),
		create: publicAccess,
		delete: adminOnly,
		read: adminOrSelf,
		unlock: adminOnly,
		update: adminOrSelf,
	},
	admin: {
		group: ADMIN_GROUPS.USERS,
		defaultColumns: ["name", "email", "roles"],
		useAsTitle: "name",
	},
	auth: {
		tokenExpiration: 1209600,
	},
	fields: [
		{
			name: "name",
			type: "text",
		},
		{
			name: "roles",
			type: "select",
			access: {
				create: adminOnlyFieldAccess,
				read: adminOnlyFieldAccess,
				update: adminOnlyFieldAccess,
			},
			defaultValue: ["customer"],
			hasMany: true,
			hooks: {
				beforeChange: [ensureFirstUserIsAdmin],
			},
			options: [
				{
					label: "admin",
					value: "admin",
				},
				{
					label: "customer",
					value: "customer",
				},
			],
		},
		{
			name: "orders",
			type: "join",
			collection: "orders",
			on: "customer",
			admin: {
				allowCreate: false,
				defaultColumns: ["id", "createdAt", "total", "currency", "items"],
			},
		},
		{
			name: "cart",
			type: "join",
			collection: "carts",
			on: "customer",
			admin: {
				allowCreate: false,
				defaultColumns: ["id", "createdAt", "total", "currency", "items"],
			},
		},
		{
			name: "addresses",
			type: "join",
			collection: "addresses",
			on: "customer",
			admin: {
				allowCreate: false,
				defaultColumns: ["id"],
			},
		},
	],
};

import type { CollectionConfig } from "payload";

import { adminOnly } from "@/payload/access/shared/adminOnly";
import {
	revalidateClassPlansAfterChange,
	revalidateClassPlansAfterDelete,
} from "@/payload/collections/class-plans/hooks/revalidateClassPlans";
import { ADMIN_GROUPS } from "@/payload/constants/admin-groups";

export const ClassPlans: CollectionConfig = {
	slug: "class-plans",
	labels: {
		singular: "Class Plan",
		plural: "Class Plans",
	},
	access: {
		create: adminOnly,
		delete: adminOnly,
		read: () => true,
		update: adminOnly,
	},
	admin: {
		useAsTitle: "planName",
		group: ADMIN_GROUPS.CLASSES_BOOKING,
		description:
			"Pricing plans shown in the booking modal. Filtered by delivery mode (virtual/physical) and format (group/private).",
		defaultColumns: [
			"planName",
			"deliveryMode",
			"pricingType",
			"classCount",
			"price",
		],
	},
	hooks: {
		afterChange: [revalidateClassPlansAfterChange],
		afterDelete: [revalidateClassPlansAfterDelete],
	},
	orderable: true,
	defaultPopulate: {
		planName: true,
		pricingType: true,
		deliveryMode: true,
		classCount: true,
		frequency: true,
		price: true,
		maxSlots: true,
		priceSubLabel: true,
		isBestValue: true,
	},
	fields: [
		{
			name: "planName",
			type: "text",
			required: true,
			admin: {
				description: "Short, clear plan name shown to users.",
				placeholder: "e.g. Starter",
			},
		},
		{
			type: "row",
			fields: [
				{
					name: "deliveryMode",
					type: "select",
					index: true,
					required: true,
					defaultValue: "virtual",
					admin: {
						width: "50%",
						description:
							"Virtual or physical — must match step 2 in the booking modal.",
					},
					options: [
						{ label: "Virtual", value: "virtual" },
						{ label: "Physical", value: "physical" },
					],
				},
				{
					name: "pricingType",
					type: "select",
					index: true,
					required: true,
					defaultValue: "group",
					admin: {
						width: "50%",
						description:
							"Group or private — must match step 3 in the booking modal.",
					},
					options: [
						{ label: "Group", value: "group" },
						{ label: "Private", value: "private" },
					],
				},
			],
		},
		{
			type: "row",
			fields: [
				{
					name: "classCount",
					type: "number",
					required: true,
					min: 1,
					admin: {
						width: "25%",
						description: "Number of classes included (used for display and leads).",
					},
				},
				{
					name: "maxSlots",
					type: "number",
					required: true,
					min: 1,
					defaultValue: 1,
					admin: {
						width: "25%",
						description:
							"How many time slots the user must select when booking.",
					},
				},
				{
					name: "frequency",
					type: "text",
					required: true,
					admin: {
						width: "25%",
						description: "Frequency label shown on the plan card.",
						placeholder: "e.g. 1 Per Week",
					},
				},
				{
					name: "price",
					type: "number",
					required: true,
					min: 0,
					admin: {
						width: "25%",
						description: "Price in AED (shown with currency icon).",
					},
				},
			],
		},
		{
			name: "priceSubLabel",
			type: "text",
			admin: {
				description:
					"Optional small label under the price (e.g. Per Person for shared private plans).",
				placeholder: "e.g. Per Person",
			},
		},
		{
			type: "group",
			label: "Badges",
			admin: {
				position: "sidebar",
			},
			fields: [
				{
					name: "isBestValue",
					type: "checkbox",
					label: "Best Value",
					admin: {
						description: "Shows the Best Value badge on this plan card.",
					},
				},
			],
		},
	],
};

import type { CollectionConfig } from "payload";

import { adminOnly } from "@/payload/access/shared/adminOnly";
import {
	revalidateClassPlansAfterChange,
	revalidateClassPlansAfterDelete,
} from "@/payload/collections/class-plans/hooks/revalidateClassPlans";

export const ClassPlans: CollectionConfig = {
	slug: "class-plans",
	access: {
		create: adminOnly,
		delete: adminOnly,
		read: () => true,
		update: adminOnly,
	},
	admin: {
		useAsTitle: "planName",
		group: "Content",
		defaultColumns: ["planName", "pricingType", "deliveryMode", "priceLabel"],
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
		classesLabel: true,
		frequencyLabel: true,
		priceLabel: true,
		maxStudents: true,
		isBestValue: true,
	},
	fields: [
		{
			type: "group",
			admin: {
				description: "Core details for this class plan.",
			},
			fields: [
				{
					name: "planName",
					type: "text",
					required: true,
					admin: {
						description: "Short, clear plan name shown to users.",
						placeholder: "e.g. Starter Group Plan",
					},
				},
			],
		},
		{
			type: "group",
			admin: {
				description:
					"Configure pricing model, delivery mode, and display labels.",
			},
			fields: [
				{
					type: "row",
					fields: [
						{
							name: "pricingType",
							type: "select",
							index: true,
							required: true,
							defaultValue: "group",
							admin: {
								width: "50%",
								description: "Choose whether this is a group or private plan.",
							},
							options: [
								{
									label: "Group",
									value: "group",
								},
								{
									label: "Private",
									value: "private",
								},
							],
						},
						{
							name: "deliveryMode",
							type: "select",
							required: true,
							defaultValue: "virtual",
							admin: {
								width: "50%",
								description: "How this plan is delivered.",
							},
							options: [
								{
									label: "Virtual",
									value: "virtual",
								},
								{
									label: "Physical",
									value: "physical",
								},
							],
						},
					],
				},
				{
					type: "row",
					fields: [
						{
							name: "classes",
							type: "text",
							required: true,
							admin: {
								width: "33.33%",
								description: "Display label for number of classes.",
								placeholder: "e.g. 4 Classes",
							},
						},
						{
							name: "frequency",
							type: "text",
							required: true,
							admin: {
								width: "33.33%",
								description: "Display label for frequency.",
								placeholder: "e.g. 1 Per Week",
							},
						},
						{
							name: "price",
							type: "text",
							required: true,
							admin: {
								width: "33.33%",
								placeholder: "e.g. 180",
							},
						},
					],
				},
				{
					name: "maxStudents",
					type: "text",
					admin: {
						description:
							"Only shown for private plans. Example: Max 3 Students",
						placeholder: "e.g. Max 3 Students",
						condition: (_, siblingData) =>
							siblingData?.pricingType === "private",
					},
				},
			],
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
				},
				{
					name: "isPopular",
					type: "checkbox",
					label: "Popular",
				},
			],
		},
	],
};

import type { CollectionConfig } from "payload";

import { adminOnly } from "@/payload/access/shared/adminOnly";
import { ADMIN_GROUPS } from "@/payload/constants/admin-groups";

export const ClassBookingLeads: CollectionConfig = {
	slug: "class-booking-leads",
	labels: {
		singular: "Class Booking Lead",
		plural: "Class Booking Leads",
	},
	admin: {
		useAsTitle: "fullName",
		group: ADMIN_GROUPS.CLASSES_BOOKING,
		defaultColumns: ["fullName", "email", "phone", "createdAt", "updatedAt"],
		pagination: {
			defaultLimit: 20,
			limits: [10, 20, 50, 100],
		},
	},

	access: {
		create: () => true,
		read: adminOnly,
		update: adminOnly,
		delete: adminOnly,
	},
	fields: [
		{
			name: "fullName",
			type: "text",
			label: "Full Name",
			required: true,
			admin: {
				description: "Lead contact name submitted from the booking form.",
				readOnly: true,
			},
		},
		{
			type: "row",
			fields: [
				{
					name: "email",
					type: "email",
					label: "Email Address",
					required: true,
					admin: {
						width: "50%",
						readOnly: true,
					},
				},
				{
					name: "phone",
					type: "text",
					label: "Phone Number",
					required: true,
					admin: {
						width: "50%",
						readOnly: true,
					},
				},
			],
		},
		{
			name: "notes",
			type: "textarea",
			label: "Lead Notes",
			admin: {
				description: "Additional context shared by the lead.",
				readOnly: true,
			},
		},
		{
			type: "group",
			name: "selectedPlan",
			label: "Selected Plan",
			required: true,
			admin: {
				description: "Plan details captured at the time of lead submission.",
			},
			fields: [
				{
					type: "row",
					fields: [
						{
							name: "name",
							type: "text",
							label: "Plan Name",
							required: true,
							admin: {
								width: "40%",
								readOnly: true,
							},
						},
						{
							name: "classes",
							type: "number",
							label: "Classes",
							required: true,
							admin: {
								width: "30%",
								readOnly: true,
							},
						},
						{
							name: "frequency",
							type: "text",
							label: "Frequency",
							required: true,
							admin: {
								width: "30%",
								readOnly: true,
							},
						},
					],
				},
				{
					type: "row",
					fields: [
						{
							name: "price",
							type: "number",
							label: "Price",
							required: true,
							admin: {
								width: "34%",
								readOnly: true,
							},
						},
						{
							name: "classType",
							type: "select",
							label: "Class Type",
							required: true,
							options: [
								{ label: "Virtual", value: "virtual" },
								{ label: "Physical", value: "physical" },
							],
							admin: {
								width: "33%",
								readOnly: true,
							},
						},
						{
							name: "formatType",
							type: "select",
							label: "Format",
							required: true,
							options: [
								{ label: "Group", value: "group" },
								{ label: "Private", value: "private" },
							],
							admin: {
								width: "33%",
								readOnly: true,
							},
						},
					],
				},
			],
		},
	],
};

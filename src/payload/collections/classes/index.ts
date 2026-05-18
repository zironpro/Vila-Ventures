import {
	MetaDescriptionField,
	MetaImageField,
	MetaTitleField,
	OverviewField,
	PreviewField,
} from "@payloadcms/plugin-seo/fields";
import {
	FixedToolbarFeature,
	HeadingFeature,
	InlineToolbarFeature,
	lexicalEditor,
	OrderedListFeature,
	UnorderedListFeature,
} from "@payloadcms/richtext-lexical";
import type { CollectionConfig } from "payload";
import { slugField } from "payload";

import { adminOnly } from "@/payload/access/shared/adminOnly";
import {
	revalidateClassesAfterChange,
	revalidateClassesAfterDelete,
} from "@/payload/collections/classes/hooks/revalidateClasses";
import { ADMIN_GROUPS } from "@/payload/constants/admin-groups";

export const Classes: CollectionConfig = {
	slug: "classes",
	access: {
		create: adminOnly,
		delete: adminOnly,
		read: () => true,
		update: adminOnly,
	},
	orderable: true,
	admin: {
		useAsTitle: "title",
		group: ADMIN_GROUPS.CLASSES_BOOKING,
		description:
			"Manage each class card and its dedicated class detail page content.",
		defaultColumns: ["title", "slug", "tagline", "updatedAt"],
		listSearchableFields: ["title", "slug", "tagline", "description"],
	},
	hooks: {
		afterChange: [revalidateClassesAfterChange],
		afterDelete: [revalidateClassesAfterDelete],
	},
	defaultPopulate: {
		title: true,
		tagline: true,
		description: true,
		content: true,
		bestFor: true,
		format: true,
		image: true,
		meta: true,
		slug: true,
		sortOrder: true,
	},
	fields: [
		{
			type: "row",
			fields: [
				{
					name: "title",
					type: "text",
					required: true,
					index: true,
					label: "Class title",
					admin: {
						width: "50%",
						placeholder: "e.g. Hatha Yoga",
					},
				},
				{
					name: "tagline",
					type: "text",
					required: true,
					label: "Short tagline",
					admin: {
						width: "50%",
						placeholder: "e.g. Grounding. Gentle. Restorative.",
					},
				},
			],
		},
		{
			type: "tabs",
			tabs: [
				{
					label: "Content",

					fields: [
						{
							name: "description",
							type: "textarea",
							required: true,
							label: "Short description",
						},
						{
							name: "content",
							type: "richText",
							required: true,
							editor: lexicalEditor({
								features: ({ rootFeatures }) => {
									return [
										...rootFeatures,
										FixedToolbarFeature(),
										InlineToolbarFeature(),
										HeadingFeature({
											enabledHeadingSizes: ["h2", "h3", "h4"],
										}),
										UnorderedListFeature(),
										OrderedListFeature(),
									];
								},
							}),
						},
					],
				},
				{
					name: "meta",
					label: "SEO",
					fields: [
						OverviewField({
							titlePath: "meta.title",
							descriptionPath: "meta.description",
							imagePath: "meta.image",
						}),
						MetaTitleField({
							hasGenerateFn: true,
						}),
						MetaImageField({
							relationTo: "media",
						}),
						MetaDescriptionField({}),
						PreviewField({
							hasGenerateFn: true,
							titlePath: "meta.title",
							descriptionPath: "meta.description",
						}),
					],
				},
			],
		},
		{
			name: "image",
			type: "upload",
			relationTo: "media",
			required: true,
			label: "Class image",
			admin: {
				position: "sidebar",
			},
		},

		{
			type: "group",
			admin: {
				position: "sidebar",
			},
			fields: [
				{
					name: "format",
					type: "text",
					label: "Format",
					admin: {
						width: "50%",
						placeholder: "e.g. In-studio, Virtual, or Hybrid",
					},
				},
				{
					name: "bestFor",
					type: "text",
					label: "Best for",
					admin: {
						width: "50%",
						placeholder: "e.g. Beginners, stress relief, flexibility",
					},
				},
			],
		},

		slugField({
			position: "sidebar",
		}),
	],
};

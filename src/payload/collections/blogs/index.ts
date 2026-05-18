import {
	MetaDescriptionField,
	MetaImageField,
	MetaTitleField,
	OverviewField,
	PreviewField,
} from "@payloadcms/plugin-seo/fields";
import {
	BlocksFeature,
	FixedToolbarFeature,
	HeadingFeature,
	HorizontalRuleFeature,
	InlineToolbarFeature,
	lexicalEditor,
	OrderedListFeature,
	UnorderedListFeature,
} from "@payloadcms/richtext-lexical";
import type { CollectionConfig } from "payload";
import { slugField } from "payload";

import { adminOrPublishedStatus } from "@/payload/access/content/adminOrPublishedStatus";
import { adminOnly } from "@/payload/access/shared/adminOnly";
import {
	Archive,
	Banner,
	CallToAction,
	Carousel,
	Content,
	MediaBlock,
	ThreeItemGrid,
} from "@/payload/features/content/blocks/configs";
import { populatePublishedAt } from "@/payload/features/content/hooks/populatePublishedAt";
import { ADMIN_GROUPS } from "@/payload/constants/admin-groups";

import {
	revalidateBlogAfterChange,
	revalidateBlogAfterDelete,
} from "./hooks/revalidateBlog";

export const Blogs: CollectionConfig = {
	slug: "blogs",
	access: {
		create: adminOnly,
		delete: adminOnly,
		read: adminOrPublishedStatus,
		update: adminOnly,
	},
	admin: {
		group: ADMIN_GROUPS.CONTENT,
		useAsTitle: "title",
		defaultColumns: ["title", "author", "_status", "publishedAt"],
	},
	defaultPopulate: {
		title: true,
		slug: true,
		excerpt: true,
		featuredImage: true,
		author: true,
		categories: true,
		tags: true,
		readingTime: true,
		publishedAt: true,
		meta: true,
	},
	versions: {
		drafts: true,
	},
	hooks: {
		afterChange: [revalidateBlogAfterChange],
		afterDelete: [revalidateBlogAfterDelete],
		beforeChange: [populatePublishedAt],
	},
	fields: [
		{
			name: "title",
			type: "text",
			required: true,
		},
		{
			name: "excerpt",
			type: "textarea",
			required: true,
		},
		{
			name: "featuredImage",
			type: "upload",
			relationTo: "media",
			required: true,
		},
		{
			type: "tabs",
			tabs: [
				{
					label: "Content",
					fields: [
						{
							name: "content",
							type: "richText",
							required: true,
							editor: lexicalEditor({
								features: ({ rootFeatures }) => {
									return [
										...rootFeatures,
										HeadingFeature({
											enabledHeadingSizes: ["h1", "h2", "h3", "h4"],
										}),
										FixedToolbarFeature(),
										InlineToolbarFeature(),
										UnorderedListFeature(),
										OrderedListFeature(),
										HorizontalRuleFeature(),
										BlocksFeature({
											blocks: [
												Archive,
												Banner,
												CallToAction,
												Carousel,
												Content,
												MediaBlock,
												ThreeItemGrid,
											],
										}),
									];
								},
							}),
							label: false,
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
			name: "publishedAt",
			type: "date",
			admin: {
				position: "sidebar",
			},
		},
		slugField({
			position: "sidebar",
		}),
		{
			name: "author",
			type: "relationship",
			relationTo: "users",
			required: true,
			admin: {
				position: "sidebar",
			},
		},
		{
			name: "categories",
			type: "relationship",
			relationTo: "categories",
			hasMany: true,
			admin: {
				position: "sidebar",
			},
		},
		{
			name: "tags",
			type: "array",
			fields: [
				{
					name: "tag",
					type: "text",
				},
			],
			admin: {
				position: "sidebar",
			},
		},
	],
};

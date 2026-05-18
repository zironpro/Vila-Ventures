import { CollectionOverride } from "@payloadcms/plugin-ecommerce/types";
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
	HorizontalRuleFeature,
	InlineToolbarFeature,
	lexicalEditor,
} from "@payloadcms/richtext-lexical";
import { slugField } from "payload";

import { ADMIN_GROUPS } from "@/payload/constants/admin-groups";

import {
	revalidateShopAfterChange,
	revalidateShopAfterDelete,
} from "./hooks/revalidateShop";

export const ProductsCollection: CollectionOverride = ({
	defaultCollection,
}) => ({
	...defaultCollection,
	hooks: {
		...defaultCollection.hooks,
		afterChange: [
			...(defaultCollection.hooks?.afterChange ?? []),
			revalidateShopAfterChange,
		],
		afterDelete: [
			...(defaultCollection.hooks?.afterDelete ?? []),
			revalidateShopAfterDelete,
		],
	},
	admin: {
		...defaultCollection?.admin,
		group: ADMIN_GROUPS.SHOP,
		defaultColumns: ["title", "enableVariants", "_status", "variants.variants"],
		useAsTitle: "title",
	},
	defaultPopulate: {
		...defaultCollection?.defaultPopulate,
		title: true,
		slug: true,
		variantOptions: true,
		variants: true,
		enableVariants: true,
		gallery: true,
		priceInUSD: true,
		inventory: true,
		detailsSection: true,
		meta: true,
	},
	fields: [
		{ name: "title", type: "text", required: true, index: true },
		{
			type: "tabs",
			tabs: [
				{
					fields: [
						{
							name: "description",
							type: "richText",
							editor: lexicalEditor({
								features: ({ rootFeatures }) => {
									return [
										...rootFeatures,
										HeadingFeature({
											enabledHeadingSizes: ["h1", "h2", "h3", "h4"],
										}),
										FixedToolbarFeature(),
										InlineToolbarFeature(),
										HorizontalRuleFeature(),
									];
								},
							}),
							label: false,
							required: false,
						},
						{
							name: "gallery",
							type: "array",
							minRows: 1,
							fields: [
								{
									name: "image",
									type: "upload",
									relationTo: "media",
									required: true,
								},
							],
						},
					],
					label: "Content",
				},
				{
					fields: [
						{
							type: "group",
							fields: [
								{
									name: "price",
									type: "number",
									required: true,
								},
								{
									name: "inventory",
									type: "number",
								},
							],
						},
						{
							name: "detailsSection",
							type: "group",
							label: "Details Section",
							fields: [
								{
									name: "heading",
									type: "richText",
									editor: lexicalEditor({
										features: ({ rootFeatures }) => {
											return [
												...rootFeatures,
												HeadingFeature({
													enabledHeadingSizes: ["h1", "h2", "h3", "h4"],
												}),
												FixedToolbarFeature(),
												InlineToolbarFeature(),
												HorizontalRuleFeature(),
											];
										},
									}),
								},

								{
									name: "items",
									type: "array",
									label: "Detail Items",
									fields: [
										{
											name: "title",
											type: "text",
											required: true,
										},
										{
											name: "content",
											type: "richText",
											editor: lexicalEditor({
												features: ({ rootFeatures }) => {
													return [
														...rootFeatures,
														HeadingFeature({
															enabledHeadingSizes: ["h1", "h2", "h3", "h4"],
														}),
														FixedToolbarFeature(),
														InlineToolbarFeature(),
														HorizontalRuleFeature(),
													];
												},
											}),
										},
									],
								},
							],
						},
						{
							name: "relatedProducts",
							type: "relationship",
							index: true,
							filterOptions: ({ id }) => {
								if (id) {
									return {
										id: {
											not_in: [id],
										},
									};
								}

								// ID comes back as undefined during seeding so we need to handle that case
								return {
									id: {
										exists: true,
									},
								};
							},
							hasMany: true,
							relationTo: "products",
						},
					],
					label: "Product Details",
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
							// if the `generateUrl` function is configured
							hasGenerateFn: true,

							// field paths to match the target field for data
							titlePath: "meta.title",
							descriptionPath: "meta.description",
						}),
					],
				},
			],
		},
		{
			name: "categories",
			type: "relationship",
			index: true,
			admin: {
				position: "sidebar",
				sortOptions: "title",
			},
			hasMany: true,
			relationTo: "categories",
		},
		slugField(),
		{
			name: "tags",
			type: "relationship",
			index: true,
			relationTo: "tags",
			admin: {
				position: "sidebar",
				sortOptions: "title",
			},
			hasMany: true,
		},
	],
});

import { postgresAdapter } from "@payloadcms/db-postgres";
import {
	BoldFeature,
	EXPERIMENTAL_TableFeature,
	IndentFeature,
	ItalicFeature,
	LinkFeature,
	lexicalEditor,
	OrderedListFeature,
	UnderlineFeature,
	UnorderedListFeature,
} from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";

import { Categories } from "@/payload/collections/categories";
import { ClassBookingLeads } from "@/payload/collections/class-booking-leads";
import { ClassPlans } from "@/payload/collections/class-plans";
import { Faqs } from "@/payload/collections/faqs";
import { Media } from "@/payload/collections/media";
import { Tags } from "@/payload/collections/products/tags";
import { Users } from "@/payload/collections/users";
import { plugins } from "@/payload/plugins";

import { Blogs } from "../collections/blogs";
import { Classes } from "../collections/classes";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
	admin: {
		user: Users.slug,
		meta: {
			icons: [
				{
					rel: "icon",
					type: "image/png",
					url: "/icon1.png",
				},
			],
			robots: "noindex, nofollow",
		},
	},
	collections: [
		Classes,
		ClassPlans,
		ClassBookingLeads,
		Blogs,
		Faqs,
		Categories,
		Tags,
		Media,
		Users,
	],
	// db: sqliteAdapter({
	// 	client: {
	// 		url: process.env.DATABASE_URL || "",
	// 	},
	// }),
	db: postgresAdapter({
		pool: {
			connectionString: process.env.DATABASE_URL,
		},
	}),
	editor: lexicalEditor({
		features: () => {
			return [
				UnderlineFeature(),
				BoldFeature(),
				ItalicFeature(),
				OrderedListFeature(),
				UnorderedListFeature(),
				LinkFeature({
					enabledCollections: ["products"],
					fields: ({ defaultFields }) => {
						const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
							if ("name" in field && field.name === "url") return false;
							return true;
						});

						return [
							...defaultFieldsWithoutUrl,
							{
								name: "url",
								type: "text",
								admin: {
									condition: ({ linkType }) => linkType !== "internal",
								},
								label: ({ t }) => t("fields:enterURL"),
								required: true,
							},
						];
					},
				}),
				IndentFeature(),
				EXPERIMENTAL_TableFeature(),
			];
		},
	}),
	endpoints: [],
	globals: [
		// Header, Footer
	],
	plugins,
	sharp,
	secret: process.env.PAYLOAD_SECRET || "",
	typescript: {
		outputFile: path.resolve(dirname, "../../payload-types.ts"),
	},
});

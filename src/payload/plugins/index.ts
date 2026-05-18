import { ecommercePlugin } from "@payloadcms/plugin-ecommerce";
import { stripeAdapter } from "@payloadcms/plugin-ecommerce/payments/stripe";
// import { formBuilderPlugin } from "@payloadcms/plugin-form-builder";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { GenerateTitle, GenerateURL } from "@payloadcms/plugin-seo/types";
// import {
// 	FixedToolbarFeature,
// 	HeadingFeature,
// 	lexicalEditor,
// } from "@payloadcms/richtext-lexical";
import type { CollectionConfig } from "payload";
import { Plugin } from "payload";

import { getServerSideURL } from "@/lib/utils/getURL";
import { adminOrPublishedStatus } from "@/payload/access/content/adminOrPublishedStatus";
import { isDocumentOwner } from "@/payload/access/content/isDocumentOwner";
import { adminOnlyFieldAccess } from "@/payload/access/shared/adminOnlyFieldAccess";
import { customerOnlyFieldAccess } from "@/payload/access/shared/customerOnlyFieldAccess";
import { isAdmin } from "@/payload/access/shared/isAdmin";
import { ProductsCollection } from "@/payload/collections/products";
import { ADMIN_GROUPS } from "@/payload/constants/admin-groups";
import { hideVariantCollectionsPlugin } from "@/payload/plugins/hide-variant-collections";
import { Product } from "@/payload-types";

const generateTitle: GenerateTitle<Product> = ({ doc }) => {
	return doc?.title
		? `${doc.title} | Payload Ecommerce Template`
		: "Payload Ecommerce Template";
};

const generateURL: GenerateURL<Product> = ({ doc }) => {
	const url = getServerSideURL();

	return doc?.slug ? `${url}/${doc.slug}` : url;
};

export const plugins: Plugin[] = [
	seoPlugin({
		generateTitle,
		generateURL,
	}),

	ecommercePlugin({
		access: {
			adminOnlyFieldAccess,
			adminOrPublishedStatus,
			customerOnlyFieldAccess,
			isAdmin,
			isDocumentOwner,
		},
		customers: {
			slug: "users",
		},
		orders: {
			ordersCollectionOverride: ({ defaultCollection }) => ({
				...defaultCollection,
				admin: {
					...defaultCollection.admin,
					group: ADMIN_GROUPS.SHOP,
				},
				fields: [
					...defaultCollection.fields,
					{
						name: "accessToken",
						type: "text",
						unique: true,
						index: true,
						admin: {
							position: "sidebar",
							readOnly: true,
						},
						hooks: {
							beforeValidate: [
								({ value, operation }) => {
									if (operation === "create" || !value) {
										return crypto.randomUUID();
									}
									return value;
								},
							],
						},
					},
				],
			}),
		},
		carts: {
			cartsCollectionOverride: ({
				defaultCollection,
			}: {
				defaultCollection: CollectionConfig;
			}) => ({
				...defaultCollection,
				admin: {
					...defaultCollection.admin,
					group: ADMIN_GROUPS.SHOP,
				},
			}),
		},
		transactions: {
			transactionsCollectionOverride: ({
				defaultCollection,
			}: {
				defaultCollection: CollectionConfig;
			}) => ({
				...defaultCollection,
				admin: {
					...defaultCollection.admin,
					group: ADMIN_GROUPS.SHOP,
				},
			}),
		},
		addresses: {
			addressesCollectionOverride: ({
				defaultCollection,
			}: {
				defaultCollection: CollectionConfig;
			}) => ({
				...defaultCollection,
				admin: {
					...defaultCollection.admin,
					group: ADMIN_GROUPS.SHOP,
				},
			}),
		},
		payments: {
			paymentMethods: [
				stripeAdapter({
					secretKey: process.env.STRIPE_SECRET_KEY!,
					publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
					webhookSecret: process.env.STRIPE_WEBHOOKS_SIGNING_SECRET!,
				}),
			],
		},
		products: {
			productsCollectionOverride: ProductsCollection,
		},
	}),
	hideVariantCollectionsPlugin(),
];

import type { CollectionConfig, Plugin } from "payload";

const HIDDEN_VARIANT_SLUGS = ["variants", "variantTypes", "variantOptions"];

export const hideVariantCollectionsPlugin = (): Plugin => (config) => {
	if (!config.collections) {
		return config;
	}

	config.collections = config.collections.map((collection) => {
		const slug =
			typeof collection === "object" && collection && "slug" in collection
				? (collection as CollectionConfig).slug
				: null;

		if (!slug || !HIDDEN_VARIANT_SLUGS.includes(slug)) {
			return collection;
		}

		const typedCollection = collection as CollectionConfig;

		return {
			...typedCollection,
			admin: {
				...typedCollection.admin,
				hidden: true,
			},
		};
	});

	return config;
};

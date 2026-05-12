import type { MetadataRoute } from "next";

import { SITE_URL } from "@/constants/site-config";
import { BLOG_POSTS } from "@/features/blogs/constants";
import { getClasses } from "@/features/classes/actions";
import { getProductSlugs } from "@/features/shop/actions";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const classes = await getClasses();
	const products = await getProductSlugs();

	const classUrls: MetadataRoute.Sitemap = classes.map((item) => ({
		url: `${SITE_URL}/classes/${item.slug}`,
		lastModified: new Date(),
		changeFrequency: "monthly" as const,
		priority: 0.9,
	}));

	const productUrls: MetadataRoute.Sitemap = products.map((product) => ({
		url: `${SITE_URL}/shop/${product}`,
		lastModified: new Date(),
		changeFrequency: "monthly" as const,
		priority: 0.7,
	}));

	const blogUrls: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
		url: `${SITE_URL}/blog/${post.slug}`,
		lastModified: new Date(post.publishedAt),
		changeFrequency: "monthly" as const,
		priority: 0.7,
	}));

	return [
		{
			url: SITE_URL,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 1,
		},
		{
			url: `${SITE_URL}/about`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: `${SITE_URL}/classes`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.9,
		},
		{
			url: `${SITE_URL}/shop`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.85,
		},
		{
			url: `${SITE_URL}/blog`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.85,
		},
		{
			url: `${SITE_URL}/contact`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8,
		},
		...classUrls,
		...productUrls,
		...blogUrls,
	];
}

import { payload } from "@/payload";

export const getClasses = async () => {
	const { docs } = await payload.find({
		collection: "classes",
		depth: 1,
		limit: 100,
		pagination: false,
		sort: "-sortOrder",
	});

	return docs;
};

export const getClassBySlug = async (slug: string) => {
	const { docs } = await payload.find({
		collection: "classes",
		where: {
			slug: {
				equals: slug,
			},
		},
		depth: 1,
		limit: 1,
		pagination: false,
	});

	return docs[0];
};

export const getClassSlugs = async () => {
	const { docs } = await payload.find({
		collection: "classes",
		select: {
			slug: true,
		},
		limit: 1000,
		pagination: false,
	});

	return docs
		.map((item) => item.slug)
		.filter((slug): slug is string => Boolean(slug));
};

export const getClassPricingPlans = async () => {
	const { docs } = await payload.find({
		collection: "class-plans",
		depth: 1,
		limit: 100,
		pagination: false,
		sort: "sortOrder",
	});

	return docs;
};

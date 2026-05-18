import type {
	ClassType,
	FormatType,
	PlanData,
	PlansMap,
} from "../types/plans";

/** Fields required to map CMS docs into booking plans (matches getClassPricingPlans select). */
export type ClassPlanDoc = {
	id: number;
	_order?: string | null;
	planName: string;
	deliveryMode: "virtual" | "physical";
	pricingType: "group" | "private";
	classCount: number;
	maxSlots: number;
	frequency: string;
	price: number;
	priceSubLabel?: string | null;
	isBestValue?: boolean | null;
};

export type { PlansMap } from "../types/plans";

/** Fallback when CMS has no plans for a bucket (dev safety). */
export const PLANS_FALLBACK: PlansMap = {
	virtual: {
		group: [
			{
				id: "fallback-v-g-starter",
				name: "Starter",
				classes: 4,
				frequency: "1 Per Week",
				price: 180,
				maxSlots: 1,
			},
			{
				id: "fallback-v-g-regular",
				name: "Regular",
				classes: 8,
				frequency: "2 Per Week",
				price: 300,
				popular: true,
				maxSlots: 2,
			},
			{
				id: "fallback-v-g-intensive",
				name: "Intensive",
				classes: 12,
				frequency: "3 Per Week",
				price: 420,
				maxSlots: 3,
			},
		],
		private: [
			{
				id: "fallback-v-p-starter",
				name: "Starter",
				classes: 4,
				frequency: "1 Per Week",
				price: 350,
				maxSlots: 1,
			},
			{
				id: "fallback-v-p-regular",
				name: "Regular",
				classes: 8,
				frequency: "2 Per Week",
				price: 650,
				popular: true,
				maxSlots: 2,
			},
			{
				id: "fallback-v-p-intensive",
				name: "Intensive",
				classes: 12,
				frequency: "3 Per Week",
				price: 950,
				maxSlots: 3,
			},
		],
	},
	physical: {
		group: [
			{
				id: "fallback-p-g-starter",
				name: "Starter",
				classes: 4,
				frequency: "1 Per Week",
				price: 250,
				maxSlots: 1,
			},
			{
				id: "fallback-p-g-regular",
				name: "Regular",
				classes: 8,
				frequency: "2 Per Week",
				price: 450,
				popular: true,
				maxSlots: 2,
			},
			{
				id: "fallback-p-g-intensive",
				name: "Intensive",
				classes: 12,
				frequency: "3 Per Week",
				price: 600,
				maxSlots: 3,
			},
		],
		private: [
			{
				id: "fallback-p-p-1",
				name: "1 Person",
				classes: 1,
				frequency: "Per Session",
				price: 250,
				maxSlots: 1,
			},
			{
				id: "fallback-p-p-2-3",
				name: "2-3 Person",
				classes: 1,
				frequency: "Per Person",
				price: 200,
				maxSlots: 1,
				priceSubLabel: "Per Person",
			},
		],
	},
};

function emptyPlansMap(): PlansMap {
	return {
		virtual: { group: [], private: [] },
		physical: { group: [], private: [] },
	};
}

function mapDocToPlanData(doc: ClassPlanDoc): PlanData {
	return {
		id: String(doc.id),
		name: doc.planName,
		classes: doc.classCount,
		frequency: doc.frequency,
		price: doc.price,
		maxSlots: doc.maxSlots,
		popular: Boolean(doc.isBestValue),
		priceSubLabel: doc.priceSubLabel ?? undefined,
	};
}

function sortByOrder(a: ClassPlanDoc, b: ClassPlanDoc): number {
	const orderA = a._order ?? "";
	const orderB = b._order ?? "";
	return orderA.localeCompare(orderB);
}

export function mapClassPlansToGrouped(docs: ClassPlanDoc[]): PlansMap {
	const grouped = emptyPlansMap();

	const sorted = [...docs].sort(sortByOrder);

	for (const doc of sorted) {
		const classType = doc.deliveryMode as ClassType;
		const formatType = doc.pricingType as FormatType;

		if (
			(classType !== "virtual" && classType !== "physical") ||
			(formatType !== "group" && formatType !== "private")
		) {
			continue;
		}

		grouped[classType][formatType].push(mapDocToPlanData(doc));
	}

	for (const classType of ["virtual", "physical"] as const) {
		for (const formatType of ["group", "private"] as const) {
			if (grouped[classType][formatType].length === 0) {
				grouped[classType][formatType] = PLANS_FALLBACK[classType][formatType];
			}
		}
	}

	return grouped;
}

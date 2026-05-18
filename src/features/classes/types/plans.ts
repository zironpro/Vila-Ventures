export type TypeClass = "hatha" | "vinyasa flow" | "kids";
export type ClassType = "virtual" | "physical";
export type FormatType = "group" | "private";

export interface PlanData {
	id: string;
	name: string;
	classes: number;
	frequency: string;
	price: number;
	popular?: boolean;
	maxSlots: number;
	priceSubLabel?: string;
}

export type PlansMap = Record<ClassType, Record<FormatType, PlanData[]>>;

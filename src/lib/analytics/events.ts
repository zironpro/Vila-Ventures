export const ANALYTICS_EVENTS = {
	productViewed: "product_viewed",
	classViewed: "class_viewed",
	productCardClicked: "product_card_clicked",
	addToBagClicked: "add_to_bag_clicked",
	bookingModalOpened: "booking_modal_opened",
	bookingPlanSelected: "booking_plan_selected",
	bookingLeadSubmitted: "booking_lead_submitted",
	ctaClicked: "cta_clicked",
	socialLinkClicked: "social_link_clicked",
} as const;

export type AnalyticsEventName =
	(typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

export type ProductAnalyticsProps = {
	product_id: string | number;
	slug: string;
	title: string;
	price: number;
	currency?: "AED";
	in_stock?: boolean;
	category?: string;
	source?: "product_detail" | "shop_grid";
};

export type ClassAnalyticsProps = {
	class_id: string | number;
	slug: string;
	title: string;
	format?: string;
	best_for?: string;
	tagline?: string;
};

export type BookingModalSource = "class_detail" | "navbar" | "other";

export type BookingModalProps = {
	source: BookingModalSource;
	class_slug?: string;
};

export type BookingPlanProps = {
	plan_name: string;
	price: number;
	class_type: string;
	format_type: string;
	class_slug?: string;
};

export type BookingLeadProps = {
	plan_name: string;
	price: number;
	class_type: string;
	format_type: string;
	time_slot_count: number;
	class_slug?: string;
};

export type CtaLocation =
	| "site_cta"
	| "footer_cta"
	| "hero"
	| "contact_sidebar"
	| "faq"
	| "audience_section";

export type CtaClickedProps = {
	cta_label: string;
	destination: string;
	location: CtaLocation;
};

export type SocialPlatform =
	| "instagram"
	| "facebook"
	| "linkedin"
	| "x"
	| "other";

export type SocialLinkClickedProps = {
	platform: SocialPlatform;
	destination: string;
	label: string;
	location?: "footer";
};

export type AnalyticsEventProperties =
	| ProductAnalyticsProps
	| ClassAnalyticsProps
	| BookingModalProps
	| BookingPlanProps
	| BookingLeadProps
	| CtaClickedProps
	| SocialLinkClickedProps
	| Record<string, string | number | boolean | undefined>;

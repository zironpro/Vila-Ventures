export const ADMIN_GROUPS = {
	CLASSES_BOOKING: "Classes & Booking",
	SHOP: "Shop",
	CONTENT: "Content",
	MEDIA: "Media",
	USERS: "Users",
} as const;

export type AdminGroup = (typeof ADMIN_GROUPS)[keyof typeof ADMIN_GROUPS];

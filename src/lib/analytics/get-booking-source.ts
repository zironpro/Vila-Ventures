import type { BookingModalSource } from "./events";

export function getBookingSourceFromPathname(
	pathname: string
): BookingModalSource {
	const classDetailMatch = pathname.match(/^\/classes\/([^/]+)$/);
	if (classDetailMatch) {
		return "class_detail";
	}

	if (pathname === "/" || pathname.startsWith("/classes")) {
		return "navbar";
	}

	return "other";
}

export function getClassSlugFromPathname(pathname: string): string | undefined {
	const match = pathname.match(/^\/classes\/([^/]+)$/);
	return match?.[1];
}

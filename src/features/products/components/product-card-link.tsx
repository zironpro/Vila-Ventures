"use client";

import Link from "next/link";

import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import { useTrackEvent } from "@/lib/analytics/use-track-event";

type ProductCardLinkProps = {
	href: string;
	productId: string | number;
	slug: string;
	title: string;
	price: number;
	children: React.ReactNode;
};

export function ProductCardLink({
	href,
	productId,
	slug,
	title,
	price,
	children,
}: ProductCardLinkProps) {
	const { trackEvent } = useTrackEvent();

	return (
		<Link
			href={href}
			onClick={() => {
				trackEvent(ANALYTICS_EVENTS.productCardClicked, {
					product_id: productId,
					slug,
					title,
					price,
					currency: "AED",
					source: "shop_grid",
				});
			}}
		>
			{children}
		</Link>
	);
}

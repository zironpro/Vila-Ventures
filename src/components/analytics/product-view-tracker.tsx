"use client";

import { useEffect, useRef } from "react";

import {
	ANALYTICS_EVENTS,
	type ProductAnalyticsProps,
} from "@/lib/analytics/events";
import { useTrackEvent } from "@/lib/analytics/use-track-event";

type ProductViewTrackerProps = Omit<ProductAnalyticsProps, "source">;

export function ProductViewTracker({
	product_id,
	slug,
	title,
	price,
	in_stock,
	category,
	currency,
}: ProductViewTrackerProps) {
	const { trackEvent } = useTrackEvent();
	const trackedRef = useRef<string | null>(null);

	useEffect(() => {
		const key = String(product_id);
		if (trackedRef.current === key) return;
		trackedRef.current = key;

		trackEvent(ANALYTICS_EVENTS.productViewed, {
			product_id,
			slug,
			title,
			price,
			in_stock,
			category,
			currency: currency ?? "AED",
		});
	}, [
		product_id,
		slug,
		title,
		price,
		in_stock,
		category,
		currency,
		trackEvent,
	]);

	return null;
}

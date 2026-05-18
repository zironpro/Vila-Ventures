"use client";

import { useEffect, useRef } from "react";

import {
	ANALYTICS_EVENTS,
	type ClassAnalyticsProps,
} from "@/lib/analytics/events";
import { useTrackEvent } from "@/lib/analytics/use-track-event";

export function ClassViewTracker({
	class_id,
	slug,
	title,
	format,
	best_for,
	tagline,
}: ClassAnalyticsProps) {
	const { trackEvent } = useTrackEvent();
	const trackedRef = useRef<string | null>(null);

	useEffect(() => {
		const key = String(class_id);
		if (trackedRef.current === key) return;
		trackedRef.current = key;

		trackEvent(ANALYTICS_EVENTS.classViewed, {
			class_id,
			slug,
			title,
			format,
			best_for,
			tagline,
		});
	}, [class_id, slug, title, format, best_for, tagline, trackEvent]);

	return null;
}

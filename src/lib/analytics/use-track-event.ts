"use client";

import { useCallback } from "react";

import { useOpenPanel } from "@openpanel/nextjs";

import type { AnalyticsEventName, AnalyticsEventProperties } from "./events";

function isOpenPanelConfigured(): boolean {
	const apiUrl = process.env.NEXT_PUBLIC_OPENPANEL_API_URL ?? "";
	const clientId = process.env.NEXT_PUBLIC_OPENPANEL_CLIENT_ID ?? "";
	return apiUrl !== "" && clientId !== "";
}

export function useTrackEvent() {
	const op = useOpenPanel();

	const trackEvent = useCallback(
		(name: AnalyticsEventName, properties?: AnalyticsEventProperties) => {
			if (!isOpenPanelConfigured()) return;
			op.track(name, properties);
		},
		[op]
	);

	return { trackEvent };
}

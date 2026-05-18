"use client";

import { forwardRef } from "react";

import Link from "next/link";

import {
	ANALYTICS_EVENTS,
	type CtaClickedProps,
	type CtaLocation,
} from "@/lib/analytics/events";
import { useTrackEvent } from "@/lib/analytics/use-track-event";

type TrackedCtaLinkProps = React.ComponentProps<typeof Link> & {
	ctaLabel: string;
	location: CtaLocation;
};

export const TrackedCtaLink = forwardRef<
	HTMLAnchorElement,
	TrackedCtaLinkProps
>(function TrackedCtaLink(
	{ ctaLabel, location, href, onClick, ...props },
	ref
) {
	const { trackEvent } = useTrackEvent();
	const destination =
		typeof href === "string"
			? href
			: href && typeof href === "object" && "pathname" in href
				? String(href.pathname)
				: "";

	return (
		<Link
			href={href}
			onClick={(event) => {
				const payload: CtaClickedProps = {
					cta_label: ctaLabel,
					destination,
					location,
				};
				trackEvent(ANALYTICS_EVENTS.ctaClicked, payload);
				onClick?.(event);
			}}
			ref={ref}
			{...props}
		/>
	);
});

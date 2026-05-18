"use client";

import Link from "next/link";

import {
	ANALYTICS_EVENTS,
	type SocialLinkClickedProps,
} from "@/lib/analytics/events";
import { getSocialPlatformFromUrl } from "@/lib/analytics/get-social-platform";
import { useTrackEvent } from "@/lib/analytics/use-track-event";

type TrackedSocialLinkProps = React.ComponentProps<typeof Link> & {
	label: string;
	location?: SocialLinkClickedProps["location"];
};

export function TrackedSocialLink({
	label,
	location = "footer",
	href,
	onClick,
	...props
}: TrackedSocialLinkProps) {
	const { trackEvent } = useTrackEvent();
	const destination = typeof href === "string" ? href : "";

	return (
		<Link
			href={href}
			onClick={(event) => {
				if (destination) {
					trackEvent(ANALYTICS_EVENTS.socialLinkClicked, {
						platform: getSocialPlatformFromUrl(destination),
						destination,
						label,
						location,
					});
				}
				onClick?.(event);
			}}
			{...props}
		/>
	);
}

"use client";

import { ArrowRightIcon, PhoneCallIcon } from "@phosphor-icons/react";

import { TrackedCtaLink } from "@/components/analytics/tracked-cta-link";
import { Button } from "@/components/ui/button";

export function CtaActions() {
	return (
		<div className="mt-8 flex flex-col items-start gap-2 sm:flex-row sm:items-center lg:mt-12">
			<Button
				className="w-full justify-between sm:w-48"
				nativeButton={false}
				render={
					<TrackedCtaLink
						ctaLabel="Contact us"
						href="/contact"
						location="site_cta"
					/>
				}
				size="lg"
				variant="secondary"
			>
				Contact us <PhoneCallIcon />
			</Button>
			<Button
				className="px-4"
				nativeButton={false}
				render={
					<TrackedCtaLink
						ctaLabel="Explore classes"
						href="/classes"
						location="site_cta"
					/>
				}
				size="lg"
				variant="ghost"
			>
				Explore classes <ArrowRightIcon />
			</Button>
		</div>
	);
}

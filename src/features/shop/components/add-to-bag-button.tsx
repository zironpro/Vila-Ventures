"use client";

import { ShoppingBagIcon } from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";

import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import { useTrackEvent } from "@/lib/analytics/use-track-event";

type AddToBagButtonProps = {
	productId: string | number;
	slug: string;
	title: string;
	price: number;
};

export function AddToBagButton({
	productId,
	slug,
	title,
	price,
}: AddToBagButtonProps) {
	const { trackEvent } = useTrackEvent();

	return (
		<Button
			className="gap-3"
			onClick={() => {
				trackEvent(ANALYTICS_EVENTS.addToBagClicked, {
					product_id: productId,
					slug,
					title,
					price,
					currency: "AED",
					source: "product_detail",
				});
			}}
			size="lg"
			type="button"
		>
			<ShoppingBagIcon weight="fill" />
			Add to bag
		</Button>
	);
}

import {
	ArrowUpRightIcon,
	HandWavingIcon,
} from "@phosphor-icons/react/dist/ssr";

import { TrackedCtaLink } from "@/components/analytics/tracked-cta-link";
import {
	Accordion,
	AccordionItem,
	AccordionPanel,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

import { CLASSES_FAQS } from "../constants";

export const ClassesFaqSection = () => {
	return (
		<section
			className="container mx-auto grid grid-cols-1 gap-6 py-14 lg:grid-cols-2"
			id="faq"
		>
			<div className="flex flex-col justify-between gap-4">
				<div className="max-w-md">
					<Badge
						className="mb-3 bg-card text-muted-foreground!"
						variant="secondary"
					>
						Common Questions
					</Badge>
					<h2 className="font-medium text-2xl sm:text-3xl lg:text-4xl">
						Everything you need to know before your first class
					</h2>
				</div>
				<div className="max-w-full rounded-lg bg-card p-9 sm:max-w-xs">
					<div className="flex size-12 items-center justify-center rounded-full bg-muted">
						<HandWavingIcon size={32} />
					</div>
					<h3 className="mt-6 font-medium text-lg">Still have questions?</h3>
					<p className="mt-2 mb-6 text-balance text-muted-foreground">
						We're happy to help — whether it's about a specific class, your
						first session, or anything else.
					</p>
					<TrackedCtaLink
						className="flex items-center justify-between gap-2"
						ctaLabel="Contact us"
						href="/contact"
						location="faq"
					>
						Contact us <ArrowUpRightIcon />
					</TrackedCtaLink>
				</div>
			</div>
			<Accordion className="w-full space-y-3" defaultValue={["01"]}>
				{CLASSES_FAQS.map((item) => (
					<AccordionItem
						className="rounded-lg border-b-0 bg-taupe-300/30 px-4"
						key={item.id}
						value={item.id}
					>
						<AccordionTrigger>{item.title}</AccordionTrigger>
						<AccordionPanel>{item.content}</AccordionPanel>
					</AccordionItem>
				))}
			</Accordion>
		</section>
	);
};

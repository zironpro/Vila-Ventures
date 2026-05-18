import { TrackedCtaLink } from "@/components/analytics/tracked-cta-link";
import { Badge } from "@/components/ui/badge";

import { AUDIENCES } from "../constants";

export const AudienceSection = () => {
	return (
		<section className="bg-card" id="who-its-for">
			<div className="container mx-auto py-14 lg:py-28">
				<div className="grid grid-cols-1 gap-4 md:grid-cols-5">
					<Badge
						className="bg-secondary text-muted-foreground!"
						render={<h2 />}
						variant="secondary"
					>
						Who It's For
					</Badge>
					<p className="col-span-1 font-medium text-2xl text-muted-foreground leading-snug sm:text-3xl md:col-span-4 lg:text-5xl">
						<span className="text-foreground">
							We don't believe in one-size-fits-all yoga.
						</span>{" "}
						Every class is shaped around the people in the room.
					</p>
				</div>

				<div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
					{AUDIENCES.map((item) => (
						<div
							className="rounded-lg border border-primary/10 bg-background p-6"
							key={item.audience}
						>
							<h3 className="font-medium text-lg md:text-2xl">
								{item.audience}
							</h3>
							<p className="mt-2 text-muted-foreground leading-relaxed md:text-lg">
								{item.detail}
							</p>
						</div>
					))}
				</div>

				<div className="mt-12 rounded-xl bg-secondary p-8 text-center lg:mt-20 lg:p-12">
					<p className="mx-auto max-w-4xl text-2xl text-primary leading-snug lg:text-4xl">
						Not sure which class is right for you?{" "}
						<TrackedCtaLink
							className="font-medium hover:underline"
							ctaLabel="Book a free discovery call"
							href="/contact"
							location="audience_section"
						>
							Book a free discovery call
						</TrackedCtaLink>{" "}
						and we'll help you find your starting point.
					</p>
				</div>
			</div>
		</section>
	);
};

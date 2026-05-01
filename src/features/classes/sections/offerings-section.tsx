import Link from "next/link";

import { ProgressiveBlur } from "@/components/common/progressive-blur";
import { Media } from "@/components/media";
import { Badge } from "@/components/ui/badge";

import { Class } from "@/payload-types";

type OfferingsSectionProps = {
	classes: Class[];
};

export const OfferingsSection = ({ classes }: OfferingsSectionProps) => {
	return (
		<section className="container mx-auto py-14 lg:py-20" id="offerings">
			<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
				<Badge
					className="bg-card text-muted-foreground!"
					render={<h2 />}
					variant="secondary"
				>
					Our Classes
				</Badge>
				<p className="col-span-1 font-medium text-2xl text-muted-foreground leading-snug sm:text-3xl md:col-span-2 lg:text-5xl">
					<span className="text-foreground">Six ways to practice,</span> each
					one shaped around who shows up and what they need that day.
				</p>
			</div>

			<div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-20">
				{classes.map((item) => (
					<div className="group" key={item.id}>
						<div className="mb-2 flex items-center justify-between gap-3 rounded-lg bg-card p-6">
							<h3 className="font-bold text-xl">{item.title}</h3>
							<p className="font-light text-muted-foreground text-sm">
								{item.tagline}
							</p>
						</div>
						<Link
							aria-label={`View ${item.title} class details`}
							className="block rounded-[calc(var(--radius)+4px)] bg-card p-1"
							href={`/classes/${item.slug}`}
						>
							<div className="relative aspect-4/3 size-full overflow-hidden rounded-lg">
								<div className="absolute inset-x-0 bottom-0 z-20 flex flex-col gap-3 p-6 text-card">
									<p className="font-medium text-lg tracking-wide">
										{item.description}
									</p>
									<div className="flex flex-wrap gap-x-4 gap-y-1 text-card/70 text-sm">
										<span>{item.format}</span>
										<span className="hidden sm:inline">·</span>
										<span>{item.bestFor}</span>
									</div>
								</div>
								<div className="absolute inset-x-0 bottom-0 z-10 h-2/3 bg-linear-to-t from-black/60 to-transparent" />
								<ProgressiveBlur className="[--height:50%]" position="bottom" />
								<Media
									alt={`${item.title} class at Vila Ventures in Abu Dhabi`}
									fill
									imgClassName="object-cover transition-[scale] duration-300 group-hover:scale-105"
									resource={item.image}
									size="(max-width: 640px) 100vw, 50vw"
								/>
							</div>
						</Link>
					</div>
				))}
			</div>
		</section>
	);
};

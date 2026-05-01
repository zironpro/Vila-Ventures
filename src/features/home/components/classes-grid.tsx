import Link from "next/link";

import { ProgressiveBlur } from "@/components/common/progressive-blur";
import { Media } from "@/components/media";

import { getClasses } from "@/features/classes/actions";

export const ClassesGrid = async () => {
	const classes = await getClasses();
	return (
		<div className="mt-9 grid grid-cols-1 gap-6 sm:grid-cols-2">
			{classes.map((item) => (
				<Link
					className="group block"
					href={`/classes/${item.slug}`}
					key={item.id}
				>
					<div className="mb-2 flex items-center justify-between gap-3 rounded-lg bg-card p-6">
						<h3 className="font-bold text-xl">{item.title}</h3>
						<p className="font-light text-muted-foreground text-sm">
							{item.tagline}
						</p>
					</div>
					<div className="rounded-[calc(var(--radius)+4px)] bg-card p-1">
						<div className="relative aspect-4/3 size-full overflow-hidden rounded-lg">
							<div className="absolute inset-x-0 bottom-0 z-20 p-6 text-card">
								<p className="text-lg text-medium tracking-wide">
									{item.description}
								</p>
							</div>
							<div className="absolute inset-x-0 bottom-0 z-10 h-1/3 bg-linear-to-t from-black/50 to-transparent" />
							<ProgressiveBlur className="[--height:40%]" position="bottom" />
							<Media
								alt={item.title}
								fill
								imgClassName="object-cover transition-[scale] duration-300 group-hover:scale-105"
								resource={item.image}
							/>
						</div>
					</div>
				</Link>
			))}
		</div>
	);
};

import Image from "next/image";

import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";

import { TrackedCtaLink } from "@/components/analytics/tracked-cta-link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { BookClassModalTrigger } from "@/features/classes/components/booking-modal";

export const HeroSection = () => {
	return (
		<section className="relative flex min-h-screen w-full bg-primary">
			<div className="container relative z-10 mx-auto flex-1 py-14 lg:py-24 xl:py-16 2xl:py-28">
				<div className="flex h-full max-w-full flex-col justify-between sm:max-w-xl lg:max-w-3xl">
					<div className="py-14 text-center md:text-start lg:py-16">
						<Badge>Rooted in Joy. Designed for Balance.</Badge>

						<h1 className="mt-2 font-display text-4xl text-card sm:text-5xl md:text-5xl lg:text-6xl">
							Yoga Classes & Mindful Lifestyle Products in UAE
						</h1>
						<p className="mt-3 text-balance text-card leading-snug sm:text-lg md:text-xl lg:mt-4 lg:text-2xl">
							Discover mindful yoga classes, creative lifestyle products, and a
							space where movement, design, and joy come together - with Vila.
						</p>

						<div className="mt-4 flex items-start gap-3 md:mt-6">
							<BookClassModalTrigger>
								<Button
									className="flex-1 cursor-pointer font-semibold shadow-lg duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:gap-9! max-md:justify-between md:flex-none md:hover:px-9"
									size="lg"
								>
									Book a class <ArrowRightIcon data-icon="inline-end" />
								</Button>
							</BookClassModalTrigger>

							<Button
								className="duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:px-8"
								nativeButton={false}
								render={
									<TrackedCtaLink
										ctaLabel="Shop Products"
										href="/shop"
										location="hero"
									/>
								}
								size="lg"
								variant="secondary"
							>
								Shop Products
							</Button>
						</div>
					</div>

					<div className="group max-w-full overflow-hidden rounded-lg border border-card/20 bg-card/30 backdrop-blur-lg transition-transform duration-300 ease-out hover:scale-105 supports-backdrop-filter:bg-card/20 sm:max-w-md">
						<div className="grid grid-cols-[minmax(140px,40%)_1fr] gap-3 p-3 text-card">
							<div className="relative aspect-square size-full overflow-hidden rounded-md bg-card/40 shadow-md">
								<Image
									alt=""
									className="object-cover transition-transform duration-300 ease-out group-hover:scale-110"
									fill
									src="/images/vila-profile.webp"
								/>
							</div>
							<div className="p-2">
								<h2 className="font-display text-base md:text-lg lg:text-xl">
									Virtual & Physical Yoga
								</h2>
								<p className="mt-1.5 text-balance text-xs tracking-wide sm:text-base">
									Classes for women, kids, and corporate - plus thoughtfully
									designed yoga mats, journals, and lifestyle essentials.
								</p>
							</div>
						</div>
						<div className="flex flex-wrap items-center justify-between gap-3 bg-card/30 p-3 text-card">
							<div className="flex items-center gap-3">
								<div className="shrink-0">
									<h3 className="font-semibold text-sm">Talk with Vila</h3>
									<p className="font-medium text-muted/80 text-xs tracking-wide">
										INSTRUCTOR
									</p>
								</div>
							</div>
							<Button className="cursor-pointer" variant="secondary">
								Book 15-min call
							</Button>
						</div>
					</div>
				</div>
			</div>

			<Image
				alt="Woman meditating in yoga pose against an orange backdrop"
				blurDataURL="data:image/webp;base64,UklGRvAAAABXRUJQVlA4WAoAAAAAAAAATwAANAAAVlA4IHwAAABwBQCdASpQADUAP/3+/3+/uza7pmmD8D+JZADUUCqqt7vGvyyxjYJgz9l5RJYAYYfsHv2wAP6XF8YTH9X8CStWbWm/GfBNHomOFRej/2dL4ESvccsb5CF1FDNo/Xun35tVGjcFYkQtaU8PidFrN+65BJyuvr4NElPazAAAUFNBSU4AAAA4QklNA+0AAAAAABAASAAAAAEAAgBIAAAAAQACOEJJTQQoAAAAAAAMAAAAAj/wAAAAAAAAOEJJTQRDAAAAAAAOUGJlVwEQAAYAAAAAAAA="
				className="object-cover object-right max-md:blur-lg max-md:brightness-85 md:object-center"
				fill
				placeholder="blur"
				priority
				quality={100}
				sizes="100vw"
				src="/images/hero-banner.webp"
			/>
		</section>
	);
};

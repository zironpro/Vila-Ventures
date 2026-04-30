import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon, PhoneCallIcon } from "@phosphor-icons/react/dist/ssr";

import { LogoIcon } from "@/assets/logo";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export const Cta = () => {
	return (
		<section className="container mx-auto py-14">
			<div className="relative grid grid-cols-1 items-center gap-6 overflow-hidden rounded-xl p-6 shadow-lg md:p-12 lg:grid-cols-7 lg:gap-12 lg:p-16">
				{/* <div className="relative inset-shadow-[0_4px_42px] inset-shadow-white/30 grid grid-cols-1 items-center gap-6 overflow-hidden rounded-2xl bg-radial-[at_50%_0%] bg-size-[120%_100%] from-orange-400 via-primary to-orange-800 p-6 md:p-12 lg:grid-cols-7 lg:gap-12"> */}

				<div className="relative z-20 text-card lg:col-span-4">
					<Badge>Get Started</Badge>
					<h2 className="mt-3 text-balance font-semibold text-3xl sm:text-4xl lg:text-6xl">
						Begin your journey to inner peace today!
					</h2>
					<p className="mt-4 max-w-md text-background/90 text-lg md:text-xl lg:mt-6">
						Join us for mindful sessions that bring clarity, calm, inner
						balance, strength, and deep connection; one breath at a time.
					</p>
					<div className="mt-8 flex flex-col items-start gap-2 sm:flex-row sm:items-center lg:mt-12">
						<Button
							className="w-full justify-between sm:w-48"
							nativeButton={false}
							render={<Link href="/contact" />}
							size="lg"
							variant="secondary"
						>
							Contact us <PhoneCallIcon />
						</Button>
						<Button
							className="px-4"
							nativeButton={false}
							render={<Link href="/classes" />}
							size="lg"
							variant="ghost"
						>
							Explore classes <ArrowRightIcon />
						</Button>
					</div>
				</div>

				<LogoIcon className="absolute -top-12 -left-48 z-10 hidden text-primary/50 lg:block" />
				<Image
					alt=""
					className="object-cover object-center"
					fill
					src="/images/cta-bg.webp"
				/>
			</div>
		</section>
	);
};

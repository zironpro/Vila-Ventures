"use client";

import Link from "next/link";

import { motion, useReducedMotion } from "motion/react";

import { TrackedCtaLink } from "@/components/analytics/tracked-cta-link";
import { TrackedSocialLink } from "@/components/analytics/tracked-social-link";
import { Button } from "@/components/ui/button";

import { LogoIcon } from "@/assets/logo";

import { SITE_CONFIG, SOCIALS } from "@/constants/site-config";

const footerNav = [
	{
		title: "Explore",
		links: [
			{ label: "Classes", href: "/classes" },
			{ label: "Shop", href: "/shop" },
			{ label: "Stories", href: "/blog" },
			{ label: "FAQ", href: "/#faq" },
		],
	},
	{
		title: "Studio",
		links: [
			{ label: "About Vila", href: "/about" },
			{ label: "Why Vila", href: "/#why-vila" },
			{ label: "Feedback", href: "/#feedback" },
			{ label: "Contact", href: "/contact" },
		],
	},
] as const;

export const Footer = () => {
	const prefersReducedMotion = useReducedMotion();

	return (
		<footer className="relative mt-9 bg-taupe-950 text-card">
			<div className="relative z-10 pt-16 pb-10">
				<div className="container max-w-7xl">
					<motion.section
						className="relative mb-14 flex flex-col gap-6 overflow-hidden rounded-lg border border-(--footer-surface-border) bg-(--footer-surface)/95 p-px px-6 py-7 shadow-[0_18px_48px_rgba(203,89,27,0.16)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:px-9 sm:py-8"
						initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
						transition={{ duration: 0.5, ease: "easeOut" }}
						viewport={{ once: true, amount: 0.4 }}
						whileInView={
							prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
						}
					>
						<div className="relative z-10 max-w-xl space-y-3">
							<h2 className="text-balance font-display text-2xl uppercase leading-snug sm:text-3xl">
								Ready to make your practice
								<span className="ml-2 rounded-full bg-(--footer-accent-soft) px-3 py-0.5 font-medium text-primary">
									a daily ritual?
								</span>
							</h2>
							<p className="text-balance text-(--footer-muted) text-sm sm:text-lg">
								Book a session or curate a mindful product selection for your
								space with Vila in the UAE.
							</p>
						</div>
						<div className="relative z-10 flex flex-col items-start gap-1.5 sm:items-center">
							<motion.div
								initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
								transition={{ duration: 0.4, ease: "easeOut", delay: 0.05 }}
								viewport={{ once: true, amount: 0.8 }}
								whileInView={
									prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
								}
							>
								<Button
									className="shadow-[0_12px_28px_rgba(203,89,27,0.38)] transition hover:-translate-y-0.5 hover:bg-orange-500 hover:shadow-[0_16px_36px_rgba(203,89,27,0.5)]"
									nativeButton={false}
									render={
										<TrackedCtaLink
											ctaLabel="Book a discovery call"
											href="/contact"
											location="footer_cta"
										/>
									}
									size="lg"
								>
									<span>Book a discovery call</span>
								</Button>
							</motion.div>
							<p className="text-muted-foreground text-xs">
								Available for new collaborations
							</p>
						</div>
						<LogoIcon className="absolute top-1/2 -right-12 hidden size-172 -translate-y-1/2 text-muted-foreground/20 sm:block" />
					</motion.section>

					<motion.section
						className="grid gap-10 border-(--footer-surface-border) border-y py-10 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-12"
						initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
						transition={{ duration: 0.5, ease: "easeOut", delay: 0.08 }}
						viewport={{ once: true, amount: 0.3 }}
						whileInView={
							prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
						}
					>
						<div className="space-y-5">
							<div className="inline-flex items-center rounded-full border border-(--footer-surface-border) bg-black/30 px-3 py-1 font-medium text-(--footer-muted) text-xs backdrop-blur">
								<span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-primary" />
								Vila • Mindful movement studio
							</div>
							<div className="space-y-3">
								<h3 className="font-semibold text-xl uppercase sm:text-3xl">
									Designed for bodies that live in the real world.
								</h3>
								<p className="text-(--footer-muted) text-sm leading-relaxed">
									Intimate yoga classes, thoughtful objects, and rituals that
									soften the edges of busy days from sunrise flows to slow
									evening unwinds in the UAE.
								</p>
							</div>
							<dl className="grid gap-3 text-(--footer-muted) text-sm sm:max-w-sm">
								<div className="flex items-center gap-2">
									<dt className="min-w-18 text-(--footer-muted) text-xs uppercase">
										Email
									</dt>
									<dd>
										<Link
											className="transition hover:text-primary"
											href={`mailto:${SITE_CONFIG.contact.email}`}
										>
											{SITE_CONFIG.contact.email}
										</Link>
									</dd>
								</div>
								<div className="flex items-center gap-2">
									<dt className="min-w-18 text-(--footer-muted) text-xs uppercase">
										Phone
									</dt>
									<dd>
										<Link
											className="transition hover:text-primary"
											href={`tel:${SITE_CONFIG.contact.phone}`}
										>
											{SITE_CONFIG.contact.phone}
										</Link>
									</dd>
								</div>
								<div className="flex items-center gap-2">
									<dt className="min-w-18 text-(--footer-muted) text-xs uppercase">
										Location
									</dt>
									<dd>UAE • In-person & curated experiences</dd>
								</div>
							</dl>
						</div>

						<div className="grid gap-8 sm:grid-cols-3">
							{footerNav.map((section) => (
								<nav
									aria-label={section.title}
									className="space-y-4"
									key={section.title}
								>
									<h4 className="font-semibold text-(--footer-muted) text-xs uppercase tracking-[0.22em]">
										{section.title}
									</h4>
									<ul className="space-y-2.5 text-(--footer-muted) text-sm">
										{section.links.map((link) => (
											<li key={link.label}>
												<Link
													className="group inline-flex items-center gap-1.5 rounded-full px-1 py-0.5 text-sm transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
													href={link.href}
												>
													<span>{link.label}</span>
													<span
														aria-hidden="true"
														className="h-0.5 w-3 rounded-full bg-(--footer-accent-soft) transition group-hover:w-5 group-hover:bg-primary"
													/>
												</Link>
											</li>
										))}
									</ul>
								</nav>
							))}

							<div className="space-y-4">
								<h4 className="font-semibold text-(--footer-muted) text-xs uppercase tracking-[0.22em]">
									Connect with Vila
								</h4>
								<p className="text-balance text-(--footer-muted) text-sm tracking-wide">
									Occasional notes, studio moments, and Vila happenings in the
									UAE shared through our social spaces.
								</p>
								<div className="mt-3 flex flex-wrap gap-3">
									{SOCIALS.map(({ name, url, Icon }) => {
										const label = `Visit Vila on ${name}`;

										return (
											<TrackedSocialLink
												aria-label={label}
												className="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-(--footer-surface-border) bg-black/35 text-(--footer-muted) shadow-[0_8px_18px_rgba(0,0,0,0.35)] outline-none transition hover:-translate-y-0.5 hover:border-primary hover:bg-(--footer-accent-soft) hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
												href={url}
												key={name}
												label={label}
												location="footer"
												rel="noopener noreferrer"
												target="_blank"
											>
												<Icon className="h-4 w-4" weight="fill" />
											</TrackedSocialLink>
										);
									})}
								</div>
							</div>
						</div>
					</motion.section>

					<div className="mt-6 flex flex-col gap-3 text-(--footer-muted) text-xs sm:flex-row sm:items-center sm:justify-between sm:text-[0.78rem]">
						<div className="flex items-center gap-1.5">
							<span className="text-[0.75rem]">
								© {new Date().getFullYear()}
							</span>
							<span className="font-medium text-(--footer-text)">
								Vila Ventures
							</span>
							<span>All rights reserved.</span>
						</div>
						<div className="flex flex-wrap items-center gap-4 text-[0.78rem]">
							<Link
								className="transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
								href="/privacy-policy"
							>
								Privacy Policy
							</Link>
							<Link
								className="transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
								href="/terms"
							>
								Terms & Conditions
							</Link>
							<span className="inline-flex items-center gap-1 text-[0.78rem]">
								<span className="relative inline-flex h-1.5 w-1.5 items-center justify-center">
									<span className="absolute inline-flex h-2.5 w-2.5 animate-ping rounded-full bg-(--footer-accent-soft)" />
									<span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
								</span>
								Designed from UAE →{" "}
								<Link
									className="text-muted transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
									href="https://zironpro.ae/?utm_source=vila-ventures&utm_medium=footer-link&utm_campaign=brand-credit"
									target="_blank"
								>
									Ziron Pro
								</Link>
							</span>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

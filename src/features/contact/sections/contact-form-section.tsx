"use client";

import Link from "next/link";

import {
	ClockIcon,
	EnvelopeSimpleIcon,
	MapPinIcon,
} from "@phosphor-icons/react";

import { TrackedCtaLink } from "@/components/analytics/tracked-cta-link";

import { ContactForm } from "../components/contact-form";

const CONTACT_DETAILS = [
	{
		Icon: EnvelopeSimpleIcon,
		label: "Email",
		value: "hello@withvila.com",
		href: "mailto:hello@withvila.com",
	},
	{
		Icon: MapPinIcon,
		label: "Location",
		value: "Abu Dhabi, UAE",
		href: undefined,
	},
	{
		Icon: ClockIcon,
		label: "Response time",
		value: "Within 24 hours",
		href: undefined,
	},
] as const;

export const ContactFormSection = () => {
	return (
		<section className="container mx-auto pb-14 lg:pb-20">
			<div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-12">
				<div className="order-2 lg:order-1 lg:col-span-3">
					<div className="rounded-xl border bg-card p-6 sm:p-8 lg:p-10">
						<h2 className="font-semibold text-xl lg:text-2xl">
							Send us a message
						</h2>
						<p className="mt-2 text-muted-foreground">
							Fill out the form below and we'll get back to you personally.
						</p>
						<div className="mt-8">
							<ContactForm />
						</div>
					</div>
				</div>

				<div className="order-1 flex flex-col gap-6 lg:order-2 lg:col-span-2">
					<div className="rounded-xl border bg-card p-6 sm:p-8">
						<h3 className="font-semibold text-lg">Contact details</h3>
						<dl className="mt-5 flex flex-col gap-5">
							{CONTACT_DETAILS.map((detail) => (
								<div className="flex items-start gap-4" key={detail.label}>
									<div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
										<detail.Icon className="size-5 text-muted-foreground" />
									</div>
									<div>
										<dt className="font-medium text-muted-foreground text-sm">
											{detail.label}
										</dt>
										<dd className="mt-0.5">
											{detail.href ? (
												<Link
													className="font-medium transition hover:text-primary"
													href={detail.href}
												>
													{detail.value}
												</Link>
											) : (
												<span className="font-medium">{detail.value}</span>
											)}
										</dd>
									</div>
								</div>
							))}
						</dl>
					</div>

					<div className="rounded-xl border bg-card p-6 sm:p-8">
						<h3 className="font-semibold text-lg">Prefer a live chat?</h3>
						<p className="mt-2 text-muted-foreground leading-relaxed">
							Book a free 15-minute discovery call no prep needed. We'll talk
							about your goals, answer your questions, and figure out the best
							next step together.
						</p>
						<TrackedCtaLink
							className="mt-5 inline-flex h-10 items-center justify-center rounded-lg bg-primary px-5 font-medium text-primary-foreground text-sm transition hover:bg-primary/90"
							ctaLabel="Book a discovery call"
							href="/classes"
							location="contact_sidebar"
						>
							Book a discovery call
						</TrackedCtaLink>
					</div>

					<div className="rounded-xl bg-primary p-6 text-background shadow-md sm:p-8">
						<p className="font-display text-lg uppercase leading-snug lg:text-xl">
							"Every question is the beginning of a conversation and every
							conversation is the start of something meaningful."
						</p>
						<p className="mt-4 font-medium text-muted/80 text-sm">
							- Vila, Founder
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

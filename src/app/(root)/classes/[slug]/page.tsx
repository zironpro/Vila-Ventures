import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";

import { ClassViewTracker } from "@/components/analytics/class-view-tracker";
import { ProgressiveBlur } from "@/components/common/progressive-blur";
import { Cta } from "@/components/layout/cta";
import { RichText } from "@/components/rich-text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { LogoIcon } from "@/assets/logo";

import { SITE_URL } from "@/constants/site-config";
import {
	getClassBySlug,
	getClasses,
	getClassSlugs,
} from "@/features/classes/actions";
import { BookClassModalTrigger } from "@/features/classes/components/booking-modal";
import { JsonLd } from "@/features/seo/json-ld";
import { getMediaUrl } from "@/lib/utils/getMediaUrl";
import type { Media } from "@/payload-types";

type PageProps = {
	params: Promise<{ slug: string }>;
};

const getClassImageUrl = (value: unknown) => {
	if (typeof value !== "object" || value === null) return "";
	if (!("url" in value)) return "";

	return getMediaUrl((value as Media).url);
};

const getSeoKeywords = (item: Awaited<ReturnType<typeof getClassBySlug>>) => {
	if (!item) return ["Vila Ventures classes", "yoga class UAE"];

	return [
		item.title,
		`${item.title} class`,
		"Vila Ventures",
		"Yoga class UAE",
		item.format,
		item.bestFor,
	].filter((keyword): keyword is string => Boolean(keyword));
};

export async function generateStaticParams() {
	const slugs = await getClassSlugs();

	return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { slug } = await params;
	const item = await getClassBySlug(slug);

	if (!item) {
		return {
			title: "Class Not Found | Vila Ventures",
		};
	}

	const fallbackDescription = item.description;
	const description = item.meta?.description || fallbackDescription;
	const title = item.meta?.title || `${item.title} Class | Vila Ventures`;
	const ogImage =
		getClassImageUrl(item.meta?.image) || getClassImageUrl(item.image);
	const canonicalUrl = `${SITE_URL}/classes/${item.slug}`;

	return {
		title,
		description,
		openGraph: {
			url: canonicalUrl,
			title,
			description,
			type: "article",
			images: ogImage
				? [
						{
							url: ogImage,
							alt: `${item.title} at Vila Ventures`,
						},
					]
				: [],
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: ogImage ? [ogImage] : [],
		},
		keywords: getSeoKeywords(item),
		category: "Health & Wellness",
		robots: {
			index: true,
			follow: true,
		},
		alternates: {
			canonical: canonicalUrl,
		},
	};
}

export default async function ClassContentPage({ params }: PageProps) {
	const { slug } = await params;
	const item = await getClassBySlug(slug);

	if (!item) {
		notFound();
	}

	const classes = await getClasses();
	const otherClasses = classes
		.filter((classItem) => classItem.slug && classItem.slug !== item.slug)
		.slice(0, 3);

	const jsonLd = {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "WebPage",
				"@id": `${SITE_URL}/classes/${item.slug}#webpage`,
				url: `${SITE_URL}/classes/${item.slug}`,
				name: item.meta?.title || `${item.title} Class | Vila Ventures`,
				description: item.meta?.description || item.description,
				mainEntity: {
					"@id": `${SITE_URL}/classes/${item.slug}#course`,
				},
				isPartOf: {
					"@id": `${SITE_URL}/#website`,
				},
			},
			{
				"@type": "Course",
				"@id": `${SITE_URL}/classes/${item.slug}#course`,
				name: item.title,
				description: item.meta?.description || item.description,
				provider: {
					"@type": "Organization",
					"@id": `${SITE_URL}/#organization`,
					name: "Vila Ventures",
				},
				courseMode: item.format || "Onsite",
				image: getClassImageUrl(item.image),
				url: `${SITE_URL}/classes/${item.slug}`,
				mainEntityOfPage: {
					"@id": `${SITE_URL}/classes/${item.slug}#webpage`,
				},
			},
			{
				"@type": "BreadcrumbList",
				"@id": `${SITE_URL}/classes/${item.slug}#breadcrumb`,
				itemListElement: [
					{
						"@type": "ListItem",
						position: 1,
						name: "Home",
						item: SITE_URL,
					},
					{
						"@type": "ListItem",
						position: 2,
						name: "Classes",
						item: `${SITE_URL}/classes`,
					},
					{
						"@type": "ListItem",
						position: 3,
						name: item.title,
						item: `${SITE_URL}/classes/${item.slug}`,
					},
				],
			},
		],
	};

	const classImage = getClassImageUrl(item.image);
	const classTags = [item.tagline, item.format, item.bestFor].filter(
		(value): value is string => Boolean(value)
	);

	return (
		<>
			<JsonLd data={jsonLd} />
			{item.slug ? (
				<ClassViewTracker
					best_for={item.bestFor ?? undefined}
					class_id={item.id}
					format={item.format ?? undefined}
					slug={item.slug}
					tagline={item.tagline ?? undefined}
					title={item.title}
				/>
			) : null}
			<main className="relative overflow-hidden bg-background">
				<div
					aria-hidden
					className="pointer-events-none absolute -top-16 left-1/2 z-0 h-80 w-2xl -translate-x-1/2 rounded-full bg-primary/6 blur-3xl"
				/>

				<header className="relative z-10 overflow-hidden border-border/60 border-b bg-primary py-12 md:py-16 lg:py-28">
					<div className="container relative z-10 mx-auto">
						<div className="grid items-start gap-10 lg:grid-cols-[1fr_0.82fr]">
							<div>
								<Badge>{item.tagline}</Badge>
								<h1 className="mt-4 max-w-4xl font-display text-4xl text-card leading-tight sm:text-5xl lg:text-6xl">
									{item.title}
								</h1>
								<p className="mt-5 max-w-2xl text-balance text-background/90 text-base leading-relaxed sm:text-lg">
									{item.description}
								</p>

								{classTags.length > 0 ? (
									<div className="mt-6 flex flex-wrap gap-2.5 text-sm">
										{classTags.map((value) => (
											<Badge key={value} variant="outline">
												{value}
											</Badge>
										))}
									</div>
								) : null}

								<div className="mt-8 flex flex-wrap gap-3">
									<Button
										className="shadow-lg"
										nativeButton={false}
										render={<Link href="/classes" />}
										size="lg"
									>
										View all classes <ArrowRightIcon data-icon="inline-end" />
									</Button>
									<BookClassModalTrigger>
										<Button
											className="cursor-pointer"
											size="lg"
											variant="secondary"
										>
											Book a session
										</Button>
									</BookClassModalTrigger>
								</div>
							</div>

							<div className="relative overflow-hidden rounded-2xl border border-border/70 bg-card shadow-md">
								{classImage && (
									<div className="relative aspect-16/10">
										<Image
											alt={`${item.title} class at Vila Ventures`}
											className="object-cover"
											fill
											priority
											sizes="(max-width: 1024px) 100vw, 38vw"
											src={classImage}
										/>
									</div>
								)}
							</div>
						</div>
					</div>
					<LogoIcon
						aria-hidden
						className="pointer-events-none absolute -top-16 -left-1/4 text-orange-300/10"
					/>
				</header>

				<section className="container relative z-10 mx-auto pt-10 lg:pt-14">
					<div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem] xl:grid-cols-[minmax(0,1fr)_20rem]">
						<article className="rounded-2xl border border-border/70 bg-card px-6 py-8 shadow-sm sm:px-8 lg:px-10 lg:py-10">
							<RichText
								className="prose prose-stone prose-headings:mt-10 max-w-none prose-ol:space-y-3 prose-ul:space-y-3 prose-blockquote:border-primary/30 prose-blockquote:bg-muted/35 prose-blockquote:px-5 prose-blockquote:py-3 prose-blockquote:font-medium prose-headings:font-display prose-a:text-primary prose-blockquote:text-foreground/85 prose-h2:text-3xl prose-h3:text-2xl prose-headings:text-foreground prose-li:text-foreground/90 prose-p:text-foreground/85 prose-strong:text-foreground prose-h2:leading-tight prose-h3:leading-snug prose-p:leading-8 prose-a:no-underline hover:prose-a:underline"
								data={item.content}
								enableProse
							/>
						</article>

						<aside className="h-fit rounded-2xl bg-card/50 p-2 lg:sticky lg:top-24">
							<div className="space-y-2">
								<div className="rounded-xl border border-border/70 bg-card p-3 shadow-md">
									<p className="text-muted-foreground text-xs uppercase tracking-wide">
										Focus
									</p>
									<p className="mt-1 text-foreground text-sm">
										{item.tagline || "Mindful movement and sustainable energy."}
									</p>
								</div>
								<div className="rounded-xl border border-border/70 bg-card p-3 shadow-md">
									<p className="text-muted-foreground text-xs uppercase tracking-wide">
										Format
									</p>
									<p className="mt-1 text-foreground text-sm">
										{item.format || "In-studio guidance"}
									</p>
								</div>
								<div className="rounded-xl border border-border/70 bg-card p-3 shadow-md">
									<p className="text-muted-foreground text-xs uppercase tracking-wide">
										Best For
									</p>
									<p className="mt-1 text-foreground text-sm">
										{item.bestFor || "All levels looking for steady progress"}
									</p>
								</div>
							</div>
						</aside>
					</div>
				</section>

				{otherClasses.length > 0 ? (
					<section className="container relative z-10 mx-auto pt-10 pb-4 lg:pt-12">
						<div className="mb-6 flex items-center justify-between gap-4">
							<h2 className="font-display text-3xl text-foreground sm:text-4xl">
								Other classes
							</h2>
							<Button
								nativeButton={false}
								render={<Link href="/classes" />}
								size="sm"
							>
								See all
							</Button>
						</div>

						<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
							{otherClasses.map((classItem) => {
								const imageUrl = getClassImageUrl(classItem.image);

								return (
									<div className="group" key={classItem.id}>
										<div className="mb-2 flex items-center justify-between gap-3 rounded-lg bg-card p-6">
											<p className="font-bold text-xl">{classItem.title}</p>
											<p className="font-light text-muted-foreground text-sm">
												{classItem.tagline}
											</p>
										</div>
										<Link
											aria-label={`View ${classItem.title} class details`}
											className="block rounded-[calc(var(--radius)+4px)] bg-card p-1"
											href={`/classes/${classItem.slug}`}
										>
											<div className="relative aspect-4/3 size-full overflow-hidden rounded-lg">
												<div className="absolute inset-x-0 bottom-0 z-20 flex flex-col gap-3 p-6 text-card">
													<p className="font-medium text-lg tracking-wide">
														{classItem.description}
													</p>
													<div className="flex flex-wrap gap-x-4 gap-y-1 text-card/70 text-sm">
														<span>{classItem.format}</span>
														<span className="hidden sm:inline">·</span>
														<span>{classItem.bestFor}</span>
													</div>
												</div>
												<div className="absolute inset-x-0 bottom-0 z-10 h-2/3 bg-linear-to-t from-black/60 to-transparent" />
												<ProgressiveBlur
													className="[--height:50%]"
													position="bottom"
												/>
												{imageUrl ? (
													<Image
														alt={`${classItem.title} class at Vila Ventures`}
														className="object-cover transition-[scale] duration-300 group-hover:scale-105"
														fill
														sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
														src={imageUrl}
													/>
												) : null}
											</div>
										</Link>
									</div>
								);
							})}
						</div>
					</section>
				) : null}

				<Cta />
			</main>
		</>
	);
}

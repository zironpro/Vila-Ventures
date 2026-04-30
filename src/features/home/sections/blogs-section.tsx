import Image from "next/image";
import Link from "next/link";

import {
	ArrowRightIcon,
	CalendarBlankIcon,
	ClockIcon,
} from "@phosphor-icons/react/dist/ssr";

import { ProgressiveBlur } from "@/components/common/progressive-blur";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { BLOG_POSTS } from "@/features/blogs/constants";

export const BlogsSection = () => {
	const featuredPost =
		BLOG_POSTS.find((post) => post.isFeatured) ?? BLOG_POSTS[0];
	const sidePosts = BLOG_POSTS.filter(
		(post) => post.slug !== featuredPost.slug
	).slice(0, 3);

	return (
		<section className="container mx-auto py-14" id="blog">
			<div className="grid grid-cols-1 gap-6 text-start md:grid-cols-4">
				<Badge className="bg-card text-muted-foreground!" variant="secondary">
					Blogs
				</Badge>
				<div className="col-span-1 grid grid-cols-1 gap-6 sm:grid-cols-2 md:col-span-3">
					<h2 className="font-semibold text-2xl text-muted-foreground sm:text-3xl lg:text-4xl">
						Insights on Yoga, Wellness & Mindful Living
					</h2>
					<div>
						<p className="mb-4 text-lg text-muted-foreground leading-snug">
							Explore tips, stories, and ideas to support your journey toward a
							balanced life.
						</p>
						<Button
							className="shadow-lg"
							render={<Link href="/blog" />}
							size="lg"
						>
							View all blogs
						</Button>
					</div>
				</div>
			</div>

			<div className="mt-8 grid gap-4 lg:grid-cols-2">
				<Link
					className="group relative block min-h-88 overflow-hidden rounded-xl lg:min-h-144"
					href={`/blog/${featuredPost.slug}` as never}
				>
					<Image
						alt={featuredPost.imageAlt}
						className="object-cover transition-transform duration-300 group-hover:scale-105"
						fill
						priority
						src={featuredPost.image}
					/>
					<div className="absolute inset-x-0 bottom-0 z-10 p-5 text-card sm:p-9">
						<div className="mb-3 flex items-center gap-4 text-card/90 text-sm">
							<p className="flex items-center gap-1.5">
								<ClockIcon size={16} />
								{featuredPost.readingTime}
							</p>
							<div className="flex items-center gap-1.5">
								<CalendarBlankIcon size={16} />
								<span>{featuredPost.date}</span>
							</div>
						</div>
						<div className="flex items-end justify-between gap-9">
							<h3 className="flex-1 font-medium text-xl leading-tight sm:text-2xl lg:text-3xl">
								{featuredPost.title}
							</h3>
							<span className="flex items-center gap-1 font-medium text-card text-sm">
								Read more
								<ArrowRightIcon size={16} />
							</span>
						</div>
					</div>
					<ProgressiveBlur className="[--height:60%]" position="bottom" />
					<div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent" />
				</Link>

				<div className="flex flex-col gap-4">
					{sidePosts.map((post) => (
						<Link
							className="group flex h-full flex-col overflow-hidden rounded-lg border border-border/60 bg-card sm:flex-row"
							href={`/blog/${post.slug}` as never}
							key={post.slug}
						>
							<div className="relative aspect-video flex-1 sm:aspect-4/3 sm:h-full">
								<Image
									alt={post.imageAlt}
									className="object-cover"
									fill
									src={post.image}
								/>
							</div>
							<div className="flex flex-col justify-center p-4">
								<div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-muted-foreground text-sm">
									<p className="flex items-center gap-1.5">
										<ClockIcon size={16} />
										{post.readingTime}
									</p>
									<div className="flex items-center gap-1.5">
										<CalendarBlankIcon size={14} />
										<span>{post.date}</span>
									</div>
								</div>
								<h3 className="line-clamp-3 font-medium text-2xl">
									{post.title}
								</h3>
								<span className="mt-2 flex w-fit items-center gap-1 font-medium text-primary text-sm">
									Read more
									<ArrowRightIcon size={14} />
								</span>
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
};

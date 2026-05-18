import Link from "next/link";

import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";

import { RichText } from "@/components/rich-text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Currency } from "@/assets/icons/currency";

import { Product } from "@/payload-types";

import { AddToBagButton } from "../components/add-to-bag-button";
import { ProductGallery } from "./components/gallery";

interface ProductHeroProps {
	product: Product;
}

export const ProductHero = ({ product }: ProductHeroProps) => {
	return (
		<section className="pt-22 pb-14 lg:pt-24 lg:pb-20">
			<div className="container mx-auto">
				<div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2 lg:gap-16">
					<Link
						className="ease group inline-flex items-center gap-2 text-muted-foreground text-sm transition-colors duration-200 hover:text-foreground md:hidden"
						href="/shop"
					>
						<ArrowLeftIcon className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
						Back to shop
					</Link>
					<ProductGallery data={product.gallery} />
					<div className="flex flex-col md:sticky md:top-24 md:h-[calc(100svh-10rem)] md:justify-between md:py-6">
						<div>
							<div className="flex items-center gap-3">
								{product.categories?.map((category) =>
									typeof category === "object" ? (
										<Badge
											className="bg-card text-muted-foreground!"
											key={category.id}
											variant="secondary"
										>
											{category.title}
										</Badge>
									) : null
								)}
								{!!product.tags?.length && (
									<ul className="flex flex-col gap-3">
										{product.tags
											.filter((tag) => typeof tag === "object")
											.map((tag) => (
												<li key={tag.id}>
													<Badge className="bg-card text-muted-foreground!">
														{tag.title}
													</Badge>
												</li>
											))}
									</ul>
								)}

								{(product.inventory ?? 0) > 0 && (
									<span className="flex items-center gap-2 text-muted-foreground text-sm">
										<span className="size-1.5 rounded-full bg-green-500" />
										In stock
									</span>
								)}
							</div>

							<h1 className="mt-4 text-balance font-display text-4xl text-primary uppercase leading-snug sm:text-5xl">
								{product.title}
							</h1>

							<div className="mt-4 flex items-center gap-2">
								<Currency />
								<span className="font-medium text-3xl">
									{product.price.toFixed(2)}
								</span>
								<span className="text-muted-foreground">AED</span>
							</div>
						</div>

						<div>
							{product.description && (
								<RichText
									className="prose-sm mx-0 max-w-lg"
									data={product.description}
									enableGutter={false}
								/>
							)}

							<div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
								{product.slug ? (
									<AddToBagButton
										price={product.price}
										productId={product.id}
										slug={product.slug}
										title={product.title}
									/>
								) : null}
								<Button
									nativeButton={false}
									render={<Link href="/shop" />}
									size="lg"
									variant="ghost"
								>
									Continue shopping
								</Button>
							</div>
						</div>

						{/* <div className="mt-8 grid grid-cols-2 gap-4 rounded-lg border bg-card p-4 sm:grid-cols-3">
							<div className="text-center">
								<p className="font-medium text-sm">Free shipping</p>
								<p className="text-muted-foreground text-xs">Over 200 AED</p>
							</div>
							<div className="text-center">
								<p className="font-medium text-sm">14-day returns</p>
								<p className="text-muted-foreground text-xs">No questions</p>
							</div>
							<div className="col-span-2 text-center sm:col-span-1">
								<p className="font-medium text-sm">Secure checkout</p>
								<p className="text-muted-foreground text-xs">SSL encrypted</p>
							</div>
						</div> */}
					</div>
				</div>
			</div>
		</section>
	);
};

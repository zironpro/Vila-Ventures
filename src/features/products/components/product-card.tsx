import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";

import { Media } from "@/components/media";
import { Button } from "@/components/ui/button";

import { Currency } from "@/assets/icons/currency";

import { Product } from "@/payload-types";

import { ProductCardLink } from "./product-card-link";

interface ProductCardProps {
	product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
	const content = (
		<div className="group text-start">
			<div className="relative aspect-5/6 overflow-hidden rounded-lg border border-primary">
				<Media
					alt={product.title}
					fill
					imgClassName="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
					resource={product.gallery?.[0].image}
					size="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
				/>
			</div>
			<div className="mt-2 rounded-lg bg-card p-4 transition-colors ease-out group-hover:bg-primary group-hover:text-white">
				<h3 className="font-display text-2xl text-primary transition-colors ease-out group-hover:text-white">
					{product.title}
				</h3>

				<div className="mt-2 flex items-center justify-between gap-3">
					<div className="flex items-center gap-1">
						<Currency />
						<p className="font-medium text-xl">{product.price.toFixed(2)}</p>
					</div>
					<Button variant="ghost">
						Buy now
						<ArrowRightIcon className="size-3 text-muted-foreground transition-colors ease-out group-hover:text-white" />
					</Button>
				</div>
			</div>
		</div>
	);

	if (product.slug) {
		return (
			<ProductCardLink
				href={`/shop/${product.slug}`}
				price={product.price}
				productId={product.id}
				slug={product.slug}
				title={product.title}
			>
				{content}
			</ProductCardLink>
		);
	}

	return content;
};

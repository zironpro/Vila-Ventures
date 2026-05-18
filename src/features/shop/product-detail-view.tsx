import { ProductViewTracker } from "@/components/analytics/product-view-tracker";
import { Cta } from "@/components/layout/cta";

import { Product } from "@/payload-types";

import { ProductDetailsSection } from "./sections/product-details-section";
import { ProductHero } from "./sections/product-hero";
import { RelatedProductsSection } from "./sections/related-products-section";

interface ProductDetailViewProps {
	product: Product;
}

function getProductCategory(product: Product): string | undefined {
	const first = product.categories?.[0];
	return typeof first === "object" ? first.title : undefined;
}

export const ProductDetailView = ({ product }: ProductDetailViewProps) => {
	return (
		<main>
			{product.slug ? (
				<ProductViewTracker
					category={getProductCategory(product)}
					in_stock={(product.inventory ?? 0) > 0}
					price={product.price}
					product_id={product.id}
					slug={product.slug}
					title={product.title}
				/>
			) : null}
			<ProductHero product={product} />
			<ProductDetailsSection product={product} />
			<RelatedProductsSection currentProduct={product} />
			<Cta />
		</main>
	);
};

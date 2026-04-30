import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { ProductsGrid } from "@/features/products/components/products-grid";

export const ProductsSection = () => {
	return (
		<section className="container mx-auto py-14 text-center" id="products">
			<div className="grid grid-cols-1 gap-6 text-start md:grid-cols-4">
				<Badge className="bg-card text-muted-foreground!" variant="secondary">
					Products
				</Badge>
				<div className="col-span-1 grid grid-cols-1 gap-6 sm:grid-cols-2 md:col-span-3">
					<h2 className="font-semibold text-2xl text-muted-foreground sm:text-3xl lg:text-4xl">
						<span className="text-foreground">Thoughtfully Designed</span> for
						Everyday Joy
					</h2>
					<div>
						<p className="mb-4 text-lg text-muted-foreground leading-snug">
							Flexible, guided, and designed for real life - practice from
							anywhere, at your own pace.
						</p>

						<Button
							nativeButton={false}
							render={<Link href="/shop" />}
							size="lg"
						>
							Shop the Collection
						</Button>
					</div>
				</div>
			</div>

			<ProductsGrid />

			<Button
				className="shadow-lg duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:px-8"
				nativeButton={false}
				render={<Link href="/shop" />}
				size="lg"
			>
				Shop the Collection
			</Button>
		</section>
	);
};

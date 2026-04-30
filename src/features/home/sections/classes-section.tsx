import Link from "next/link";

import { Button } from "@/components/ui/button";

import { ClassesGrid } from "../components/classes-grid";

export const ClassesSection = () => {
	return (
		<section className="container mx-auto py-14" id="classes">
			<div className="grid grid-cols-1 items-center gap-6 md:grid-cols-3">
				<h2 className="font-display text-5xl text-primary md:text-8xl">
					Classes
				</h2>

				<p className="text-lg text-muted-foreground leading-relaxed">
					Flexible, guided, and designed for real life - practice from anywhere,
					at your own pace.
				</p>

				<Button
					className="w-fit justify-self-start shadow-lg md:justify-self-end"
					nativeButton={false}
					render={<Link href="/classes" />}
					size="lg"
				>
					View All Classes & Programs
				</Button>
			</div>

			<ClassesGrid />
		</section>
	);
};

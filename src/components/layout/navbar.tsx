"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
	CalendarBlankIcon,
	ListIcon,
	MagnifyingGlassIcon,
	ShoppingCartIcon,
} from "@phosphor-icons/react";
import { domAnimation, LazyMotion, m } from "motion/react";

import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerClose,
	DrawerHeader,
	DrawerPanel,
	DrawerPopup,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";

import { Logo } from "@/assets/logo";

import { NAV_LINKS } from "@/constants/layout";
import { cn } from "@/lib/utils";

import { ProgressiveBlur } from "../common/progressive-blur";

export const Navbar = () => {
	const pathname = usePathname();
	const isHomePage = pathname === "/";
	const [isPastHero, setIsPastHero] = useState(false);

	useEffect(() => {
		if (!isHomePage) {
			setIsPastHero(true);
			return;
		}

		let ticking = false;

		const getThreshold = () => Math.max(window.innerHeight - 72, 0);

		const updateScrollState = () => {
			setIsPastHero(window.scrollY >= getThreshold());
		};

		const onScroll = () => {
			if (ticking) return;
			ticking = true;
			window.requestAnimationFrame(() => {
				updateScrollState();
				ticking = false;
			});
		};

		updateScrollState();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", updateScrollState);

		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", updateScrollState);
		};
	}, [isHomePage]);

	const isActiveRoute = (href: string) => {
		if (href === "/") return pathname === href;
		return pathname === href || pathname.startsWith(`${href}/`);
	};

	return (
		<header className="fixed inset-x-0 top-0 z-999">
			<div className="container relative z-10 mx-auto mt-4 flex h-14 items-center justify-between px-4">
				<Link className="flex flex-1 items-center gap-2" href="/">
					<LazyMotion features={domAnimation}>
						<m.div
							animate={isHomePage && !isPastHero ? "hero" : "scrolled"}
							className="will-change-[color]"
							transition={{ duration: 0.25, ease: "easeOut" }}
							variants={{
								hero: { color: "var(--color-card)" },
								scrolled: { color: "var(--color-foreground)" },
							}}
						>
							<Logo />
						</m.div>
					</LazyMotion>
				</Link>

				<nav className="inset-shadow-white inset-shadow-xs hidden h-full items-center rounded-lg bg-card px-6 shadow-lg transition-[padding] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:bg-card hover:px-9 supports-backdrop-filter:bg-card/75 supports-backdrop-filter:backdrop-blur-lg lg:flex">
					<ul className="flex items-center gap-2">
						{NAV_LINKS.map((nav) => (
							<li key={`${nav.href}-${nav.label}`}>
								<Link
									className={cn(
										"px-3 py-3 font-display text-foreground transition-colors hover:text-primary",
										isActiveRoute(nav.href) && "text-primary"
									)}
									href={nav.href}
								>
									{nav.label}
								</Link>
							</li>
						))}
					</ul>
				</nav>

				<div className="hidden flex-1 justify-end lg:flex">
					<div className="flex items-center gap-2 rounded-[calc(var(--radius-lg)+0.25rem)] border border-border/20 bg-card/95 p-1 shadow-sm backdrop-blur-lg supports-backdrop-filter:bg-muted/50">
						<Button size="icon-lg" variant="ghost">
							<MagnifyingGlassIcon size={24} />
						</Button>
						<Button size="icon-lg" variant="ghost">
							<ShoppingCartIcon size={24} />
						</Button>
						<Button
							className="shadow-lg"
							nativeButton={false}
							render={<Link href="/classes" />}
							size="lg"
						>
							<CalendarBlankIcon data-icon="inline-start" size={24} /> Book a
							class
						</Button>
					</div>
				</div>

				<div className="flex items-center gap-2 lg:hidden">
					<div className="flex items-center gap-1 rounded-md border border-card/20 bg-card/95 p-1 backdrop-blur-lg supports-backdrop-filter:bg-muted-foreground/20">
						<Button size="icon-lg" variant="ghost">
							<ShoppingCartIcon size={20} />
						</Button>

						<Drawer position="left">
							<DrawerTrigger render={<Button size="icon-lg" variant="ghost" />}>
								<ListIcon size={20} />
							</DrawerTrigger>
							<DrawerPopup showCloseButton variant="inset">
								<DrawerHeader>
									<DrawerTitle>
										<Logo className="text-primary" />
										<span className="sr-only">Vila Ventures</span>
									</DrawerTitle>
								</DrawerHeader>
								<DrawerPanel>
									<nav className="-mx-[calc(--spacing(3)-1px)] flex flex-col gap-0.5">
										{NAV_LINKS.map((nav) => (
											<DrawerClose
												key={`${nav.href}-${nav.label}`}
												nativeButton={false}
												render={
													<Button
														className="justify-start"
														render={<Link href={nav.href} />}
														variant="ghost"
													/>
												}
											>
												{nav.label}
											</DrawerClose>
										))}
									</nav>
								</DrawerPanel>
							</DrawerPopup>
						</Drawer>
					</div>
				</div>
			</div>
			<ProgressiveBlur className="[--height:200%]" position="top" />
		</header>
	);
};

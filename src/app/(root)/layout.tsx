import type { Metadata } from "next";
import "@/styles/globals.css";

import { Toaster } from "sonner";

import { LaunchCountdown } from "@/components/common/launch-countdown";
import { BreakpointIndicator } from "@/components/layout/breakpoint-indicator";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Providers } from "@/components/providers";

import { inter, serif } from "@/assets/fonts";

import { SITE_URL } from "@/constants/site-config";
import { MembershipModal } from "@/features/classes/components/booking-modal";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: {
		default:
			"Vila Ventures | Yoga Classes & Mindful Lifestyle Products in Abu Dhabi",
		template: "%s | Vila Ventures",
	},
	description:
		"Discover mindful yoga classes, creative lifestyle products & a community rooted in joy. Group, private & corporate sessions in Abu Dhabi, UAE. Book your session today.",
	keywords: [
		"yoga classes Abu Dhabi",
		"yoga UAE",
		"mindful lifestyle products",
		"corporate yoga UAE",
		"kids yoga Abu Dhabi",
		"private yoga sessions Abu Dhabi",
		"vinyasa yoga UAE",
		"hatha yoga Abu Dhabi",
		"online yoga classes UAE",
		"yoga mats UAE",
		"mindful living",
		"Vila Ventures",
		"wellness Abu Dhabi",
	],
	authors: [{ name: "Vila", url: SITE_URL }],
	creator: "Vila Ventures",
	publisher: "Vila Ventures",
	category: "Health & Wellness",
	openGraph: {
		type: "website",
		locale: "en_US",
		url: SITE_URL,
		siteName: "Vila Ventures",
		title: "Vila Ventures | Yoga & Mindful Lifestyle in Abu Dhabi",
		description:
			"Mindful yoga classes, creative lifestyle products & a community rooted in joy. Group, private & corporate sessions in Abu Dhabi.",
		images: [
			{
				url: "/og-image.png",
				width: 1200,
				height: 630,
				alt: "Vila Ventures - Yoga Classes & Mindful Lifestyle Products in Abu Dhabi",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Vila Ventures | Yoga & Mindful Lifestyle in Abu Dhabi",
		description:
			"Mindful yoga classes, creative lifestyle products & a community rooted in joy. Book your session in Abu Dhabi today.",
		images: ["/og-image.png"],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	alternates: {
		canonical: SITE_URL,
	},
	verification: {
		google: "hZ8wVNy_ruWjv1Dtfa9XJeHhjxFniBBvwnJvopj2boY",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			className={cn(
				"h-full scroll-smooth antialiased",
				serif.variable,
				inter.className
			)}
			lang="en"
		>
			<body>
				<Providers>
					<LaunchCountdown />
					<Navbar />
					{children}
					<Footer />
					<Toaster position="bottom-right" richColors />
					<BreakpointIndicator />
					<MembershipModal />
				</Providers>
			</body>
		</html>
	);
}

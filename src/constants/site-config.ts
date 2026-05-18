import {
	FacebookLogoIcon,
	InstagramLogoIcon,
} from "@phosphor-icons/react/dist/ssr";

export const SITE_URL = "https://vilaventures.ae" as const;

export const SITE_CONFIG = {
	name: "Vila Ventures",
	description:
		"A creative lifestyle brand and community space rooted in joy, blending mindful yoga experiences with thoughtfully designed lifestyle products in Abu Dhabi, UAE.",
	url: SITE_URL,
	logo: `${SITE_URL}/og-image.png`,

	contact: {
		email: "vilaventures@gmail.com",
		phone: "+971 56 818 1660",
	},
} as const;

export const SOCIALS = [
	{
		name: "Instagram",
		url: "https://instagram.com/vilaventures._/",
		Icon: InstagramLogoIcon,
	},
	{
		name: "Facebook",
		url: "https://www.facebook.com/profile.php?id=61589107060594",
		Icon: FacebookLogoIcon,
	},
] as const;

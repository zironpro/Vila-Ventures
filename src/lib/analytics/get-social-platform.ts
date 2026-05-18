import type { SocialPlatform } from "./events";

export function getSocialPlatformFromUrl(url: string): SocialPlatform {
	const hostname = new URL(url).hostname.toLowerCase();

	if (hostname.includes("instagram")) return "instagram";
	if (hostname.includes("facebook")) return "facebook";
	if (hostname.includes("linkedin")) return "linkedin";
	if (hostname.includes("twitter") || hostname.includes("x.com")) return "x";

	return "other";
}

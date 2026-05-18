import { OpenPanel } from "@openpanel/nextjs";

function createServerClient(): OpenPanel | null {
	const clientId = process.env.NEXT_PUBLIC_OPENPANEL_CLIENT_ID ?? "";
	const clientSecret = process.env.OPENPANEL_CLIENT_SECRET ?? "";

	if (!clientId || !clientSecret) {
		return null;
	}

	return new OpenPanel({
		clientId,
		clientSecret,
	});
}

export const openPanelServer = createServerClient();

export function trackServerEvent(
	name: string,
	properties?: Record<string, string | number | boolean | undefined>
): void {
	openPanelServer?.track(name, properties);
}

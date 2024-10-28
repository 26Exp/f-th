import mockApi from 'src/@mock-utils/mockApi';
import { SettingsNotifications } from '@/app/(control-panel)/apps/settings/SettingsApi';

/**
 * GET api/mock/app-notification-settings
 */
export async function GET(req: Request) {
	const url = new URL(req.url);
	const queryParams = Object.fromEntries(url.searchParams.entries());
	const api = mockApi('app_notification_settings');
	const items = await api.findAll<SettingsNotifications>(queryParams);

	return new Response(JSON.stringify(items), { status: 200 });
}

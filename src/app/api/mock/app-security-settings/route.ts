import mockApi from 'src/@mock-utils/mockApi';
import { SettingsSecurity } from '@/app/(control-panel)/apps/settings/SettingsApi';

/**
 * GET api/mock/app-security-settings
 */
export async function GET(req: Request) {
	const url = new URL(req.url);
	const queryParams = Object.fromEntries(url.searchParams.entries());
	const api = mockApi('app_security_settings');
	const items = await api.findAll<SettingsSecurity>(queryParams);

	return new Response(JSON.stringify(items), { status: 200 });
}

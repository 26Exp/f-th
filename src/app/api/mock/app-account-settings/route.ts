import mockApi from 'src/@mock-utils/mockApi';
import { SettingsAccount } from '@/app/(control-panel)/apps/settings/SettingsApi';

/**
 * GET api/mock/app-account-settings
 */
export async function GET(req: Request) {
	const url = new URL(req.url);
	const queryParams = Object.fromEntries(url.searchParams.entries());
	const api = mockApi('app_account_settings');
	const items = await api.findAll<SettingsAccount>(queryParams);

	return new Response(JSON.stringify(items), { status: 200 });
}

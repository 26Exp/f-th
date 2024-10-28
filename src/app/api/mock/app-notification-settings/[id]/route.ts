import mockApi from 'src/@mock-utils/mockApi';
import { SettingsNotifications } from '@/app/(control-panel)/apps/settings/SettingsApi';

/**
 * GET api/mock/app-notification-settings/{id}
 */
export async function GET(req: Request, { params }: { params: { id: string } }) {
	const { id } = params;
	const api = mockApi('app_notification_settings');
	const item = await api.find<SettingsNotifications>(id);

	if (!item) {
		return new Response(JSON.stringify({ message: 'Item not found' }), { status: 404 });
	}

	return new Response(JSON.stringify(item), { status: 200 });
}

/**
 * PUT api/mock/app-notification-settings/{id}
 */
export async function PUT(req: Request, { params }: { params: { id: string } }) {
	const { id } = params;
	const api = mockApi('app_notification_settings');
	const data = (await req.json()) as SettingsNotifications;
	const updatedItem = await api.update<SettingsNotifications>(id, data);

	if (!updatedItem) {
		return new Response(JSON.stringify({ message: 'Item not found' }), { status: 404 });
	}

	return new Response(JSON.stringify(updatedItem), { status: 200 });
}

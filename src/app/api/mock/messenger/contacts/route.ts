import mockApi from 'src/@mock-utils/mockApi';
import { Contact } from '@/app/(control-panel)/apps/messenger/MessengerApi';

/**
 * GET api/mock/messenger/contacts
 */
export async function GET(req: Request) {
	const url = new URL(req.url);
	const queryParams = Object.fromEntries(url.searchParams.entries());
	const api = mockApi('messenger_contacts');
	const items = await api.findAll<Contact>(queryParams);

	return new Response(JSON.stringify(items), { status: 200 });
}

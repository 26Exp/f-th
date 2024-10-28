import mockApi from 'src/@mock-utils/mockApi';
import { Contact } from '@/app/(control-panel)/apps/contacts/ContactsApi';

/**
 * GET api/mock/contacts/items
 */
export async function GET(req: Request) {
	const url = new URL(req.url);
	const queryParams = Object.fromEntries(url.searchParams.entries());
	const api = mockApi('contacts_items');
	const items = await api.findAll<Contact>(queryParams);

	return new Response(JSON.stringify(items), { status: 200 });
}

/**
 * POST api/mock/contacts/items
 */
export async function POST(req: Request) {
	const api = mockApi('contacts_items');
	const requestData = (await req.json()) as Contact;
	const newItem = await api.create<Contact>(requestData);

	return new Response(JSON.stringify(newItem), { status: 201 });
}

import mockApi from 'src/@mock-utils/mockApi';
import { Country } from '@/app/(control-panel)/apps/contacts/ContactsApi';

/**
 * GET api/mock/countries
 */
export async function GET(req: Request) {
	const url = new URL(req.url);
	const queryParams = Object.fromEntries(url.searchParams.entries());
	const api = mockApi('countries');
	const items = await api.findAll<Country>(queryParams);

	return new Response(JSON.stringify(items), { status: 200 });
}

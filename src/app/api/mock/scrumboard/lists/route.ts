import mockApi from 'src/@mock-utils/mockApi';
import { ScrumboardList } from '@/app/(control-panel)/apps/scrumboard/ScrumboardApi';

/**
 * GET api/mock/scrumboard/lists
 */
export async function GET(req: Request) {
	const url = new URL(req.url);
	const queryParams = Object.fromEntries(url.searchParams.entries());
	const api = mockApi('scrumboard_lists');
	const items = await api.findAll<ScrumboardList>(queryParams);

	return new Response(JSON.stringify(items), { status: 200 });
}

/**
 * POST api/mock/scrumboard/lists
 */
export async function POST(req: Request) {
	const api = mockApi('scrumboard_lists');
	const requestData = (await req.json()) as ScrumboardList;
	const newItem = await api.create<ScrumboardList>(requestData);

	return new Response(JSON.stringify(newItem), { status: 201 });
}

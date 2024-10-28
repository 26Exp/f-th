import mockApi from 'src/@mock-utils/mockApi';
import { ScrumboardBoard } from '@/app/(control-panel)/apps/scrumboard/ScrumboardApi';

/**
 * GET api/mock/scrumboard/boards
 */
export async function GET(req: Request) {
	const url = new URL(req.url);
	const queryParams = Object.fromEntries(url.searchParams.entries());
	const api = mockApi('scrumboard_boards');
	const items = await api.findAll<ScrumboardBoard>(queryParams);

	return new Response(JSON.stringify(items), { status: 200 });
}

/**
 * POST api/mock/scrumboard/boards
 */
export async function POST(req: Request) {
	const api = mockApi('scrumboard_boards');
	const requestData = (await req.json()) as ScrumboardBoard;
	const newItem = await api.create<ScrumboardBoard>(requestData);

	return new Response(JSON.stringify(newItem), { status: 201 });
}

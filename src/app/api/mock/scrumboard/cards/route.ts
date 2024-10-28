import mockApi from 'src/@mock-utils/mockApi';
import { ScrumboardCard } from '@/app/(control-panel)/apps/scrumboard/ScrumboardApi';

/**
 * GET api/mock/scrumboard/cards
 */
export async function GET(req: Request) {
	const url = new URL(req.url);
	const queryParams = Object.fromEntries(url.searchParams.entries());
	const api = mockApi('scrumboard_cards');
	const items = await api.findAll<ScrumboardCard>(queryParams);

	return new Response(JSON.stringify(items), { status: 200 });
}

/**
 * POST api/mock/scrumboard/cards
 */
export async function POST(req: Request) {
	const api = mockApi('scrumboard_cards');
	const requestData = (await req.json()) as ScrumboardCard;
	const newItem = await api.create<ScrumboardCard>(requestData);

	return new Response(JSON.stringify(newItem), { status: 201 });
}

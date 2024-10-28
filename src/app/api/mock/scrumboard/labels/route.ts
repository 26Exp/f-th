import mockApi from 'src/@mock-utils/mockApi';
import { ScrumboardLabel } from '@/app/(control-panel)/apps/scrumboard/ScrumboardApi';

/**
 * GET api/mock/scrumboard/labels
 */
export async function GET(req: Request) {
	const url = new URL(req.url);
	const queryParams = Object.fromEntries(url.searchParams.entries());
	const api = mockApi('scrumboard_labels');
	const items = await api.findAll<ScrumboardLabel>(queryParams);

	return new Response(JSON.stringify(items), { status: 200 });
}

/**
 * POST api/mock/scrumboard/labels
 */
export async function POST(req: Request) {
	const api = mockApi('scrumboard_labels');
	const requestData = (await req.json()) as ScrumboardLabel;
	const newItem = await api.create<ScrumboardLabel>(requestData);

	return new Response(JSON.stringify(newItem), { status: 201 });
}

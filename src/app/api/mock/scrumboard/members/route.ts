import mockApi from 'src/@mock-utils/mockApi';
import { ScrumboardMember } from '@/app/(control-panel)/apps/scrumboard/ScrumboardApi';

/**
 * GET api/mock/scrumboard/members
 */
export async function GET(req: Request) {
	const url = new URL(req.url);
	const queryParams = Object.fromEntries(url.searchParams.entries());
	const api = mockApi('scrumboard_members');
	const items = await api.findAll<ScrumboardMember>(queryParams);

	return new Response(JSON.stringify(items), { status: 200 });
}

/**
 * POST api/mock/scrumboard/members
 */
export async function POST(req: Request) {
	const api = mockApi('scrumboard_members');
	const requestData = (await req.json()) as ScrumboardMember;
	const newItem = await api.create<ScrumboardMember>(requestData);

	return new Response(JSON.stringify(newItem), { status: 201 });
}

import mockApi from 'src/@mock-utils/mockApi';
import { User } from '@auth/user';

/**
 * GET api/mock/users
 */
export async function GET(req: Request) {
	const url = new URL(req.url);
	const queryParams = Object.fromEntries(url.searchParams.entries());
	const api = mockApi('users');
	const items = await api.findAll<User>(queryParams);

	return new Response(JSON.stringify(items), { status: 200 });
}

/**
 * POST api/mock/users
 */
export async function POST(req: Request) {
	const api = mockApi('users');
	const requestData = (await req.json()) as User;
	const newItem = await api.create<User>(requestData);

	return new Response(JSON.stringify(newItem), { status: 201 });
}

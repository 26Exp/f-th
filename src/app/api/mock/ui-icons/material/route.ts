import mockApi from 'src/@mock-utils/mockApi';

/**
 * GET api/mock/ui-icons/material
 */
export async function GET(req: Request) {
	const url = new URL(req.url);
	const queryParams = Object.fromEntries(url.searchParams.entries());
	const api = mockApi('ui_icons_material');
	const items = await api.findAll<string>(queryParams);

	return new Response(JSON.stringify(items), { status: 200 });
}

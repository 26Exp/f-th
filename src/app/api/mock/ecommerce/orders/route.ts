import mockApi from 'src/@mock-utils/mockApi';
import { EcommerceOrder } from '@/app/(control-panel)/apps/e-commerce/ECommerceApi';

/**
 * GET api/mock/ecommerce/orders
 */
export async function GET(req: Request) {
	const url = new URL(req.url);
	const queryParams = Object.fromEntries(url.searchParams.entries());
	const api = mockApi('ecommerce_orders');
	const items = await api.findAll<EcommerceOrder>(queryParams);

	return new Response(JSON.stringify(items), { status: 200 });
}

/**
 * DELETE api/mock/ecommerce/orders
 */
export async function DELETE(req: Request) {
	const api = mockApi('ecommerce_orders');
	const ids = (await req.json()) as string[];
	const result = await api.delete(ids);

	return new Response(JSON.stringify({ success: result.success }), { status: 200 });
}

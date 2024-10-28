import mockApi from 'src/@mock-utils/mockApi';
import { EcommerceProduct } from '@/app/(control-panel)/apps/e-commerce/ECommerceApi';

/**
 * GET api/mock/ecommerce/products
 */
export async function GET(req: Request) {
	const url = new URL(req.url);
	const queryParams = Object.fromEntries(url.searchParams.entries());
	const api = mockApi('ecommerce_products');
	const items = await api.findAll<EcommerceProduct>(queryParams);

	return new Response(JSON.stringify(items), { status: 200 });
}

/**
 * DELETE api/mock/ecommerce/products
 */
export async function DELETE(req: Request) {
	const api = mockApi('ecommerce_products');
	const ids = (await req.json()) as string[];
	const result = await api.delete(ids);

	return new Response(JSON.stringify({ success: result.success }), { status: 200 });
}

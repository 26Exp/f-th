import mockApi from 'src/@mock-utils/mockApi';
import { EcommerceOrder } from '@/app/(control-panel)/apps/e-commerce/ECommerceApi';

/**
 * GET api/mock/ecommerce/orders/{id}
 */
export async function GET(req: Request, { params }: { params: { id: string } }) {
	const { id } = params;
	const api = mockApi('ecommerce_orders');
	const item = await api.find<EcommerceOrder>(id);

	if (!item) {
		return new Response(JSON.stringify({ message: 'Item not found' }), { status: 404 });
	}

	return new Response(JSON.stringify(item), { status: 200 });
}

/**
 * PUT api/mock/ecommerce/orders/{id}
 */
export async function PUT(req: Request, { params }: { params: { id: string } }) {
	const { id } = params;
	const api = mockApi('ecommerce_orders');
	const data = (await req.json()) as EcommerceOrder;
	const updatedItem = await api.update<EcommerceOrder>(id, data);

	if (!updatedItem) {
		return new Response(JSON.stringify({ message: 'Item not found' }), { status: 404 });
	}

	return new Response(JSON.stringify(updatedItem), { status: 200 });
}

/**
 * DELETE api/mock/ecommerce/orders/{id}
 */
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
	const { id } = params;
	const api = mockApi('ecommerce_orders');

	const result = await api.delete([id]);

	if (!result.success) {
		return new Response(JSON.stringify({ message: 'Item not found' }), { status: 404 });
	}

	return new Response(JSON.stringify({ message: 'Deleted successfully' }), { status: 200 });
}

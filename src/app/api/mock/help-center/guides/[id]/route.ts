import mockApi from 'src/@mock-utils/mockApi';
import { Guide } from '@/app/(control-panel)/apps/help-center/HelpCenterApi';

/**
 * GET api/mock/help-center/guides/{id}
 */
export async function GET(req: Request, { params }: { params: { id: string } }) {
	const { id } = params;
	const api = mockApi('help_center_guides');
	const item = await api.find<Guide>(id);

	if (!item) {
		return new Response(JSON.stringify({ message: 'Item not found' }), { status: 404 });
	}

	return new Response(JSON.stringify(item), { status: 200 });
}

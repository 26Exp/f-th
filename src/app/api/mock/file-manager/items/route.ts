import mockApi from 'src/@mock-utils/mockApi';
import { FileManagerItem } from '@/app/(control-panel)/apps/file-manager/FileManagerApi';

/**
 * GET api/mock/file-manager/items
 */
export async function GET(req: Request) {
	const url = new URL(req.url);
	const queryParams = Object.fromEntries(url.searchParams.entries());
	const api = mockApi('file_manager_items');
	const items = await api.findAll<FileManagerItem>(queryParams);

	return new Response(JSON.stringify(items), { status: 200 });
}

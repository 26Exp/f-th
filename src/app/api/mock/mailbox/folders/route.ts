import mockApi from 'src/@mock-utils/mockApi';
import { MailboxFolder } from '@/app/(control-panel)/apps/mailbox/MailboxApi';

/**
 * GET api/mock/mailbox/folders
 */
export async function GET(req: Request) {
	const url = new URL(req.url);
	const queryParams = Object.fromEntries(url.searchParams.entries());
	const api = mockApi('mailbox_folders');
	const items = await api.findAll<MailboxFolder>(queryParams);

	return new Response(JSON.stringify(items), { status: 200 });
}

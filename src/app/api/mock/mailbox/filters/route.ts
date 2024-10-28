import mockApi from 'src/@mock-utils/mockApi';
import { MailboxFilter } from '@/app/(control-panel)/apps/mailbox/MailboxApi';

/**
 * GET api/mock/mailbox/filters
 */
export async function GET(req: Request) {
	const url = new URL(req.url);
	const queryParams = Object.fromEntries(url.searchParams.entries());
	const api = mockApi('mailbox_filters');
	const items = await api.findAll<MailboxFilter>(queryParams);

	return new Response(JSON.stringify(items), { status: 200 });
}

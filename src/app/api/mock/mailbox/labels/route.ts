import mockApi from 'src/@mock-utils/mockApi';
import { MailboxLabel } from '@/app/(control-panel)/apps/mailbox/MailboxApi';

/**
 * GET api/mock/mailbox/labels
 */
export async function GET(req: Request) {
	const url = new URL(req.url);
	const queryParams = Object.fromEntries(url.searchParams.entries());
	const api = mockApi('mailbox_labels');
	const items = await api.findAll<MailboxLabel>(queryParams);

	return new Response(JSON.stringify(items), { status: 200 });
}

/**
 * POST api/mock/mailbox/labels
 */
export async function POST(req: Request) {
	const api = mockApi('mailbox_labels');
	const requestData = (await req.json()) as MailboxLabel;
	const newItem = await api.create<MailboxLabel>(requestData);

	return new Response(JSON.stringify(newItem), { status: 201 });
}

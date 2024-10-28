import mockApi from 'src/@mock-utils/mockApi';
import { MailboxMail } from '@/app/(control-panel)/apps/mailbox/MailboxApi';

/**
 * GET api/mock/mailbox/mails
 */
export async function GET(req: Request) {
	const url = new URL(req.url);
	const queryParams = Object.fromEntries(url.searchParams.entries());
	const api = mockApi('mailbox_mails');
	const items = await api.findAll(queryParams);

	return new Response(JSON.stringify(items), { status: 200 });
}

/**
 * POST api/mock/mailbox/mails
 */
export async function POST(req: Request) {
	const api = mockApi('mailbox_mails');
	const requestData = (await req.json()) as MailboxMail;
	const newItem = await api.create<MailboxMail>(requestData);

	return new Response(JSON.stringify(newItem), { status: 201 });
}

/**
 * PUT api/mock/mailbox/mails
 */
export async function PUT(req: Request) {
	const api = mockApi('mailbox_mails');
	const updatedItems = (await req.json()) as MailboxMail[];

	const result = await Promise.all(updatedItems.map((item: MailboxMail) => api.update<MailboxMail>(item.id, item)));

	return new Response(JSON.stringify(result), { status: 200 });
}

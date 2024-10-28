import mockApi from 'src/@mock-utils/mockApi';
import { MailboxMail } from '@/app/(control-panel)/apps/mailbox/MailboxApi';

/**
 * GET api/mock/mailbox/mails/{id}
 */
export async function GET(req: Request, { params }: { params: { id: string } }) {
	const { id } = params;
	const api = mockApi('mailbox_mails');
	const item = await api.find<MailboxMail>(id);

	if (!item) {
		return new Response(JSON.stringify({ message: 'Item not found' }), { status: 404 });
	}

	return new Response(JSON.stringify(item), { status: 200 });
}

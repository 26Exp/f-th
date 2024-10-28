import mockApi from 'src/@mock-utils/mockApi';
import { MailboxLabel } from '@/app/(control-panel)/apps/mailbox/MailboxApi';

/**
 * PUT api/mock/mailbox/labels/{id}
 */
export async function PUT(req: Request, { params }: { params: { id: string } }) {
	const { id } = params;
	const api = mockApi('mailbox_labels');
	const data = (await req.json()) as MailboxLabel;
	const updatedItem = await api.update<MailboxLabel>(id, data);

	if (!updatedItem) {
		return new Response(JSON.stringify({ message: 'Item not found' }), { status: 404 });
	}

	return new Response(JSON.stringify(updatedItem), { status: 200 });
}

/**
 * DELETE api/mock/mailbox/labels/{id}
 */
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
	const { id } = params;
	const api = mockApi('mailbox_labels');

	const result = await api.delete([id]);

	if (!result.success) {
		return new Response(JSON.stringify({ message: 'Item not found' }), { status: 404 });
	}

	return new Response(JSON.stringify({ message: 'Deleted successfully' }), { status: 200 });
}

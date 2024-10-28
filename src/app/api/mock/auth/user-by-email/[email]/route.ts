import mockApi from 'src/@mock-utils/mockApi';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { email: string } }) {
	const api = mockApi('users');
	const item = await api.find({ email: params.email });

	if (!item) {
		return NextResponse.json({ message: 'User not found' }, { status: 404 });
	}

	return NextResponse.json(item, { status: 200 });
}

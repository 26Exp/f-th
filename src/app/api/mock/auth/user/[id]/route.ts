import mockApi from 'src/@mock-utils/mockApi';
import { NextRequest, NextResponse } from 'next/server';
import { User } from '@auth/user';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
	const api = mockApi('users');
	const item = await api.find(params.id);

	if (!item) {
		return NextResponse.json({ message: 'User not found' }, { status: 404 });
	}

	return NextResponse.json(item, { status: 200 });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
	const api = mockApi('users');
	const data = (await req.json()) as User;

	const updatedUser = await api.update(params.id, data);

	if (!updatedUser) {
		return NextResponse.json({ message: 'User not found' }, { status: 404 });
	}

	return NextResponse.json(updatedUser, { status: 200 });
}

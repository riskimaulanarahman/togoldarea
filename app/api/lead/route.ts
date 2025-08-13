import { NextResponse } from 'next/server';
import { google } from 'googleapis';

type LeadPayload = {
	fullName: string;
	brand: string;
	email: string;
	phone: string;
	model: 'Co-Tenant' | 'Titip Jual' | 'Hybrid';
	notes?: string;
};

function envOrThrow(name: string) {
	const v = process.env[name];
	if (!v) throw new Error(`Missing env: ${name}`);
	return v;
}

async function getSheetsClient() {
	const clientEmail = envOrThrow('GOOGLE_SERVICE_ACCOUNT_EMAIL');
	// On Vercel, PRIVATE KEY must keep \n escaped; replace them at runtime:
	const privateKey = envOrThrow('GOOGLE_PRIVATE_KEY').replace(/\\n/g, '\n');

	const auth = new google.auth.JWT({
		email: clientEmail,
		key: privateKey,
		scopes: ['https://www.googleapis.com/auth/spreadsheets'],
	});

	const sheets = google.sheets({ version: 'v4', auth });
	return sheets;
}

export async function POST(req: Request) {
	try {
		const body = (await req.json()) as LeadPayload;

		// Basic validation (server-side)
		if (!body.fullName || !body.brand || !body.email || !body.phone) {
			return NextResponse.json(
				{ ok: false, error: 'Data tidak lengkap' },
				{ status: 400 },
			);
		}

		const sheets = await getSheetsClient();
		const spreadsheetId = envOrThrow('GOOGLE_SHEETS_ID');

		// Row shape must match your header order in the sheet:
		const values = [
			[
				body.fullName,
				body.brand,
				body.email,
				body.phone,
				body.model || 'Co-Tenant',
				body.notes || '',
				'TOGA Landing',
				new Date().toISOString(),
			],
		];

		await sheets.spreadsheets.values.append({
			spreadsheetId,
			range: 'A:Z', // append to first sheet; adjust if you want a named sheet e.g. 'Leads!A:Z'
			valueInputOption: 'USER_ENTERED',
			requestBody: { values },
		});

		return NextResponse.json({ ok: true });
	} catch (err: any) {
		return NextResponse.json(
			{ ok: false, error: err?.message || 'Unknown error' },
			{ status: 500 },
		);
	}
}

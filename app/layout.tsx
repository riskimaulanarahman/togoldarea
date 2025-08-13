import type { Metadata } from 'next';
import './globals.css';

const siteUrl = 'https://togoldarea.com';

export const metadata: Metadata = {
	title: 'TOGA — Taste Of Gold Area | Co‑Tenant & Titip Jual UMKM',
	description:
		'Ekosistem co‑retail untuk UMKM: co‑tenant, titip jual multi‑lokasi, POS multi‑brand, laporan transparan, dan promosi bersama.',
	metadataBase: new URL(siteUrl),
	openGraph: {
		title: 'TOGA — Taste Of Gold Area',
		description:
			'Scale cepat lewat co‑tenant & titip jual. POS multi‑brand, biaya transparan, multi‑lokasi.',
		url: siteUrl,
		siteName: 'TOGA',
		images: [{ url: '/og-image.png', width: 1200, height: 630 }],
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'TOGA — Taste Of Gold Area',
		description:
			'Jaringan co‑retail untuk UMKM. Hadir di banyak titik tanpa pusing operasional.',
		images: ['/og-image.png'],
	},
	icons: { icon: '/favicon.ico' },
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: 'TOGA — Taste Of Gold Area',
		url: siteUrl,
		logo: '/toga-icon.png',
		sameAs: ['https://wa.me/6282252088585'],
		description:
			'Co‑retail UMKM: co‑tenant, titip jual multi‑lokasi, POS multi‑brand, laporan transparan, promosi bersama.',
		areaServed: 'ID',
		contactPoint: [
			{
				'@type': 'ContactPoint',
				contactType: 'customer support',
				telephone: '+62-822-5208-8585',
			},
		],
	};

	return (
		<html lang="id">
			<head>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
			</head>
			<body>{children}</body>
		</html>
	);
}

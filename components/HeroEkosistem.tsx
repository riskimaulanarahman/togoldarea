// components/HeroEkosistem.tsx
'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const GOLD_TEXT =
	'bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600';
const container = 'mx-auto w-full max-w-7xl px-6';

// helper px(0..440) -> %
const pct = (v: number) => `${(v / 478) * 100}%`;

type Node = {
	id: string;
	x: number; // koordinat kanvas 0..440
	y: number;
	label: string;
	type: 'hub' | 'brand';
	hideOnMobile?: boolean;
};

type Edge = { from: string; to: string; delay?: number };

export default function HeroEkosistem({
	hubLogoSrc = '/toga-icon.png',
}: {
	hubLogoSrc?: string;
}) {
	const nodes: Node[] = [
		{ id: 'toga', x: 305, y: 300, label: 'TOGA', type: 'hub' },

		{ id: 'brandA', x: 85, y: 100, label: 'Brand A', type: 'brand' },
		{ id: 'brandB', x: 405, y: 140, label: 'Brand B', type: 'brand' },
		{ id: 'brandC', x: 395, y: 395, label: 'Brand C', type: 'brand' },
		{ id: 'brandD', x: 120, y: 395, label: 'Brand D', type: 'brand' },

		{ id: 'brandE', x: 185, y: 55, label: 'Brand E', type: 'brand' },
		{
			id: 'brandF',
			x: 320,
			y: 55,
			label: 'Brand F',
			type: 'brand',
			hideOnMobile: true,
		},
		{
			id: 'brandG',
			x: 330,
			y: 185,
			label: 'Brand G',
			type: 'brand',
			hideOnMobile: true,
		},
	];

	const edges: Edge[] = [
		{ from: 'brandA', to: 'toga', delay: 0.0 },

		{ from: 'toga', to: 'brandB', delay: 0.5 },
		{ from: 'toga', to: 'brandC', delay: 0.65 },
		{ from: 'toga', to: 'brandD', delay: 0.8 },

		{ from: 'brandA', to: 'brandE', delay: 1.1 },
		{ from: 'brandA', to: 'brandF', delay: 1.25 },
		{ from: 'brandA', to: 'brandG', delay: 1.4 },
	];

	const coords = Object.fromEntries(nodes.map((n) => [n.id, n])) as Record<
		string,
		Node
	>;

	return (
		<section className="relative overflow-hidden">
			<div className={`${container} grid gap-12 py-16 md:grid-cols-2 md:py-24`}>
				{/* Kiri: narasi */}
				<div className="flex flex-col justify-center">
					<motion.h1
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-4xl font-bold md:text-5xl"
					>
						Satu Sistem, <span className={GOLD_TEXT}>Banyak Brand</span>, Multi
						Lokasi
					</motion.h1>
					<p className="mt-4 text-lg text-gray-600">
						<strong>TOGA – Taste Of Gold Area</strong> adalah ekosistem
						kolaborasi untuk UMKM & brand lokal agar hadir di banyak titik tanpa
						biaya membengkak. Dilengkapi POS multi-brand, laporan real-time, dan
						promosi bersama.
					</p>
					<ul className="mt-6 grid grid-cols-1 gap-2 text-sm text-gray-600 sm:grid-cols-2">
						{[
							'POS Multi-Brand & laporan real-time',
							'Jaringan lokasi yang terus berkembang',
							'Promosi lintas brand yang terukur',
							'Operasional efisien & standar rapi',
						].map((t) => (
							<li key={t} className="flex items-center gap-2">
								<span className="h-2 w-2 rounded-full bg-amber-500" />
								{t}
							</li>
						))}
					</ul>
					<div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center">
						<a
							href="#form"
							className="inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold text-gray-900 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500"
						>
							Gabung Sekarang <ArrowRight className="ml-2 h-4 w-4" />
						</a>
						<span className="text-xs text-gray-500 sm:ml-3">
							Mulai terhubung dengan puluhan brand & lokasi dalam jaringan TOGA.
						</span>
					</div>
				</div>

				{/* Kanan: ilustrasi + caption card (terpisah) */}
				<div className="relative flex flex-col items-center justify-center">
					{/* Ilustrasi aspect-square */}
					<div
						className="relative w-full max-w-[520px] md:max-w-[560px]"
						style={{ aspectRatio: '1 / 1' }}
					>
						{/* soft glow bg */}
						<div className="pointer-events-none absolute inset-0 rounded-[32px] opacity-30 blur-2xl bg-gradient-to-br from-yellow-300 to-amber-500" />

						{/* SVG lines (animasi aktif) */}
						<svg
							viewBox="0 0 440 440"
							className="absolute inset-0 h-full w-full"
						>
							<defs>
								<linearGradient id="goldLine" x1="0" x2="1" y1="0" y2="1">
									<stop offset="0%" stopColor="#F5D061" />
									<stop offset="100%" stopColor="#E2B647" />
								</linearGradient>
								<filter
									id="softGlow"
									x="-50%"
									y="-50%"
									width="200%"
									height="200%"
								>
									<feGaussianBlur stdDeviation="3" result="blur" />
									<feMerge>
										<feMergeNode in="blur" />
										<feMergeNode in="SourceGraphic" />
									</feMerge>
								</filter>
							</defs>

							{edges.map((e, i) => {
								const a = coords[e.from];
								const b = coords[e.to];
								const hiddenMobile = a.hideOnMobile || b.hideOnMobile;

								// path lengkung halus
								const mx = (a.x + b.x) / 2;
								const my = (a.y + b.y) / 2;
								const d = `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`;
								const length = Math.hypot(b.x - a.x, b.y - a.y) * 1.1 + 40;

								return (
									<motion.path
										key={`${e.from}-${e.to}`}
										d={d}
										stroke="url(#goldLine)"
										strokeWidth="3.5"
										strokeLinecap="round"
										fill="none"
										filter="url(#softGlow)"
										strokeDasharray={length}
										strokeDashoffset={length}
										initial={{
											strokeDashoffset: length,
											opacity: hiddenMobile ? 0.5 : 0.7,
										}}
										animate={{ strokeDashoffset: 0, opacity: 1 }}
										transition={{
											duration: 3.1,
											delay: e.delay ?? i * 0.15,
											ease: 'linear',
											repeat: Infinity, // ⬅ loop terus
											// repeatType: 'reverse',
										}}
										className={hiddenMobile ? 'hidden sm:block' : ''}
									/>
								);
							})}
						</svg>

						{/* Nodes (centered) */}
						{nodes.map((n, i) => (
							<motion.div
								key={n.id}
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ delay: 0.2 + i * 0.08 }}
								className={`absolute -translate-x-1/2 -translate-y-1/2 ${
									n.hideOnMobile ? 'hidden sm:block' : ''
								}`}
								style={{ left: pct(n.x), top: pct(n.y) }}
							>
								{n.type === 'hub' ? (
									<div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-yellow-300 to-amber-500 shadow-lg">
										<motion.div
											className="absolute inset-0 -z-10 rounded-full bg-yellow-300/50 blur-xl"
											animate={{
												opacity: [0.25, 0.6, 0.25],
												scale: [1, 1.08, 1],
											}}
											transition={{ duration: 2.2, repeat: Infinity }}
										/>
										<img
											src={hubLogoSrc}
											alt="TOGA"
											className="h-12 w-12 object-contain"
										/>
									</div>
								) : (
									<div className="flex h-12 w-12 items-center justify-center rounded-full border bg-white text-[10px] font-semibold shadow">
										{n.label}
									</div>
								)}
							</motion.div>
						))}
					</div>

					{/* Caption card (terpisah) */}
					<div className="mt-4 w-full max-w-[520px] rounded-lg border border-amber-200 bg-white p-4 shadow-sm">
						<p className="text-center text-sm text-gray-700">
							Brand A bergabung dengan <span className={GOLD_TEXT}>TOGA</span>,
							lalu terhubung ke Brand B/C/D dan berkolaborasi dengan Brand E/F/G
							dalam jaringan promosi & lokasi bersama.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}

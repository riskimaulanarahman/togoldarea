// TOGA Landing Component (TSX)
'use client';
import React from 'react';
import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	CheckCircle2,
	ArrowRight,
	Store,
	Users,
	BarChart3,
	Handshake,
	Truck,
	ReceiptText,
	ClipboardCheck,
	Globe,
	Sparkles,
	ShieldCheck,
	PhoneCall,
} from 'lucide-react';
import Swal from 'sweetalert2';
import Navbar from '@/components/Navbar';
import TogaNetwork from '@/components/HeroEkosistem';
import BrandsSection from '@/components/BrandsSection';
import Image from 'next/image';

const GOLD_GRAD =
	'bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500';
const GOLD_TEXT =
	'bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600';
const container = 'mx-auto w-full max-w-7xl px-6';

type Props = { logoSrc?: string };

const faqs = [
	{
		q: 'Apa itu TOGA – Taste Of Gold Area?',
		a: 'TOGA adalah ekosistem co-tenant & titip-jual untuk UMKM/brand kuliner dan retail. Kamu bisa berbagi lapak, biaya operasional, dan memanfaatkan jaringan titik TOGA untuk mempercepat ekspansi.',
	},
	{
		q: 'Bagaimana sistem bagi biaya operasional?',
		a: 'Untuk model co-tenant, biaya (sewa, listrik, gaji) dibagi rata per brand/lapak. Untuk titip-jual (consignment), ada persentase bagi hasil yang disepakati sejak awal.',
	},
	{
		q: 'Apakah TOGA menyediakan sistem POS?',
		a: 'Kami integrasi dengan POS multi-brand. Owner mendapat laporan omset per brand & per lokasi, termasuk biaya operasional dan settlement bulanan.',
	},
	{
		q: 'Bisakah titip jual di lapak owner lain?',
		a: 'Bisa. Melalui jaringan TOGA, kamu dapat menitipkan produk di lapak partner dengan SOP yang seragam dan monitoring stok real-time.',
	},
	{
		q: 'Bagaimana proses onboarding?',
		a: 'Isi formulir minat, konsultasi kebutuhan, review produk & kesiapan, tandatangan MoU, training SOP, lalu langsung bisa berjualan di titik pilihan.',
	},
	{
		q: 'Apakah TOGA membantu promosi?',
		a: 'Ya. Ada paket promosi bersama: konten sosial media, in-store promo, event kolaborasi, hingga campaign launching di titik baru.',
	},
	{
		q: 'Kapan settlement penjualan?',
		a: 'Laporan harian tersedia di dashboard. Settlement bersifat bulanan (atau mingguan sesuai paket) dan ditransfer ke rekening owner.',
	},
];

const packages = [
	{
		name: 'Starter',
		price: 'Gratis setup',
		perks: [
			'Akses 1 lokasi co-tenant',
			'Integrasi POS multi-brand',
			'Laporan omset per brand',
			'Template SOP & display',
		],
		cta: 'Daftar Minat',
	},
	{
		name: 'Growth',
		price: 'Rp499rb/bln',
		highlight: true,
		perks: [
			'Hingga 3 lokasi aktif',
			'Promosi bersama bulanan',
			'Monitoring stok & retur',
			'Settlement mingguan',
			'Support WhatsApp prioritas',
		],
		cta: 'Konsultasi Growth',
	},
	{
		name: 'Scale',
		price: 'Custom',
		perks: [
			'Ekspansi >5 lokasi',
			'Manajemen karyawan lokasi',
			'Sourcing & scouting titik',
			'Campaign 360 (offline+online)',
			'Tim onboarding khusus',
		],
		cta: 'Booking Demo',
	},
];

const services = [
	{
		icon: Store,
		title: 'Co‑Tenant Management',
		desc: 'Berbagi lapak & biaya operasional dengan sistem yang transparan.',
	},
	{
		icon: Handshake,
		title: 'Titip Jual (Consignment)',
		desc: 'Perluas jangkauan dengan menitipkan produk ke lapak partner TOGA.',
	},
	{
		icon: BarChart3,
		title: 'Laporan POS Multi‑Brand',
		desc: 'Omset per brand & lokasi, biaya, dan settlement terpusat.',
	},
	{
		icon: Users,
		title: 'SOP & Training',
		desc: 'Standar pelayanan, display, dan operasional yang seragam.',
	},
	{
		icon: Truck,
		title: 'Distribusi & Inventory',
		desc: 'Pengiriman, stock count, dan retur barang slow‑moving.',
	},
	{
		icon: ReceiptText,
		title: 'Keuangan & Settlement',
		desc: 'Rekonsiliasi, biaya bersama, dan payout tepat waktu.',
	},
	{
		icon: Globe,
		title: 'Marketing Bersama',
		desc: 'Konten, promo in‑store, kolab event, dan launching titik baru.',
	},
	{
		icon: ShieldCheck,
		title: 'Brand Standard',
		desc: 'Kontrol kualitas produk, harga seragam, dan audit berkala.',
	},
];

const posFeatures = [
	{
		title: 'Dashboard Omset',
		desc: 'Lihat performa harian/berkala per brand & lokasi.',
	},
	{
		title: 'Multi‑Lokasi',
		desc: 'Tambah titik TOGA baru, semuanya terpantau di satu layar.',
	},
	{
		title: 'Biaya Operasional',
		desc: 'Bagi rata otomatis dan transparan untuk semua brand.',
	},
	{
		title: 'Stok & Retur',
		desc: 'Pantau stok, expiry, dan proses retur dalam beberapa klik.',
	},
];

export default function TogaLanding({ logoSrc = '/toga-icon.png' }: Props) {
	const [submitting, setSubmitting] = useState(false);
	const redirectedRef = useRef(false);
	function openWAOnce(url: string) {
		if (redirectedRef.current) return; // guard agar tidak dobel
		redirectedRef.current = true;
		window.open(url, '_blank', 'noopener,noreferrer');
	}

	function FAQAccordion({ faqs }: { faqs: { q: string; a: string }[] }) {
		const [openIdx, setOpenIdx] = useState<number | null>(null);

		return (
			<div className="mx-auto mt-10 max-w-3xl space-y-3">
				{faqs.map((f, i) => {
					const isOpen = openIdx === i;
					return (
						<div key={i} className="rounded-2xl border p-5 transition-shadow">
							<button
								type="button"
								aria-expanded={isOpen}
								aria-controls={`faq-panel-${i}`}
								onClick={() => setOpenIdx(isOpen ? null : i)}
								className="flex w-full items-center justify-between text-left text-sm font-semibold"
							>
								<span className="pr-6">{f.q}</span>
								<span
									className={`ml-4 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-transform
                  ${isOpen ? 'rotate-45' : ''}`}
									aria-hidden
								>
									+
								</span>
							</button>

							<AnimatePresence initial={false}>
								{isOpen && (
									<motion.div
										id={`faq-panel-${i}`}
										key="content"
										initial={{ height: 0, opacity: 0 }}
										animate={{ height: 'auto', opacity: 1 }}
										exit={{ height: 0, opacity: 0 }}
										transition={{ duration: 0.28, ease: [0.22, 0.61, 0.36, 1] }} // easeOutCubic
										className="overflow-hidden will-change-[height,opacity]"
									>
										<motion.p
											initial={{ y: -4, opacity: 0 }}
											animate={{ y: 0, opacity: 1 }}
											exit={{ y: -4, opacity: 0 }}
											transition={{ duration: 0.24 }}
											className="mt-3 text-sm text-gray-600"
										>
											{f.a}
										</motion.p>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					);
				})}
			</div>
		);
	}

	return (
		<div className="min-h-screen scroll-smooth bg-white text-gray-900">
			<header className="sticky top-0 z-50 border-b bg-white/70 backdrop-blur">
				<div className={`${container} flex h-16 items-center justify-between`}>
					<Navbar logoSrc="/toga-icon.png" />
				</div>
			</header>

			{/* <section className="relative overflow-hidden">
				<div
					className={`${container} grid gap-10 py-16 md:grid-cols-2 md:py-24`}
				>
					<div className="flex flex-col justify-center">
						<motion.h1
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							className="text-4xl font-bold md:text-5xl"
						>
							Ekspansi cepat lewat{' '}
							<span className={GOLD_TEXT}>co‑tenant & titip jual</span> bersama
							TOGA
						</motion.h1>
						<p className="mt-4 text-lg text-gray-600">
							Masuk ke jaringan <strong>TOGA – Taste Of Gold Area</strong> dan
							hadir di banyak titik tanpa pusing operasional. POS multi‑brand,
							SOP rapi, biaya transparan, dan promosi bersama—semua dalam satu
							sistem.
						</p>
						<div className="mt-6 flex flex-col gap-3 sm:flex-row">
							<a
								href="#form"
								className={`inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold text-gray-900 ${GOLD_GRAD}`}
							>
								Dapatkan Simulasi Biaya <ArrowRight className="ml-2 h-4 w-4" />
							</a>
							<a
								href="#form"
								// target="_blank"
								rel="noreferrer"
								className="inline-flex items-center justify-center rounded-full border border-amber-400 px-6 py-3 font-semibold"
							>
								<PhoneCall className="mr-2 h-4 w-4" /> Chat Konsultasi
							</a>
						</div>
						<ul className="mt-6 grid max-w-xl grid-cols-1 gap-2 text-sm text-gray-600 sm:grid-cols-2">
							{[
								'Biaya bareng, hasil jelas',
								'Laporan POS real‑time',
								'Standar servis seragam',
								'Siap scale multi‑lokasi',
							].map((t) => (
								<li key={t} className="flex items-center gap-2">
									<CheckCircle2 className="h-4 w-4 text-amber-500" /> {t}
								</li>
							))}
						</ul>
					</div>
					<div className="relative">
						<div className="absolute -inset-6 rounded-3xl opacity-20 blur-2xl bg-gradient-to-br from-yellow-300 to-amber-500" />
						<div className="relative rounded-3xl border bg-white p-4 shadow-lg">
							<div className="rounded-2xl border bg-gray-50 p-4">
								<div className="mb-3 flex items-center justify-between">
									<div className="font-semibold">Dashboard POS TOGA</div>
									<span
										className={`rounded-full px-3 py-1 text-xs font-semibold text-gray-900 ${GOLD_GRAD}`}
									>
										Real‑time
									</span>
								</div>
								<div className="grid grid-cols-2 gap-3 md:grid-cols-3">
									{[
										{ k: 'Omset Hari Ini', v: 'Rp 8,4 jt' },
										{ k: 'Transaksi', v: '312' },
										{ k: 'Brand Aktif', v: '4' },
										{ k: 'Lokasi Aktif', v: '3' },
										{ k: 'Biaya Bersama', v: 'Rp 2,1 jt' },
										{ k: 'Payout Bulan Ini', v: 'Rp 63 jt' },
									].map((c) => (
										<div key={c.k} className="rounded-xl border bg-white p-3">
											<div className="text-xs text-gray-500">{c.k}</div>
											<div className="text-lg font-semibold">{c.v}</div>
										</div>
									))}
								</div>
							</div>
							<p className="mt-3 text-center text-xs text-gray-500">
								*Contoh tampilan ilustratif
							</p>
						</div>
					</div>
				</div>
			</section> */}
			<div className="relative">
				<TogaNetwork />
			</div>

			<BrandsSection />

			<section id="services" className="py-16 md:py-24">
				<div className={`${container}`}>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="text-3xl font-bold md:text-4xl">
							Apa yang kamu dapat di <span className={GOLD_TEXT}>TOGA</span>?
						</h2>
						<p className="mt-3 text-gray-600">
							Paket komplit untuk masuk ke banyak titik—operasional rapi, biaya
							efisien, dan laporan transparan.
						</p>
					</div>
					<div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
						{services.map(({ icon: Icon, title, desc }) => (
							<div
								key={title}
								className="rounded-2xl border p-6 transition hover:shadow-sm"
							>
								<div
									className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full ${GOLD_GRAD}`}
								>
									<Icon className="h-5 w-5 text-gray-900" />
								</div>
								<h3 className="font-semibold">{title}</h3>
								<p className="mt-1 text-sm text-gray-600">{desc}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section id="pos" className="py-16 md:py-24 bg-gray-50/50 border-y">
				<div className={`${container} grid gap-10 md:grid-cols-2 items-center`}>
					{/* Foto orang dengan HP */}
					<div className="relative flex justify-center">
						<Image
							src="/foto-orang-pegang-hp.png"
							alt="Orang memegang HP dengan aplikasi POS"
							width={400}
							height={600}
							className="rounded-3xl shadow-lg"
						/>
						{/* Efek glow */}
						<div className="absolute -z-10 inset-0 bg-gradient-to-br from-yellow-300/30 to-amber-400/20 blur-3xl"></div>
					</div>

					{/* Teks & statistik */}
					<div>
						<h2 className="text-3xl font-bold md:text-4xl">
							Kelola Banyak Brand{' '}
							<span className={GOLD_TEXT}>Dalam Satu POS</span>
						</h2>
						<p className="mt-3 text-gray-600">
							Aplikasi POS yang memudahkan pengelolaan transaksi, stok, dan
							laporan untuk banyak brand sekaligus. Cocok untuk bisnis
							multi-outlet yang ingin tumbuh lebih cepat.
						</p>
						{/* Tombol */}
						<div className="mt-6">
							<a
								href="#form"
								className={`rounded-full px-5 py-2.5 ${GOLD_GRAD} font-semibold`}
							>
								Hubungi Kami untuk Mulai
							</a>
						</div>
					</div>
				</div>
			</section>

			<section className="py-16 md:py-24">
				<div className={`${container}`}>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="text-3xl font-bold md:text-4xl">Cara Bergabung</h2>
						<p className="mt-3 text-gray-600">
							Proses cepat, transparan, dan dibantu tim TOGA sampai siap jualan.
						</p>
					</div>
					<ol className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-4">
						{[
							'Isi Form & Konsultasi',
							'Review Produk & MoU',
							'Setup POS & Training',
							'Go‑Live di Titik TOGA',
						].map((step, i) => (
							<li key={step} className="relative rounded-2xl border p-6">
								<div
									className={`absolute -top-3 left-6 rounded-full px-3 py-1 text-xs font-semibold text-gray-900 ${GOLD_GRAD}`}
								>
									Step {i + 1}
								</div>
								<div className="mt-3 font-semibold">{step}</div>
								<p className="mt-1 text-sm text-gray-600">
									{i === 0 &&
										'Kita hitung simulasi biaya & potensi penjualan per lokasi.'}
									{i === 1 &&
										'Sepakati model co‑tenant atau titip‑jual serta bagi hasilnya.'}
									{i === 2 &&
										'Tim kami setup SKU, harga seragam, dan SOP operasional.'}
									{i === 3 &&
										'Mulai jualan, akses dashboard, dan dukungan promosi.'}
								</p>
							</li>
						))}
					</ol>
				</div>
			</section>

			<section id="pricing" className="border-y bg-white py-16 md:py-24">
				<div className={`${container}`}>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="text-3xl font-bold md:text-4xl">
							Paket yang Fleksibel
						</h2>
						<p className="mt-3 text-gray-600">
							Mulai dari coba 1 lokasi sampai scale ke banyak titik—kustom
							sesuai kebutuhanmu.
						</p>
					</div>
					<div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
						{packages.map((p) => (
							<div
								key={p.name}
								className={`relative rounded-2xl border p-6 ${
									p.highlight ? 'ring-2 ring-amber-400' : ''
								}`}
							>
								{p.highlight && (
									<span
										className={`absolute -top-3 left-6 rounded-full px-3 py-1 text-xs font-semibold text-gray-900 ${GOLD_GRAD}`}
									>
										Rekomendasi
									</span>
								)}
								<h3 className="text-lg font-semibold">{p.name}</h3>
								<div className="mt-2 text-2xl font-bold">{p.price}</div>
								<ul className="mt-4 space-y-2 text-sm">
									{p.perks.map((k) => (
										<li key={k} className="flex items-start gap-2">
											<CheckCircle2 className="mt-0.5 h-4 w-4 text-amber-500" />{' '}
											{k}
										</li>
									))}
								</ul>
								<a
									href="#form"
									className={`mt-6 inline-flex w-full items-center justify-center rounded-full px-5 py-2.5 font-semibold text-gray-900 ${GOLD_GRAD}`}
								>
									{p.cta}
								</a>
							</div>
						))}
					</div>
				</div>
			</section>

			<section id="faq" className="py-16 md:py-24">
				<div className={`${container}`}>
					<div className="mx-auto max-w-3xl text-center">
						<h2 className="text-3xl font-bold md:text-4xl">
							Pertanyaan yang Sering Diajukan
						</h2>
						<p className="mt-3 text-gray-600">
							Kalau belum terjawab, hubungi kami—kami siap bantu siapkan
							simulasi terbaik.
						</p>
					</div>

					{/* Accordion (Framer Motion) */}
					<FAQAccordion faqs={faqs} />

					{/* small CTA box */}
					<div className="mx-auto mt-6 max-w-3xl rounded-2xl border bg-yellow-50/60 p-5 text-sm text-yellow-900">
						<p className="font-semibold">Masih ada yang ingin ditanyakan?</p>
						<p className="mt-1">
							Chat kami di WhatsApp atau isi formulir minat untuk konsultasi
							gratis.
						</p>
						<div className="mt-3 flex flex-col gap-3 sm:flex-row">
							<a
								href="#form"
								className="inline-flex items-center justify-center rounded-full border border-yellow-400 px-5 py-2"
							>
								Isi Form
							</a>
							<a
								href="#form"
								rel="noreferrer"
								className={`inline-flex items-center justify-center rounded-full px-5 py-2 text-gray-900 ${GOLD_GRAD}`}
							>
								Chat WhatsApp
							</a>
						</div>
					</div>
				</div>
			</section>

			<section id="form" className="bg-gray-50/60 py-16 md:py-24">
				<div className={`${container} grid gap-10 md:grid-cols-2`}>
					<div>
						<h2 className="text-3xl font-bold md:text-4xl">
							Siap Gabung ke Jaringan <span className={GOLD_TEXT}>TOGA</span>?
						</h2>
						<p className="mt-3 text-gray-600">
							Isi formulir minat. Tim kami akan menghubungi untuk menjadwalkan
							konsultasi dan menghitung simulasi biaya terbaik.
						</p>
						<ul className="mt-6 space-y-2 text-sm text-gray-600">
							<li className="flex items-center gap-2">
								<Sparkles className="h-4 w-4 text-amber-500" /> Bonus template
								SOP & kalkulator biaya
							</li>
							<li className="flex items-center gap-2">
								<Sparkles className="h-4 w-4 text-amber-500" /> Prioritas slot
								titik baru
							</li>
						</ul>
					</div>
					<form
						onSubmit={async (e) => {
							e.preventDefault();
							if (submitting) return;

							const formEl = e.currentTarget as HTMLFormElement;
							const fd = new FormData(formEl);

							// Kumpulkan payload
							const payload = {
								fullName: String(fd.get('fullName') || '').trim(),
								brand: String(fd.get('brand') || '').trim(),
								email: String(fd.get('email') || '').trim(),
								phone: String(fd.get('phone') || '').trim(),
								model: String(fd.get('model') || 'Co-Tenant') as
									| 'Co-Tenant'
									| 'Titip Jual'
									| 'Hybrid',
								notes: String(fd.get('notes') || '').trim(),
							};

							const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
							if (!emailRegex.test(payload.email)) {
								await Swal.fire({
									icon: 'warning',
									title: 'Email tidak valid',
									text: 'Gunakan format email yang benar, contoh: nama@email.com',
									confirmButtonColor: '#f59e0b',
								});
								return;
							}

							if (!/^[0-9]+$/.test(payload.phone)) {
								await Swal.fire({
									icon: 'warning',
									title: 'Nomor WhatsApp tidak valid',
									text: 'Hanya boleh angka, tanpa spasi atau simbol.',
									confirmButtonColor: '#f59e0b',
								});
								return;
							}

							// Validasi sederhana
							if (
								!payload.fullName ||
								!payload.brand ||
								!payload.email ||
								!payload.phone
							) {
								await Swal.fire({
									icon: 'warning',
									title: 'Lengkapi data dulu, ya',
									text: 'Nama, Brand, Email, dan WhatsApp wajib diisi.',
									confirmButtonColor: '#f59e0b',
								});
								return;
							}

							setSubmitting(true);
							redirectedRef.current = false; // reset guard tiap submit

							try {
								// 1) Kirim ke backend → Google Sheets
								const res = await fetch('/api/lead', {
									method: 'POST',
									headers: { 'Content-Type': 'application/json' },
									body: JSON.stringify(payload),
								});

								if (!res.ok) {
									const { error } = await res
										.json()
										.catch(() => ({ error: 'Gagal kirim data' }));
									throw new Error(error || 'Gagal kirim data');
								}

								// 2) Siapkan pesan untuk WhatsApp admin
								const adminNumber = '6282252088585'; // dari 081234567891
								const msg = [
									'Halo Kak, Saya Siap Gabung ke Jaringan TOGA:',
									`• Nama: ${payload.fullName}`,
									`• Brand: ${payload.brand}`,
									`• Email: ${payload.email}`,
									`• WhatsApp: ${payload.phone}`,
									`• Model: ${payload.model}`,
									payload.notes ? `• Catatan: ${payload.notes}` : null,
									'—',
									'Sumber: togoldarea.com',
								]
									.filter(Boolean)
									.join('\n');

								const waUrl = `https://wa.me/${adminNumber}?text=${encodeURIComponent(
									msg,
								)}`;

								// 3) Alert sukses + buka WA
								let timer: NodeJS.Timeout;
								await Swal.fire({
									icon: 'success',
									title: 'Terima kasih! 🎉',
									html: `
    Data sudah kami terima.<br/>
    WhatsApp akan terbuka otomatis dalam <b>10</b> detik<br/>
    atau klik tombol di bawah ini.
  `,
									confirmButtonColor: '#f59e0b',
									confirmButtonText: 'Lanjut ke WhatsApp',
									timer: 10000,
									timerProgressBar: true,
									didOpen: () => {
										const b = Swal.getHtmlContainer()?.querySelector('b');
										let sec = 10;
										timer = setInterval(() => {
											sec--;
											if (b) b.textContent = String(sec);
										}, 1000);
									},
									willClose: () => {
										clearInterval(timer);
									},
								}).then((result) => {
									// klik tombol atau timer habis → redirect
									if (
										result.isConfirmed ||
										result.dismiss === Swal.DismissReason.timer
									) {
										openWAOnce(waUrl);
									}
								});

								// reset form
								formEl.reset();
							} catch (err: any) {
								await Swal.fire({
									icon: 'error',
									title: 'Ups, gagal terkirim',
									text: err?.message || 'Coba lagi sebentar ya.',
									confirmButtonColor: '#ef4444',
								});
							} finally {
								setSubmitting(false);
							}
						}}
						className="rounded-2xl border bg-white p-6 shadow-sm"
					>
						<div className="grid grid-cols-1 gap-4">
							<input
								name="fullName"
								className="rounded-xl border px-4 py-3"
								placeholder="Nama Lengkap"
								required
							/>
							<input
								name="brand"
								className="rounded-xl border px-4 py-3"
								placeholder="Nama Brand"
								required
							/>
							<input
								name="email"
								type="email"
								pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
								className="rounded-xl border px-4 py-3"
								placeholder="Email (contoh: nama@email.com)"
								required
							/>
							<input
								name="phone"
								pattern="^[0-9]+$"
								title="Hanya boleh angka"
								className="rounded-xl border px-4 py-3"
								placeholder="No. WhatsApp (contoh: 08123456789)"
								required
							/>
							<select
								name="model"
								className="rounded-xl border px-4 py-3"
								defaultValue="Co-Tenant"
							>
								<option>Co-Tenant</option>
								<option>Titip Jual</option>
								<option>Hybrid</option>
							</select>
							<textarea
								name="notes"
								className="min-h-[120px] rounded-xl border px-4 py-3"
								placeholder="Ceritakan rencana & kebutuhan Anda, contoh: ingin memperluas distribusi produk kopi botolan ke pusat perbelanjaan, target pasar pekerja kantoran, butuh support promosi dan event launching"
							/>
						</div>

						<button
							type="submit"
							disabled={submitting}
							className={`mt-5 w-full rounded-full px-6 py-3 font-semibold text-gray-900 ${
								submitting ? 'cursor-not-allowed opacity-70' : ''
							} bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500`}
						>
							{submitting ? 'Mengirim...' : 'Kirim & Jadwalkan Konsultasi'}
						</button>

						{submitting && (
							<p className="mt-2 text-center text-xs text-gray-500">
								Mohon tunggu, sedang memproses...
							</p>
						)}
						<p className="mt-3 text-center text-xs text-gray-500">
							*Form ini akan mengarahkan ke WhatsApp setelah sukses.
						</p>
					</form>
				</div>
			</section>

			<section className="py-16 md:py-24">
				<div className={`${container} text-center`}>
					<h2 className="text-3xl font-bold md:text-4xl">
						Yuk bawa brand‑mu ke lebih banyak titik bersama{' '}
						<span className={GOLD_TEXT}>TOGA</span>
					</h2>
					<p className="mx-auto mt-3 max-w-2xl text-gray-600">
						Mulai dari satu lokasi, berkembang ke banyak. Operasional rapi,
						laporan jelas, promosi bareng.
					</p>
					<div className="mt-6 flex justify-center gap-3">
						<a
							href="#form"
							className={`rounded-full px-6 py-3 font-semibold text-gray-900 ${GOLD_GRAD}`}
						>
							Coba Sekarang
						</a>
						<a
							href="#form"
							// target="_blank"
							rel="noreferrer"
							className="rounded-full border border-amber-400 px-6 py-3 font-semibold"
						>
							Diskusi via WhatsApp
						</a>
					</div>
				</div>
			</section>

			<footer className="border-t bg-white">
				<div
					className={`${container} flex flex-col items-center justify-between gap-4 py-8 md:flex-row`}
				>
					<div className="flex items-center gap-3">
						<img
							src={logoSrc}
							alt="TOGA Logo"
							className="h-7 w-7 object-contain"
						/>
						<span className="text-sm text-gray-600">
							© {new Date().getFullYear()} TOGA – Taste Of Gold Area
						</span>
					</div>
					<div className="text-sm text-gray-500">
						Co‑Tenant • Titip Jual • POS Multi‑Brand • Multi‑Lokasi
					</div>
				</div>
			</footer>
		</div>
	);
}

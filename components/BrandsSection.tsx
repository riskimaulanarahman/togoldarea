'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

type Brand = {
	name: string;
	logo: string; // path di /public
	url?: string;
};

const brands: Brand[] = [
	{ name: 'Brand A', logo: '/brands/brand-a.png', url: '#' },
	{ name: 'Brand B', logo: '/brands/brand-b.png', url: '#' },
	{ name: 'Brand C', logo: '/brands/brand-c.png', url: '#' },
	{ name: 'Brand D', logo: '/brands/brand-d.png', url: '#' },
	{ name: 'Brand E', logo: '/brands/brand-e.png', url: '#' },
	{ name: 'Brand F', logo: '/brands/brand-f.png', url: '#' },
];

const container = 'mx-auto w-full max-w-7xl px-6';

export default function BrandsSection() {
	return (
		<section id="brands" className="relative border-t bg-white">
			<div className={`${container} py-14 md:py-20`}>
				{/* Header */}
				<div className="mx-auto max-w-3xl text-center">
					<h2 className="text-2xl font-bold md:text-3xl">
						Brand yang Telah Bergabung dengan{' '}
						<span className="bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
							TOGA
						</span>
					</h2>
					<p className="mt-3 text-gray-600">
						Jaringan co-retail lintas kategori yang berkembang pesat.
					</p>
				</div>

				{/* MARQUEE semua layar */}
				<div className="mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
					<div className="flex gap-8 animate-marquee">
						{[...brands, ...brands].map((b, i) => (
							<div
								key={b.name + i}
								className="flex h-20 w-36 items-center justify-center opacity-80"
							>
								<Image
									src={b.logo}
									alt={`Logo ${b.name}`}
									width={80}
									height={80}
									className="object-contain grayscale transition hover:grayscale-0"
								/>
							</div>
						))}
					</div>
				</div>

				{/* CTA */}
				<div className="mt-8 flex flex-col items-center gap-2 sm:flex-row sm:justify-center">
					<a
						href="#form"
						className="inline-flex items-center justify-center rounded-full border border-amber-400 px-6 py-3 text-sm font-semibold"
					>
						Jadikan Brand Saya Mitra TOGA{' '}
						<ArrowRight className="ml-2 h-4 w-4" />
					</a>
				</div>
			</div>
		</section>
	);
}

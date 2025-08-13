'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ logoSrc }: { logoSrc: string }) {
	const [isOpen, setIsOpen] = useState(false);
	const GOLD_GRAD =
		'bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500';
	const GOLD_TEXT =
		'bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600';
	const container = 'mx-auto w-full max-w-7xl px-6';

	const closeMenu = () => setTimeout(() => setIsOpen(false), 1800);

	return (
		<nav className="fixed top-0 left-0 w-full bg-white shadow z-50 gap-7 md:flex">
			<div className={`${container} flex h-16 items-center justify-between`}>
				<a href="#" className="flex items-center gap-3">
					<img
						src={logoSrc}
						alt="TOGA Logo"
						className="h-9 w-9 object-contain"
					/>
					<div className="text-xl font-bold tracking-tight">
						<span className={GOLD_TEXT}>TOGA</span>{' '}
						<span className="text-gray-700">— Taste Of Gold Area</span>
					</div>
				</a>
				<div className="md:hidden">
					<button onClick={() => setIsOpen(!isOpen)} className="p-2">
						<svg
							className="h-6 w-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							{isOpen ? (
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M6 18L18 6M6 6l12 12"
								/>
							) : (
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h16M4 18h16"
								/>
							)}
						</svg>
					</button>
				</div>
				<div className="hidden md:flex gap-7">
					<a href="#services" className="hover:text-gray-700">
						Services
					</a>
					<a href="#pos" className="hover:text-gray-700">
						POS System
					</a>
					<a href="#pricing" className="hover:text-gray-700">
						Pricing
					</a>
					<a href="#faq" className="hover:text-gray-700">
						FAQ
					</a>
				</div>
				<a
					href="#form"
					className={`hidden rounded-full px-4 py-2 text-sm font-semibold text-gray-900 md:inline-block ${GOLD_GRAD}`}
				>
					Gabung Sekarang
				</a>
			</div>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						key="mobile-menu" // beri key agar exit animation konsisten
						id="mobile-menu"
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.25, ease: 'easeInOut' }}
						className="md:hidden bg-white shadow overflow-hidden absolute left-0 right-0 top-16 z-40"
						onClick={(e) => e.stopPropagation()} // klik di dalam menu tidak bubble ke parent
					>
						<a
							href="#services"
							onClick={(e) => {
								e.stopPropagation();
								closeMenu();
							}}
							className="block px-4 py-2 border-b"
						>
							Services
						</a>
						<a
							href="#pos"
							onClick={(e) => {
								e.stopPropagation();
								closeMenu();
							}}
							className="block px-4 py-2 border-b"
						>
							POS System
						</a>
						<a
							href="#pricing"
							onClick={(e) => {
								e.stopPropagation();
								closeMenu();
							}}
							className="block px-4 py-2 border-b"
						>
							Pricing
						</a>
						<a
							href="#faq"
							onClick={(e) => {
								e.stopPropagation();
								closeMenu();
							}}
							className="block px-4 py-2 border-b"
						>
							FAQ
						</a>
						<a
							href="#form"
							onClick={(e) => {
								e.stopPropagation();
								closeMenu();
							}}
							className={`mx-4 my-3 block rounded-full px-4 py-2 text-center text-sm font-semibold text-gray-900 ${GOLD_GRAD}`}
						>
							Gabung Sekarang
						</a>
					</motion.div>
				)}
			</AnimatePresence>
		</nav>
	);
}

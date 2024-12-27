'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		
		const staticEmail = 'admin@example.com';
		const staticPassword = 'admin123';

		if (email === staticEmail && password === staticPassword) {
			router.push('/');
		} else {
			alert('Invalid credentials. Please use admin@example.com / admin123');
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-green-500 p-4">
			<div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-md w-full relative">
				<div className="absolute inset-0 opacity-5">
					<Image
						src="/map-pattern.png"
						alt="Map Pattern"
						layout="fill"
						objectFit="cover"
					/>
				</div>

				<div className="relative p-8">
					<div className="flex justify-center mb-8">
						<div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
							<svg
								className="w-8 h-8 text-white"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
								/>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
								/>
							</svg>
						</div>
					</div>

					<h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
						Welcome Back
					</h2>

					<form onSubmit={handleSubmit} className="space-y-6">
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700"
							>
								Email
							</label>
							<input
								type="email"
								id="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
								required
							/>
						</div>

						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-700"
							>
								Password
							</label>
							<input
								type="password"
								id="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
								required
							/>
						</div>

						<div>
							<button
								type="submit"
								className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
							>
								Sign in
							</button>
						</div>
					</form>

					<div className="mt-6 text-center">
						<a href="#" className="text-sm text-blue-600 hover:text-blue-500">
							Forgot your password?
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { io } from 'socket.io-client';
import Navbar from '@/components/Navbar';

const socket = io('http://localhost:3001', {
	autoConnect: true,
	reconnection: true
});

export default function Home() {
	const router = useRouter();

	useEffect(() => {
		// Add your authentication check here
		const isAuthenticated = false; // Replace with actual auth check
		if (!isAuthenticated) {
			router.push('/login');
		}
	}, [router]);

	useEffect(() => {
		socket.on('connect', () => {
			console.log('Connected to Socket.IO server');
		});

		socket.on('disconnect', () => {
			console.log('Disconnected from Socket.IO server');
		});

		socket.on('error', (error) => {
			console.error('Socket.IO error:', error);
		});

		socket.on('location_update', (data) => {
			console.log('Received location update:', data);
		});

		return () => {
			socket.off('connect');
			socket.off('disconnect');
			socket.off('error');
			socket.off('location_update');
			socket.disconnect();
		};
	}, []);

	return (
		<div className="min-h-screen bg-gray-50">
			<Navbar />
			<main className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
				<div className="text-center">
					<h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
						Welcome to MapApp
					</h1>
					<p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
						Explore locations, track positions, and navigate with ease using our advanced mapping features.
					</p>
					<div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
						<div className="rounded-md shadow">
							<button
								onClick={() => router.push('/map')}
								className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
							>
								Open Map
							</button>
						</div>
					</div>
				</div>

				<div className="mt-16">
					<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
						{/* Feature 1 */}
						<div className="pt-6">
							<div className="flow-root bg-white rounded-lg px-6 pb-8">
								<div className="-mt-6">
									<div>
										<span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
											<svg
												className="h-6 w-6 text-white"
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
											</svg>
										</span>
									</div>
									<h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Real-time Location</h3>
									<p className="mt-5 text-base text-gray-500">
										Get accurate real-time location tracking with our advanced GPS integration.
									</p>
								</div>
							</div>
						</div>

						{/* Feature 2 */}
						<div className="pt-6">
							<div className="flow-root bg-white rounded-lg px-6 pb-8">
								<div className="-mt-6">
									<div>
										<span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
											<svg
												className="h-6 w-6 text-white"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
												/>
											</svg>
										</span>
									</div>
									<h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Interactive Maps</h3>
									<p className="mt-5 text-base text-gray-500">
										Explore interactive maps with custom markers and detailed information.
									</p>
								</div>
							</div>
						</div>

						{/* Feature 3 */}
						<div className="pt-6">
							<div className="flow-root bg-white rounded-lg px-6 pb-8">
								<div className="-mt-6">
									<div>
										<span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
											<svg
												className="h-6 w-6 text-white"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
												/>
											</svg>
										</span>
									</div>
									<h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Real-time Updates</h3>
									<p className="mt-5 text-base text-gray-500">
										Stay updated with real-time location changes and map updates.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

'use client';

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

export default function Map() {
	const mapContainer = useRef<HTMLDivElement>(null);
	const map = useRef<mapboxgl.Map | null>(null);

	useEffect(() => {
		if (!mapContainer.current) return;
		if (navigator.geolocation) {
			navigator.permissions
				.query({ name: 'geolocation' })
				.then(result => {
					if (result.state === 'granted' || result.state === 'prompt') {
						navigator.geolocation.getCurrentPosition(
							position => {
								const { latitude, longitude } = position.coords;
								map.current?.setCenter([longitude, latitude]);
							},
							error => {
								console.error(error);
							}
						);
					} else {
						console.error('Geolocation permission denied');
					}
				})
		}

		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: 'mapbox://styles/mapbox/streets-v12',
			center: [-74.5, 40],
			zoom: 13
		});

		return () => {
			map.current?.remove();
		};
	}, []);

	return (
		<div
			ref={mapContainer}
			className="w-screen h-screen"
		/>
	);
}

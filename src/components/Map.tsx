'use client';

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

export default function Map() {
	const mapContainer = useRef<HTMLDivElement>(null);
	const map = useRef<mapboxgl.Map | null>(null);
	const marker = useRef<mapboxgl.Marker | null>(null);

	useEffect(() => {
		if (!mapContainer.current || map.current) return;

		// Initialize map first
		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: 'mapbox://styles/mapbox/streets-v12',
			center: [-74.5, 40] as [number, number],
			zoom: 13,
			attributionControl: false,
			preserveDrawingBuffer: false,
			antialias: true,
			trackResize: true,
			maxZoom: 20
		});

		// Check geolocation after map is initialized
		if (navigator.geolocation) {
			navigator.permissions
				.query({ name: 'geolocation' })
				.then(result => {
					if (result.state === 'granted' || result.state === 'prompt') {
						navigator.geolocation.getCurrentPosition(
							position => {
								const { latitude, longitude } = position.coords;
								const lngLat: [number, number] = [longitude, latitude];
								
								// Create and add marker
								if (!marker.current) {
									marker.current = new mapboxgl.Marker({
										color: '#FF0000',
										draggable: false
									})
										.setLngLat(lngLat)
										.addTo(map.current!);
								} else {
									marker.current.setLngLat(lngLat);
								}

								map.current?.setCenter(lngLat);
							},
							error => {
								console.error('Geolocation error:', error);
							},
							{
								enableHighAccuracy: true,
								timeout: 5000,
								maximumAge: 0
							}
						);
					}
				})
				.catch(error => {
					console.error('Permission error:', error);
				});
		}

		map.current.on('load', () => {
			map.current?.resize();
		});

		return () => {
			marker.current?.remove();
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

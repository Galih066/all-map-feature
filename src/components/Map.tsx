'use client';

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

const DEFAULT_CENTER: [number, number] = [-74.5, 40];
const DEFAULT_ZOOM = 13;

export default function Map() {
	const mapContainer = useRef<HTMLDivElement>(null);
	const map = useRef<mapboxgl.Map | null>(null);
	const marker = useRef<mapboxgl.Marker | null>(null);

	const initializeMap = () => {
		if (!mapContainer.current || map.current) return;

		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: 'mapbox://styles/mapbox/streets-v12',
			center: DEFAULT_CENTER,
			zoom: DEFAULT_ZOOM,
			attributionControl: false,
			antialias: true
		});

		map.current.on('load', () => map.current?.resize());
	};

	const updateLocation = (coords: GeolocationCoordinates) => {
		const lngLat: [number, number] = [coords.longitude, coords.latitude];

		if (!marker.current) {
			marker.current = new mapboxgl.Marker({ color: '#FF0000' })
				.setLngLat(lngLat)
				.addTo(map.current!);
		} else {
			marker.current.setLngLat(lngLat);
		}

		map.current?.setCenter(lngLat);
	};

	const setupGeolocation = async () => {
		try {
			const permission = await navigator.permissions.query({ name: 'geolocation' });
			
			if (permission.state === 'granted' || permission.state === 'prompt') {
				navigator.geolocation.getCurrentPosition(
					({ coords }) => updateLocation(coords),
					(error) => console.error('Geolocation error:', error),
					{ enableHighAccuracy: true, timeout: 5000 }
				);
			}
		} catch (error) {
			console.error('Permission error:', error);
		}
	};

	useEffect(() => {
		initializeMap();
		setupGeolocation();

		return () => {
			marker.current?.remove();
			map.current?.remove();
		};
	}, []);

	return (
		<div ref={mapContainer} className="w-screen h-screen" />
	);
}

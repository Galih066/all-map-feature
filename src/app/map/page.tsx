'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Map from "@/components/Map";
import Navbar from '@/components/Navbar';

export default function MapPage() {
  const router = useRouter();

  useEffect(() => {
    // Add your authentication check here
    const isAuthenticated = false; // Replace with actual auth check
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 mt-16">
        <Map />
      </div>
    </div>
  );
}

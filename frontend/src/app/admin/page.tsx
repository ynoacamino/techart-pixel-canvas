'use client';

import { useAuth } from '@/components/contexts/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!isLoading && !user) {
      localStorage.setItem('isRedirectToLogin', 'true');
      router.push('/');
    }
    if (!isLoading && user && user.role !== 'admin') {
      localStorage.setItem('isNotAdmin', 'true');
      router.push('/');
    }
  }, [isLoading, user, router]);

  if (isLoading || !user) return null;
  return (
    <h1>Admin page</h1>
  );
}

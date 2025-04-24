import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BACKEND_URL } from '@/config/variables';
import { useEffect, useRef } from 'react';
import ModalSignIn from './ModalSignIn';
import { useAuth } from '../contexts/AuthProvider';

export default function Auth() {
  const { user, isLoading } = useAuth();
  const triggerModalRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (triggerModalRef.current) {
      const isRedirectToLogin = localStorage.getItem('isRedirectToLogin');
      if (isRedirectToLogin) {
        localStorage.removeItem('isRedirectToLogin');
        triggerModalRef.current.click();
      }
    }
  }, [triggerModalRef]);
  return (
    !isLoading && (
      <div className="flex flex-col gap-y-4 items-center animate-slide-up w-full">
        <p>
          {user ? '¡Bienvenido de nuevo!' : 'Inicia sesión para pintar'}
        </p>
        <div className="flex flex-col md:flex-row items-center gap-x-20 gap-y-4">
          {
            user && (
              <>
                <div className="flex gap-x-3 items-center">
                  {
                    user.avatar ? (
                      <img
                        src={user.avatar}
                        alt="Perfil"
                        className="size-10 rounded-full"
                      />
                    ) : (
                      <div className="size-10 rounded-full bg-gray-500" />
                    )
                  }
                  <div className="flex flex-col">
                    <p className="text-lg font-bold">{user.name}</p>
                    <p className="text-sm font-light text-gray-700">{user.email}</p>
                  </div>
                </div>
                <Button size="sm" asChild>
                  <Link href={`${BACKEND_URL}/auth/google/logout`}>
                    Cerrar sesión
                  </Link>
                </Button>
              </>
            )
          }
          {
            !user && (
              <ModalSignIn>
                <Button size="sm" ref={triggerModalRef}>
                  Iniciar sesión
                </Button>
              </ModalSignIn>
            )
          }
        </div>
      </div>
    )
  );
}

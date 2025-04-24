import { Button } from '@/components/ui/button';
import { User } from '@/lib/models';
import ModalSignIn from './ModalSignIn';

interface AuthProps {
  user?: User
}

export default function Auth({
  user,
}: AuthProps) {
  return (
    <div className="flex flex-col gap-y-4 items-center animate-slide-up w-full">
      <p>
        {user ? '¡Bienvenido de nuevo!' : 'Inicia sesión para pintar'}
      </p>
      <div className="flex flex-col md:flex-row items-center gap-x-20 gap-y-4">
        {
          user && (
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
          )
        }
        {
          user ? (
            <Button size="sm">
              Cerrar sesión
            </Button>
          ) : (
            <ModalSignIn>
              <Button size="sm">
                Iniciar sesión
              </Button>
            </ModalSignIn>
          )
        }
      </div>
    </div>
  );
}

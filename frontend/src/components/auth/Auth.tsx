import { Button } from '@/components/ui/button';

interface AuthProps {
  user?: {
    name: string;
    email: string;
    img?: string;
  }
}

export default function Auth({
  user,
}: AuthProps) {
  return (
    <div className="flex flex-col gap-y-4">
      <p>
        {user ? '¡Bienvenido de nuevo!' : 'Inicia sesión para pintar'}
      </p>
      {
        user && (
          <div className="flex gap-3">
            {
              user.img ? (
                <img
                  src={user.img}
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
      <Button size="sm">
        {user ? 'Cerrar Sesión' : 'Iniciar Sesión'}
      </Button>
    </div>
  );
}

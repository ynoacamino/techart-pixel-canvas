'use client';

import useSecret from '@/hooks/useSecret';

export default function Page() {
  const { secretState, discoveredBy } = useSecret();
  return (
    <div className="flex h-screen items-center justify-center">
      {
        secretState ? (
          <>
            {
              secretState === 'trap' && (
                <h1 className="text-2xl text-red-500">
                  ¡Has hecho trampa!
                  {' '}
                  <br />
                  {discoveredBy !== null && `No formas parte de los ${discoveredBy} usuarios que lo han descubierto.`}
                </h1>
              )
            }
            {
              secretState === 'firstdisc' && (
                <h1 className="text-2xl text-green-500">
                  ¡Felicidades!.
                  {' '}
                  <br />
                  {discoveredBy !== null && `Eres el ${discoveredBy} usuario que lo ha descubierto.`}
                </h1>
              )
            }
            {
              secretState === 'disc' && (
                <h1 className="text-2xl text-blue-500">
                  ¡Ya has descubierto el secreto!.
                  {' '}
                  <br />
                  {discoveredBy !== null && `Van ${discoveredBy} usuarios que lo han descubierto.`}
                </h1>
              )
            }

          </>
        ) : (
          <h1>Verificando que no hiciste trampa...</h1>
        )
      }
    </div>
  );
}

import * as Dialog from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';
import Google from '@/components/logos/Google';
import { Blocks } from '../ui/blocks';

export default function ModalSignIn({ children } : { children: React.ReactNode }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        {children}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-gray-900/40 fixed inset-0 animate-fade-in" />
        <Dialog.Content className="bg-zinc-300 rounded-xl shadow-lg fixed top-1/2 left-1/2 -traslate-1/2 w-[90vw] max-w-lg max-h-[85vh] p-7 animate-content-show focus:outline-none flex flex-col justify-center items-center">
          <Blocks
            cols={12}
            rows={2}
            color="green"
            ratio={2}
            className="mb-20"
          />
          <Dialog.Title className="font-semibold text-2xl text-center">
            Iniciar Sesión para pintar
          </Dialog.Title>
          <Dialog.Description className="font-light text-center mb-6 mt-2">
            Únete a nuestro arte y deja tu pixel
          </Dialog.Description>
          <div className="flex justify-center">
            <Button variant="outline" className="min-w-[300px]">
              <Google />
              Google
            </Button>
          </div>
          <Blocks
            cols={12}
            rows={2}
            color="green"
            ratio={2}
            className="mt-20"
          />
          <Dialog.Close asChild>
            <Button size="icon" variant="ghost" className="absolute top-4 right-4">
              X
            </Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

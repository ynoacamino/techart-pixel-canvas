import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <div className="flex-1 basis-full flex flex-col gap-y-10 items-center justify-center">
      <h1 className="text-5xl font-bold text-center uppercase">
        Teach Art
      </h1>
      <Button size="lg" className="text-xl animate-bounce">
        ¡Pintemos!
      </Button>
    </div>
  );
}

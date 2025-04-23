import { Blocks } from '@/components/ui/blocks';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <div className="flex-1 basis-md flex flex-col gap-y-10 items-center justify-center relative">
      <h1 className="text-5xl font-bold text-center uppercase">
        Teach Art
      </h1>
      <Button size="lg" className="text-xl animate-bounce">
        ¡Pintemos!
      </Button>
      <div className="flex gap-0.5 absolute bottom-1/2 translate-y-44">
        <Blocks cols={5} rows={2} ratio={1.5} color="blue" />
        <Blocks cols={5} rows={2} ratio={1.5} color="green" />
        <Blocks cols={5} rows={2} ratio={1.5} color="pink" />
      </div>
      <div className="flex gap-0.5 absolute top-1/2 -translate-y-44">
        <Blocks cols={5} rows={2} ratio={1.5} color="purple" />
        <Blocks cols={5} rows={2} ratio={1.5} color="red" />
        <Blocks cols={5} rows={2} ratio={1.5} color="yellow" />
      </div>
      <Blocks cols={2} rows={7} ratio={1.5} color="cyan" className="absolute right-0 translate-x-36" />
      <Blocks cols={2} rows={7} ratio={1.5} color="orange" className="absolute left-0 -translate-x-36" />
    </div>
  );
}

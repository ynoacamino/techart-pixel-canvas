import Auth from '@/components/auth/Auth';
import Gallery from '@/components/pages/home/Gallery';
import Hero from '@/components/pages/home/Hero';

const user = {
  name: 'John Doe',
  email: 'example@example.com',
};

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col gap-y-6 py-6 items-center justify-center">
      <Hero />
      <Auth user={user} />
      <Gallery side="left" />
      <Gallery side="right" />
    </div>
  );
}

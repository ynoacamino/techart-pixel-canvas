import Auth from '@/components/auth/Auth';
import Gallery from '@/components/pages/home/Gallery';
import Hero from '@/components/pages/home/Hero';
import MasonryGallery from '@/components/pages/home/MasonryGallery';

const user = {
  name: 'John Doe',
  email: 'example@example.com',
};

export default function Home() {
  return (
    <>
      <div className="relative md:fixed top-0 w-full flex flex-col gap-y-6 py-6 items-center justify-center">
        <Hero user={user} />
        <Auth user={user} />
      </div>
      <Gallery side="left" />
      <Gallery side="right" />
      <MasonryGallery />
    </>
  );
}

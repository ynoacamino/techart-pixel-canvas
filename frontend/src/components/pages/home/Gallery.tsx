import { Section } from '@/components/ui/section';
import MasonryGallery from './MasonryGallery';
import Subtitle from './Subtitle';

const IMAGES = [
  'https://ynoa-uploader.ynoacamino.me/uploads/1746501900_1.webp',
  'https://ynoa-uploader.ynoacamino.me/uploads/1746501913_2.webp',
  'https://ynoa-uploader.ynoacamino.me/uploads/1746501926_3.webp',
  'https://ynoa-uploader.ynoacamino.me/uploads/1746501937_4.webp',
  'https://ynoa-uploader.ynoacamino.me/uploads/1746501951_5.webp',
  'https://ynoa-uploader.ynoacamino.me/uploads/1746501968_6.webp',
  'https://ynoa-uploader.ynoacamino.me/uploads/1746501979_7.webp',
  'https://ynoa-uploader.ynoacamino.me/uploads/1746501990_8.webp',
  'https://ynoa-uploader.ynoacamino.me/uploads/1746501937_4.webp',
  'https://ynoa-uploader.ynoacamino.me/uploads/1746501990_8.webp',
  'https://ynoa-uploader.ynoacamino.me/uploads/1746501968_6.webp',
  'https://ynoa-uploader.ynoacamino.me/uploads/1746501951_5.webp',
  'https://ynoa-uploader.ynoacamino.me/uploads/1746501900_1.webp',
  'https://ynoa-uploader.ynoacamino.me/uploads/1746501926_3.webp',
  'https://ynoa-uploader.ynoacamino.me/uploads/1746501979_7.webp',
  'https://ynoa-uploader.ynoacamino.me/uploads/1746501913_2.webp',
];

export default function Gallery() {
  return (
    <Section>
      <Subtitle
        primary="Galería de arte"
        secundary="Ofrecida por TechArt"
      />
      <div className="w-full max-w-7xl">
        <MasonryGallery images={IMAGES} />
      </div>
    </Section>
  );
}

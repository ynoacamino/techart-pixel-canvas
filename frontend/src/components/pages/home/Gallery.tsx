import { Section } from '@/components/ui/section';
import MasonryGallery from './MasonryGallery';
import Subtitle from './Subtitle';

export default function Gallery() {
  return (
    <Section>
      <Subtitle
        primary="Galería de arte"
        secundary="Ofrecida por TechArt"
      />
      <div className="w-full max-w-7xl">
        <MasonryGallery />
      </div>
    </Section>
  );
}

import MasonryGallery from './MasonryGallery';
import Subtitle from './Subtitle';

export default function Gallery() {
  return (
    <div className="w-full flex flex-col gap-24 items-center my-36">
      <Subtitle
        primary="Galeria de arte"
        secundary="Ofrecida por TechArt"
      />
      <div className="w-full max-w-7xl">
        <MasonryGallery />
      </div>
    </div>
  );
}

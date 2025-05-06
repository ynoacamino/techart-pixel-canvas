import { Section } from '@/components/ui/section';
import Subtitle from './Subtitle';

const SPONSORTS = [
  {
    src: 'https://ynoa-uploader.ynoacamino.site/uploads/1746135541_LogoNegro-SBIEEEUNSA.png',
    alt: 'IEEE UNSA Student Branch',
  },
  {
    src: 'https://ynoa-uploader.ynoacamino.site/uploads/1746502291_Component%201%20%287%29.png',
    alt: 'Tech Art Arequipa',
  },
];

export default function Sponsors() {
  return (
    <Section>
      <Subtitle
        primary="Sponsors"
        secundary="Agradecemos su colaboración"
      />
      <div className="grid md:grid-cols-2 gap-y-20 w-full max-w-7xl">
        {SPONSORTS.map((sponsor, index) => (
          <img
            key={index}
            src={sponsor.src}
            alt={sponsor.alt}
            className="w-80 md:w-full max-w-sm justify-self-center"
          />
        ))}
      </div>
    </Section>
  );
}

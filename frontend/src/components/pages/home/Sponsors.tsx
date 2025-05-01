import Subtitle from './Subtitle';

const SPONSORTS = [
  {
    src: 'https://ynoa-uploader.ynoacamino.site/uploads/1746135541_LogoNegro-SBIEEEUNSA.png',
    alt: 'IEEE UNSA Student Branch',
  },
  {
    src: 'https://ynoa-uploader.ynoacamino.site/uploads/1746135568_Component%201%20%286%29.png',
    alt: 'Tech Art Arequipa',
  },
];

export default function Sponsors() {
  return (
    <div className="w-full flex flex-col gap-28 items-center my-36">
      <Subtitle
        primary="Sponsors"
        secundary="Agradecemos su colaboración"
      />
      <div className="grid grid-cols-2 w-full max-w-7xl">
        {SPONSORTS.map((sponsor, index) => (
          <img
            key={index}
            src={sponsor.src}
            alt={sponsor.alt}
            className="w-full max-w-sm justify-self-center"
          />
        ))}
      </div>
    </div>
  );
}

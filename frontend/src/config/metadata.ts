import { Metadata } from 'next';

const metadataConfig: Metadata = {
  title: 'TechArt | Pixel art',
  description: 'Página web para promocion de concurso de arte en colaboracion entre IEEE Student Branch UNSA y Asociacion Integrativa HDC',
  authors: [
    { name: 'Yenaro Joel Noa Camino', url: 'https://github.com/ynoacamino' },
    { name: 'Luis Gustavo Sequeiros Condori', url: 'https://github.com/gustadev24' },
  ],
  creator: 'Yenaro Joel Noa Camino and Luis Gustavo Sequeiros Condori',
  publisher: 'TechArt | Pixel art',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://techart.ynoacamino.site/',
    title: 'TechArt | Pixel art',
    description: 'Página web para promocion de concurso de arte en colaboracion entre IEEE Student Branch UNSA y Asociacion Integrativa HDC',
    images: [
      {
        url: 'https://ynoa-uploader.ynoacamino.me/uploads/1746503422_2025-05-05_22-49.webp',
        width: 631,
        height: 494,
        alt: 'TechArt | Pixel art',
      },
    ],
    siteName: 'TechArt | Pixel art',
  },
  twitter: {
    creator: '@ynoacamino @gustadev24',
    site: 'https://techart.ynoacamino.site',
    description: 'Página web para promocion de concurso de arte en colaboracion entre IEEE Student Branch UNSA y Asociacion Integrativa HDC',
    images: [
      {
        url: 'https://ynoa-uploader.ynoacamino.me/uploads/1746503422_2025-05-05_22-49.webp',
        width: 631,
        height: 494,
        alt: 'TechArt | Pixel art',
      },
    ],
    title: 'TechArt | Pixel art',
  },
  metadataBase: new URL('https://techart.ynoacamino.site/'),
};

export default metadataConfig;

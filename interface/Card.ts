import { StaticImageData } from 'next/image';

export interface I_Card {
  image?: StaticImageData;
  alt?: string;
  title: string;
  tag: React.ReactNode[];
  date: string;
  user: JSX.Element;
}

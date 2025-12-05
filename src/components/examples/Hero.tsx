import Hero from '../Hero';

export default function HeroExample() {
  return <Hero onCtaClick={() => console.log('CTA clicked')} />;
}

/**
 * Index page header. Type-only and deliberately short — the featured card
 * immediately below is the page's first real visual, and a banner here would
 * push it under the fold.
 */
export default function Hero() {
  return (
    <section id="top" className="cs-hero">
      <div className="container-page">
        <p className="eyebrow">Case studies</p>
        <h1 className="display cs-hero-h1 mt-4 max-w-[20ch]">
          How brands scale creative{" "}
          <span className="h-muted">production with ImagineArt</span>
        </h1>
        <p className="lede mt-6 max-w-[58ch]">
          Businesses, agencies, and marketing teams around the world use
          ImagineArt Enterprise to produce on-brand content at scale, and spend
          less doing it.
        </p>
      </div>

      <style>{`
        .cs-hero {
          position: relative;
          padding-top: clamp(140px, 17vh, 200px);
          padding-bottom: clamp(24px, 4vh, 48px);
        }
        .cs-hero-h1 { font-size: clamp(32px, 4.6vw, 58px); }
      `}</style>
    </section>
  );
}

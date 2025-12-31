const Marquee = () => {
  const items = [
    'STRATEGY',
    '✦',
    'CREATIVITY',
    '✦',
    'PERFORMANCE',
    '✦',
    'GROWTH',
    '✦',
    'VIRALITY',
    '✦',
    'DOMINATION',
    '✦',
  ];

  return (
    <section className="py-16 border-y border-border overflow-hidden bg-primary text-primary-foreground">
      <div className="animate-marquee flex whitespace-nowrap">
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span
            key={i}
            className="mx-8 text-4xl md:text-6xl font-display font-extrabold"
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  );
};

export default Marquee;

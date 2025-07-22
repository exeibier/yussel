import React from 'react';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-sky-400 bg-cover bg-center opacity-10"></div>
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <h1 className="text-6xl md:text-8xl font-bold text-stone-50 mb-6 tracking-tight text-shadow-lg">
          YUSSEL ESTRADA
        </h1>
        <h2 className="text-2xl md:text-4xl text-stone-50 mb-8 font-light tracking-wide text-shadow-sm">
        Mexican Photographer
        </h2>
        <h3 className="text-xl md:text-2xl text-stone-50 max-w-2xl mx-auto leading-relaxed">
          Commercial / Portraits / Live Music and DJ / Documental
        </h3>
        <h3 className="text-xl md:text-2xl text-stone-50 max-w-2xl mx-auto leading-relaxed">
          Based at Mexico City
        </h3>
      </div>
    </section>
  );
};

export default Hero;
import React from 'react';
import Image from "next/image"

const BioSection = () => {
  return (
    <section id="bio" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl md:text-6xl font-bold text-black mb-8">BIO</h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                During my teenage years, in search of my identity; I decided to start a journey between music and skateboarding. Surrounded by chords and sounds of tires hitting the asphalt, I found in photography a way to show my interest in the world, discovering people, spaces, situations that helped me to understand my own reality. It is through the image that I find the right language to share with the world my desires, my vision of life and what surrounds me.  
              </p>
              <p>
                What you see here is the way I see the world through my lens.Scenarios, portraits, cities, different ways of observing through light as a source of creation. Photography is understood as a drawing with light, let's draw an idea together, the most luminous that our vision can imagine.
              </p>
              <p>
                I currently reside in Mexico City, the place where dreams are the means to grow.
              </p>
              <p>
                Enjoy the images.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden bg-gray-100">
                <Image
                    src="/about/portrait.jpg"
                    alt="Yussel Estrada"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto' }}
                    className="w-full h-full object-cover"
                />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BioSection;
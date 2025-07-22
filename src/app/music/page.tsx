import React from 'react';
import Navigation from '../../components/Navigation';
import Contact from '../../components/Contact';
import Image from 'next/image';

const MusicPage = () => {
  const musicImages = Array.from({ length: 49 }, (_, i) => {
    const id = i + 1;
    return {
      id,
      category: 'music',
      src: `/work/music/music${String(id).padStart(3, '0')}.jpg`,
      alt: `music Photography ${id}`
    };
  });
  

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-black mb-4">Music</h2>
            <p className="text-lg text-gray-600">{musicImages.length} photos</p>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {musicImages.map((photo) => (
              <div
                key={photo.id}
                className="group relative overflow-hidden bg-gray-100 aspect-square cursor-pointer"
              >
                <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Contact />
    </div>
  );
};

export default MusicPage;
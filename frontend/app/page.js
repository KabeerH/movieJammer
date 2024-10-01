'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const images = ['/poster1.jpg', 'poster2.jpg', 'poster3.jpg'];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      <div className="relative w-screen h-screen overflow-hidden bg-black">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Poster ${index + 1}`}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>
    </>
  );
}
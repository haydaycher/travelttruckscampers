// src/components/ImageGallery/ImageGallery.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

const ImageGallery = ({ images }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  if (isMobile) {
    return (
      <div className={css.mobileSlider}>
        {images.map((img, idx) => (
          <div key={idx} className={css.mobileSlide}>
            <img
              src={img.full || img.thumb}
              alt={`Camper image ${idx + 1}`}
              className={css.slideImage}
            />
          </div>
        ))}
      </div>
    );
  }

  // А це ваша звичайна галерея для планшетів/десктопів:
  return (
    <div className={css.photoGallery}>
      {images.map((img, idx) => (
        <img
          key={idx}
          src={img.thumb}
          alt={`Camper thumb ${idx + 1}`}
          className={css.galleryPhoto}
        />
      ))}
    </div>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      thumb: PropTypes.string.isRequired,
      full: PropTypes.string,
    }),
  ).isRequired,
};

export default ImageGallery;

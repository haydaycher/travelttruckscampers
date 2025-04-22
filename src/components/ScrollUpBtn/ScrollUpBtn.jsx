// src/components/ScrollUpBtn/ScrollUpBtn.jsx
import React, { useState, useEffect } from 'react';
import css from './ScrollUpBtn.module.css';

const ScrollUpBtn = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // показуємо/ховаємо кнопку при скролі, тільки якщо ширина <= 768px
    const handleScroll = () => {
      if (window.innerWidth <= 768) {
        setVisible(window.scrollY > 1300);
      }
    };
    // перевіримо одразу при монтуванні
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // якщо не треба показувати — нічого не рендеримо
  if (!visible) return null;

  return (
    <button
      className={css.goBackBtn}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      ↑
    </button>
  );
};

export default ScrollUpBtn;

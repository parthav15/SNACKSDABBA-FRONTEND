import React, { useState, useEffect } from 'react';
import './header.css';
import PropTypes from 'prop-types';
import { BASE_URL } from 'config';
import next from '../../assets/images/right-arrow.png';
import prev from '../../assets/images/left-arrow.png';

const Header = ({ autoSlide = true, slideInterval = 3000 }) => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchCarouselImages = async () => {
      try {
        const response = await fetch(`${BASE_URL}/admin_panel/list_carousel_images/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setSlides(data.carousel_images);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCarouselImages();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    let interval;
    if (autoSlide && slides.length > 0) {
      interval = setInterval(() => {
        nextSlide();
      }, slideInterval);
    }
    return () => clearInterval(interval);
  }, [currentIndex, autoSlide, slideInterval, slides.length]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="carousel">
      <button className="prev btn" onClick={prevSlide}>
        <img src={prev} className="arrow" />
      </button>
      <div className="carousel-content" style={{ transform: `translateX(${-currentIndex * 100}%)` }}>
        {slides.map((slide, index) => (
          <div key={slide.id} className="carousel-slide">
            <img
              src={`${BASE_URL}/media/${slide.image}`}
              alt={slide.alt_text || `Slide ${index + 1}`}
              className="carousel-image"
              loading="lazy"
            />
          </div>
        ))}
      </div>
      <div className="carousel-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
      <button className="next btn" onClick={nextSlide}>
        <img src={next} className="arrow" />
      </button>
    </div>
  );
};

Header.propTypes = {
  autoSlide: PropTypes.bool.isRequired,
  slideInterval: PropTypes.number.isRequired,
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      alt_text: PropTypes.string.isRequired,
      caption: PropTypes.string,
    })
  ).isRequired,
};

export default Header;


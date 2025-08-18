// src/components/ImageCarousel.jsx
import React, { useState, useRef, useEffect } from 'react';

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const mainImageScrollRef = useRef(null);
  const thumbnailContainerRef = useRef(null);

  // This effect synchronizes the large image scroll position when a thumbnail is clicked
  useEffect(() => {
    if (mainImageScrollRef.current) {
      const scrollWidth = mainImageScrollRef.current.scrollWidth;
      const childWidth = scrollWidth / images.length;
      mainImageScrollRef.current.scrollTo({
        left: childWidth * currentIndex,
        behavior: 'smooth',
      });
    }
     // Also, ensure the active thumbnail is visible in its own scroll container
    if (thumbnailContainerRef.current) {
        const activeThumbnail = thumbnailContainerRef.current.children[currentIndex];
        if (activeThumbnail) {
            activeThumbnail.scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
                block: 'nearest'
            });
        }
    }
  }, [currentIndex, images.length]);


  const handleThumbnailClick = (index) => {
    console.log(`clicked ${index}th image`)
    setCurrentIndex(index);
  };

  // This function is called when the user scrolls the main image container
  const handleMainImageScroll = () => {
    if (mainImageScrollRef.current) {
        const scrollLeft = mainImageScrollRef.current.scrollLeft;
        const childWidth = mainImageScrollRef.current.scrollWidth / images.length;
        // Add a small tolerance for rounding issues
        const newIndex = Math.round(scrollLeft / childWidth);
        if (newIndex !== currentIndex) {
            setCurrentIndex(newIndex);
        }
    }
  };


  if (!images || images.length === 0) {
    return <div>No images to display.</div>;
  }

  return (
    <div className="image-carousel-container">
      {/* Main Image Viewer */}
      <div 
        className="main-image-scroll-container" 
        ref={mainImageScrollRef}
        
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            className="main-image"
          />
        ))}
      </div>

      {/* Thumbnail List */}
      <div className="thumbnail-list-container" ref={thumbnailContainerRef}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`thumbnail-wrapper ${index === currentIndex ? 'active' : ''}`}
            onClick={() => handleThumbnailClick(index)}
          >
            <img
              src={image.src}
              alt={`Thumbnail of ${image.alt}`}
              className="thumbnail-image"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
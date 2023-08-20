import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from 'reactstrap';

const ImageSlider = ({ data, modalToggle }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === data.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? data.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = (items) => {
    return (
      items.map((item) => (
        < CarouselItem
          onExiting={() => setAnimating(true)}
          onExited={() => setAnimating(false)}
          key={item.id}
        >
          <img onClick={() => modalToggle(item)} style={{ cursor: 'pointer', objectFit: 'contain', borderRadius: '10px 0 0 10px', width: '100%', overflow: 'hidden' }} src={`https://image.tmdb.org/t/p/w1280/${item.backdrop_path}`} alt={item.altText} />
          <CarouselCaption
            captionText={item.overview}
            captionHeader={item.title}
          />
        </CarouselItem >
      ))
    );
  }

  return (
    <Carousel
      style={{ backgroundImage: `url("https://image.tmdb.org/t/p/w1280/${data[activeIndex].backdrop_path}")` }}
      activeIndex={activeIndex}
      next={next}
      previous={previous}
    >
      <CarouselIndicators
        items={data}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {slides(data)}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
      />
    </Carousel>
  );
}

export default ImageSlider;
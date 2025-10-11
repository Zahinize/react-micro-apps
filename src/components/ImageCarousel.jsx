import { useState, useEffect, useRef } from "react";
import { Expand, X, ChevronLeft, ChevronRight } from 'lucide-react';

function ImageCarousel() {
  const [translateX, setTranslateX] = useState(0);
  const [isOverlay, setIsOverlay] = useState(false);
  const overlayCarouselRef = useRef(null);
  const carouselRef = useRef(null);
  const translateWidthRef = useRef(0);
  const maxTranslateWidthRef = useRef(0);
  const imgArr = [
    "https://images.unsplash.com/photo-1757263005786-43d955f07fb1?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1506220926022-cc5c12acdb35?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1757094866827-c4970619854d?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1744749583027-eaef2cf563ba?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1757664171309-f5c082f8d64c?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ];

  useEffect(() => {
    if (isOverlay) {
      translateWidthRef.current = overlayCarouselRef?.current?.parentElement?.offsetWidth;
    } else {
      translateWidthRef.current = carouselRef?.current?.parentElement?.offsetWidth;
    }

    if (!maxTranslateWidthRef.current) {
      maxTranslateWidthRef.current = translateWidthRef.current * imgArr.length;
    }
  });

  useEffect(() => {
    if (!isOverlay) {
      carouselRef.current.style.transform = `translateX(${translateX}px)`;
      return;
    }

    overlayCarouselRef.current.style.transform = `translateX(${translateX}px)`;
  }, [translateX]);

  useEffect(() => {
    function handleGlobalEsc(e) {
      const isEscapeKey = e.key.toLowerCase() === "escape";
      if (!isEscapeKey) return;

      if (isOverlay) {
        translateWidthRef.current = 0;
        maxTranslateWidthRef.current = 0;
        setIsOverlay(toggle => !toggle);
        setTranslateX(0);
      }
    }

    document.addEventListener("keydown", handleGlobalEsc);

    return () => {
      document.removeEventListener("keydown", handleGlobalEsc);
    }
  }, [isOverlay]);

  /***** Handle UI Events *****/
  function handleNavigationBtnClick(e) {
    const id = e.currentTarget.id;

    if (id == "nav-next") {
      const nextTranslate = translateX - translateWidthRef.current;
      const isLastImg = Math.abs(nextTranslate) === maxTranslateWidthRef.current;

      if (!isLastImg) {
        setTranslateX(nextTranslate);
        return;
      }

      setTranslateX(0);
      return;
    }

    // Previous Button is clicked in this case
    setTranslateX(translateX + translateWidthRef.current);
  }

  function toggleOverlay() {
    translateWidthRef.current = 0;
    maxTranslateWidthRef.current = 0;
    setTranslateX(0);
    setIsOverlay(toggle => !toggle);
  }

  function renderOverlay() {
    return (
      <div className="d-flex d-x-center d-y-center overlay">
        <span onClick={toggleOverlay} className="c-pointer p-absolute overlay-close">
          <X size={36} color="#fff" />
        </span>
        <div className="d-flex d-column d-x-center d-y-center mt-50">
          <div className="carousel-container carousel-container--overlay mb-20">
            <div ref={overlayCarouselRef} className="carousel d-flex">
              <img className="mr-20" src={imgArr[0]} />
              <img className="mr-20" src={imgArr[1]} />
              <img className="mr-20" src={imgArr[2]} />
              <img className="mr-20" src={imgArr[3]} />
              <img className="mr-20" src={imgArr[4]} />
            </div>
          </div>
          {renderNavBtns({
            prevClassName: 'nav-btn nav-btn-prev',
            nextClassName: 'nav-btn nav-btn-next',
            prevIcon: <ChevronLeft size={36} color="#fff" />,
            nextIcon: <ChevronRight size={36} color="#fff" />
          })}
        </div>
      </div>
    )
  }

  function renderCarousel() {
    return (
      <div className="carousel-container mb-20">
        <div ref={carouselRef} className="carousel d-flex">
          <img className="mr-20" src={imgArr[0]} />
          <img className="mr-20" src={imgArr[1]} />
          <img className="mr-20" src={imgArr[2]} />
          <img className="mr-20" src={imgArr[3]} />
          <img className="mr-20" src={imgArr[4]} />
        </div>
        <span onClick={toggleOverlay} className="c-pointer p-absolute carousel-icon carousel-icon-expand">
          <Expand color="#fff" />
        </span>
      </div>
    )
  }

  function renderNavBtns({ prevClassName = "", nextClassName = "", prevIcon, nextIcon }) {
    const isDisablePrevBtn = (translateX === 0);
    const computedPrevClass = `fs-normal sm mr-10 ${prevClassName || ''}`;
    const computedNextClass = `fs-normal sm ${nextClassName || ''}`;

    return (
      <div className="d-flex d-x-center d-y-center">
        <button disabled={isDisablePrevBtn} id="nav-prev" className={computedPrevClass} onClick={handleNavigationBtnClick}>
          {prevIcon || "Previous" }
        </button>
        <button id="nav-next" className={computedNextClass} onClick={handleNavigationBtnClick}>
          {nextIcon || "Next" }
        </button>
      </div>
    )
  }

  return (
    <>
      {renderCarousel()}
      {renderNavBtns({})}
      {isOverlay ? renderOverlay() : null}
    </>
  )
}

export default ImageCarousel;
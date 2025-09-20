import { useState, useEffect, useRef } from "react";

function ImageCarousel({ width = 500 }) {
  const [translateX, setTranslateX] = useState(0);
  const carouselRef = useRef(null);
  const imgArr = [
    "https://images.unsplash.com/photo-1757263005786-43d955f07fb1?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1506220926022-cc5c12acdb35?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1757094866827-c4970619854d?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1744749583027-eaef2cf563ba?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1757664171309-f5c082f8d64c?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ];
  const translateWidth = width;
  const maxTranslateWidth = translateWidth * imgArr.length;

  useEffect(() => {
    carouselRef.current.style.transform = `translateX(${translateX}px)`;
  }, [translateX]);

  function handleNavigationBtnClick(e) {
    const id = e.target.id;

    if (id == "nav-next") {
      const nextTranslate = translateX - translateWidth;
      const isLastImg = Math.abs(nextTranslate) === maxTranslateWidth;

      if (!isLastImg) {
        setTranslateX(nextTranslate);
        return;
      }

      setTranslateX(0);
      return;
    }

    // Previous Button is clicked in this case
    setTranslateX(translateX + translateWidth);
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
      </div>
    )
  }

  function renderNavBtns() {
    const isDisablePrevBtn = (translateX === 0);

    return (
      <>
        <button disabled={isDisablePrevBtn} id="nav-prev" className="mr-10" onClick={handleNavigationBtnClick}>Previous</button>
        <button id="nav-next" onClick={handleNavigationBtnClick}>Next</button>
      </>
    )
  }

  return (
    <>
      {renderCarousel()}
      {renderNavBtns()}
    </>
  )
}

export default ImageCarousel;
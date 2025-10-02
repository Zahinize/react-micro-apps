function Card({ className = "", heading = "", children }) {
  const computedClassName = `card ${className} mb-20`;
  const renderHeading = heading ? (
    <h2 className='mb-20 mt-0'>{heading}</h2>
  ) : null;

  return (
    <div className={computedClassName}>
      {renderHeading}
      {children}
    </div>
  )
}

export default Card;
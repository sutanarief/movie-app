import React from 'react'
import MovieCard from './MovieCard'

const SectionContainer = (props) => {
  const {
    children,
    bgColor,
    textColor,
    title,
    datas,
    scoreBgColor,
    scoreTextColor,
    cardSize,
    imageWidth,
    titleColor,
    dateColor,
    onHover,
    hoverIndex,
    boxShadow,
    HeaderOptions,
    modalToggle,
    getDetailData
  } = props
  return (
    <section
      className={`d-flex flex-column`}
      style={{
        borderRadius: '8px 8px 0 0',
        overflow: 'hidden',
        paddingTop: '30px',
        backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${datas[hoverIndex]?.backdrop_path})`,
        boxShadow: boxShadow,
        backgroundSize: 'cover'
      }}>
      <div className='ms-4 d-flex gap-4'>
        <h4 style={{ color: `${textColor}` }}>{title}</h4>
        {HeaderOptions && <HeaderOptions />}
      </div>
      <div
        className='d-flex p-4 gap-5 max-100 overflow-auto'
      >
        {datas.map((data, index) => (
          <MovieCard
            onHover={onHover}
            modalToggle={modalToggle}
            key={index}
            index={index}
            data={data}
            scoreBgColor={scoreBgColor}
            titleColor={titleColor}
            dateColor={dateColor}
            scoreTextColor={scoreTextColor}
          />
        ))}
      </div>
    </section >
  )
}

export default SectionContainer
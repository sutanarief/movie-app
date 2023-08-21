import React, { useState } from 'react'
import './card.css'

const MovieCard = (props) => {
  const {
    data,
    index,
    onHover,
    modalToggle,
    scoreBgColor = 'bg-dark',
    scoreTextColor = '#FFFFFF',
    cardSize = '150px',
    imageWidth = '1280',
    titleColor = '#FFFFFF',
    dateColor = '#D8CFCF',
    mediaType
  } = props
  const [onLoad, setOnLoad] = useState(true)

  const errorImage = 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'

  const handleScoreColor = (score) => {
    const scoreFixed = Number(data.vote_average).toFixed(1)
    switch (true) {
      case score > 7:
        return (
          <div className='card-ring' style={{ border: "2px solid #21d07a", color: scoreTextColor }}>
            <span>{scoreFixed}</span>
          </div>
        )
      default:
        return (
          <div className='card-ring' style={{ border: "2px solid #d2d531", color: scoreTextColor }}>
            <span>{scoreFixed}</span>
          </div>
        )
    }
  }

  return (
    <div
      className='custom-card'
      {...(onHover && { onMouseEnter: () => onHover(index) })}
      onClick={() => modalToggle(data, mediaType)}
    >
      <img
        width={`${cardSize}`}
        {...((!data.poster_path || onLoad) && { height: '225px' })}
        style={{
          borderRadius: '10px',
          backgroundColor: onLoad ? "white" : data.poster_path ? "" : "white"
        }}
        loading='lazy'
        onLoad={() => setOnLoad(false)}
        src={
          data.poster_path ?
            `https://image.tmdb.org/t/p/w${imageWidth}/${data.poster_path}` :
            errorImage
        }
      />
      <div className={`card-score ${scoreBgColor}`}>
        {handleScoreColor(data.vote_average)}
      </div>
      <div className='custom-card-body'>
        <span className='custom-card-title' style={{ color: titleColor }}>{data.title || data.name}</span>
        <span className='card-date' style={{ color: dateColor }}>{data.release_date || data.first_air_date}</span>
      </div>
    </div>
  )
}

export default MovieCard
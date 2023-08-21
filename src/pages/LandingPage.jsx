import React, { useEffect, useState } from 'react'
import './landingPage.css'
import ImageSlider from '../components/ImageSlider'
import get from '../api/get'
import MovieCard from '../components/MovieCard'
import { Container } from 'reactstrap'
import SectionContainer from '../components/SectionContainer'
import ModalDetail from '../components/ModalDetail'
import Loading from '../components/Loading'

const LandingPage = (props) => {
  const {
    modalToggle
  } = props

  const [popular, setPopular] = useState([])
  const [nowPlaying, setNowPlaying] = useState([])
  const [trending, setTrending] = useState([])
  const [hoverIndex, setHoverIndex] = useState(0)
  const [isLoding, setIsLoading] = useState(true)
  const [isActive, setIsActive] = useState('day')
  const [isPopularActive, setIsPopularActive] = useState('movie')

  const getPopular = async (type) => {
    try {
      const response = await get.getPopular(type)
      setIsPopularActive(type || 'movie')
      setPopular(response.results)
    } catch (error) {
      console.log(error)
    }
  }

  const getNowPlayingMovie = async () => {
    try {
      const response = await get.getNowPlaying()
      setNowPlaying(response.results)
    } catch (error) {
      console.log(error)
    }
  }

  const getTrending = async (time) => {
    try {
      const response = await get.getTrending(time)
      setIsActive(time || 'day')
      setTrending(response.results)
    } catch (error) {
      console.log(error)
    }
  }

  const getAll = async () => {
    try {
      await getPopular()
      await getNowPlayingMovie()
      await getTrending()
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const onHover = (index) => {
    setHoverIndex(index)
  }

  const TrendingHeader = () => (
    <div className='trending-header'>
      <h6 className={`trending-option ${isActive === 'day' && 'trending-active'}`} onClick={() => getTrending('day')}>Today</h6>
      <h6 className={`trending-option ${isActive === 'week' && 'trending-active'}`} onClick={() => getTrending('week')}>This Week</h6>
    </div>
  )


  const PopularHeader = () => (
    <div className='popular-header'>
      <h6 className={`popular-option ${isPopularActive === 'movie' && 'popular-active'}`} onClick={() => getPopular('movie')}>Movies</h6>
      <h6 className={`popular-option ${isPopularActive === 'tv' && 'popular-active'}`} onClick={() => getPopular('tv')}>Tv</h6>
    </div>
  )

  useEffect(() => {
    getAll()
  }, [])

  if (isLoding) {
    return <Loading />
  }

  return (
    <>
      {popular.length > 0 &&
        <ImageSlider data={popular.slice(0, 7)} modalToggle={modalToggle} />
      }

      {/* ====== Start Trending Section ====== */}
      <SectionContainer
        title='Trending'
        textColor='white'
        bgColor='bg-dark'
        datas={trending}
        HeaderOptions={TrendingHeader}
        modalToggle={modalToggle}
      />
      {/* ====== End Trending Section ======= */}

      {/* ====== Start Popular Section ====== */}
      <SectionContainer
        title='Popular'
        textColor='#212529'
        bgColor='bg-white'
        datas={popular.map((data) => (
          { ...data, media_type: isPopularActive }
        ))}
        mediaType={isPopularActive}
        scoreBgColor='bg-white'
        scoreTextColor='#212529'
        titleColor='#212529'
        dateColor='#212500'
        boxShadow='inset 0 0 0 1000px rgba(255, 255, 255, .5)'
        onHover={onHover}
        hoverIndex={hoverIndex}
        modalToggle={modalToggle}
        HeaderOptions={PopularHeader}
      />
      {/* ====== End Popular Section ======= */}

      {/* ====== Start Now Playing Section ====== */}
      <SectionContainer
        title='Now Playing'
        textColor='white'
        bgColor='bg-dark'
        datas={nowPlaying}
        modalToggle={modalToggle}
      />
      {/* ====== End Now Playing Section ======= */}
    </>
  )
}

export default LandingPage
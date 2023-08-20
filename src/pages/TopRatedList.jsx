import React, { useEffect, useState } from 'react'
import MovieCard from '../components/MovieCard'
import get from '../api/get'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../components/Loading'

const TopRatedList = (props) => {

  const {
    modalToggle
  } = props

  const [dataList, setDataList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const {
    type,
  } = useParams()

  const getTopRated = async () => {
    try {
      const response = await get.getTopRatedByType(type)
      setDataList(response.data.results)
      setIsLoading(false)
    } catch (error) {

    }
  }

  const navigate = useNavigate()

  useEffect(() => {
    getTopRated()
  }, [type]);

  if (isLoading) {
    return (
      <Loading />
    )
  }

  return (
    <div className='p-5 d-flex flex-column gap-4'>
      <div style={{ cursor: 'pointer' }} className='text-white fs-5' onClick={() => navigate('/')}>
        <span>Back</span>
      </div>
      <div className='text-white'>
        <span>Result for Top Rated {type}.</span>
      </div>
      <div className='text-white d-flex justify-content-center flex-wrap gap-5'>
        {dataList.map((data, index) => (
          <MovieCard
            modalToggle={modalToggle}
            key={data.id}
            index={index}
            data={data}
          />
        ))}
      </div>
    </div>
  )
}

export default TopRatedList
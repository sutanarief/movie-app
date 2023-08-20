import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import get from '../api/get'
import Loading from '../components/Loading'
import MovieCard from '../components/MovieCard'

const List = (props) => {
  const {
    modalToggle
  } = props

  const [dataList, setDataList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const {
    type,
    genreId,
    genreName
  } = useParams()

  const getByGenre = async () => {
    try {
      setIsLoading(true)
      const response = await get.getByGenre(type, genreId)
      setDataList(response.data.results)
      setIsLoading(false)
    } catch (error) {

    }
  }

  const navigate = useNavigate()

  useEffect(() => {
    getByGenre()
  }, [genreName]);

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
        <span>Result for {type} with "{genreName}" genre.</span>
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

export default List
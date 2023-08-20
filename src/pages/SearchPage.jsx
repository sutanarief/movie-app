import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import get from '../api/get'
import Loading from '../components/Loading'
import MovieCard from '../components/MovieCard'

const SearchPage = (props) => {

  const {
    modalToggle
  } = props

  const {
    title
  } = useParams()

  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(true)
  const [dataList, setDataList] = useState([])

  const getSearch = async () => {
    try {
      const response = await get.getSearch(title)
      setDataList(response.data.results)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getSearch()
  }, [title])

  if (isLoading) {
    return (
      <Loading />
    )
  }

  if (dataList.length === 0) {
    return (
      <div
        className='vh-100 d-flex flex-column gap-4 align-items-center justify-content-center'
      >
        <h1 className='text-white'>Can't find anything about "{title}"</h1>
        <div style={{ cursor: 'pointer', maxWidth: 'fit-content' }} className='text-white fs-5' onClick={() => navigate('/')}>
          <span>Back</span>
        </div>
      </div>
    )
  }

  return (
    <div className='p-5 d-flex flex-column gap-4'>
      <div style={{ cursor: 'pointer', maxWidth: 'fit-content' }} className='text-white fs-5' onClick={() => navigate('/')}>
        <span>Back</span>
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

export default SearchPage
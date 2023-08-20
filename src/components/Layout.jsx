import React, { useState } from 'react'
import { Container } from 'reactstrap'
import LandingPage from '../pages/LandingPage'
import get from '../api/get'
import ModalDetail from './ModalDetail'
import { useParams } from 'react-router-dom'

const Layout = ({ Component }) => {
  const {
    type
  } = useParams()
  const [dataDetail, setDataDetail] = useState({})
  const [isOpen, setIsOpen] = useState(false)

  const getDetailMovie = async (id, media) => {
    try {
      const response = await get.getDetailMovie(id, media || type)
      setDataDetail(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const modalToggle = async (data) => {
    try {
      if (!isOpen) {
        await getDetailMovie(data.id, data.media_type)
      } else {
        setDataDetail({})
      }
      setIsOpen(!isOpen)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container fluid className='w-100 bg-dark d-flex flex-column gap-4 justify-content-center'>
      <ModalDetail isOpen={isOpen} modalToggle={modalToggle} detailData={dataDetail} />
      {<Component modalToggle={modalToggle} />}
    </Container>
  )
}

export default Layout
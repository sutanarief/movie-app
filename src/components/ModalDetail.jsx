import React from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import './modal.css'

const ModalDetail = (props) => {
  const {
    isOpen,
    detailData = {},
    modalToggle
  } = props
  return (
    <>
      <Modal className='custom-modal' centered isOpen={isOpen} toggle={modalToggle}>
        <ModalHeader toggle={modalToggle}>{detailData.title || detailData.name}</ModalHeader>
        <ModalBody>
          <div className='video-wrapper'>
            <iframe
              src={`https://www.youtube.com/embed/${detailData?.videos?.results[0]?.key || 'not-found'}`}
              allowFullScreen
            />
          </div>
          <div className='content-wrapper'>
            <div className='d-flex flex-column gap-2'>
              <span className='movie-title p-0 m-0'>{detailData.title || detailData.name}</span>
              <span className='movie-tagline p-0 m-0'><q>{detailData.tagline || detailData.original_title || detailData.original_name}</q></span>
              <div className='genre-wrapper'>
                {detailData?.genres?.map((data, index) => (
                  <span key={index} className='genre'>{data.name}</span>
                ))}
              </div>
            </div>
            <span>
              {detailData.overview}
            </span>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={modalToggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal >
    </>
  )
}

export default ModalDetail
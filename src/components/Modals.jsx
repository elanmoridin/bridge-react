import React,{ useState } from 'react'
import Modal from 'react-modal'
import Comment from './Comment.jsx'

Modal.setAppElement('#root')


export default function Modals() {
    const [modalIsOpen , setModalIsOpen] = useState(false)
    return (
        <div className='modalPage'>  
            <button onClick={()=> setModalIsOpen(true)}>leave comment</button>
            <Modal className='modal' isOpen={modalIsOpen} onRequestClose={()=> setModalIsOpen(false)}>
                <div>
                    <Comment/>
                </div>
                <h6></h6>
            </Modal>
        </div>
    )
}


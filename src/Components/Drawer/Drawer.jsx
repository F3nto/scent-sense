import React from 'react'


const Drawer = ({onClose}) => {
  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform translate-x-full transition-transform
    ease-in-out duration-300">

    <button onClick={onClose}>
        close
    </button>

    </div>
  )
}

export default Drawer
import React from 'react'

const CategoriesModal = ({onClose}) => {
  return (
    <div className='bg-slate-300 w-52 p-4'>
    <button className="close-button" onClick={onClose}>
      Close
    </button>

    <section className='space-y-2'>
      <h2>For Men</h2>
      <h2>For Women</h2>
      <h2>Unisex</h2>
      <h2>Treasure set for Men</h2>
      <h2>Treasure set for Women</h2>
      <h2>Treasure set for Unisex</h2>
    </section>
  </div>
  )
}

export default CategoriesModal
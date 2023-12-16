import React from 'react';
import { useLocation } from 'react-router-dom';

const BlogDetail = () => {
  const location = useLocation();
  const { state: { item } } = location;

  return (
    <div className='max-w-4xl mx-auto'>
      <img
        src={require(`../Assets/images/Blog/${item.img}`)}
        className='object-cover w-full h-80 rounded-md'
        alt=''
      />
      <div className='mt-8'>
        <h1 className='text-3xl font-bold text-comTxt'>{item.title}</h1>
        <p className='mt-4 text-gray-600'>{item.overview}</p>

        {item.details.map((section, index) => (
          <div key={index} className='mt-8'>
            <h2 className='text-xl font-semibold text-gray-800'>{section.sectionTitle}</h2>
            <p className='mt-2 text-gray-600'>{section.sectionContent}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogDetail;
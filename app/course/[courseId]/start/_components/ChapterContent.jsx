"use client"
import React from 'react'
import YouTube from 'react-youtube'
const opts = {
      height: '390',
      width: '640',
      playerVars: {
        autoplay: 0,
      },
    };
import ReactMarkdown from 'react-markdown';

function ChapterContent({chapter,content}) {
  return (
    <div className='p-10'>
      <h2 className='font-medium text-2xl'>
        {chapter?.['Chapter Name']}
      </h2>
      <p className='text-gray-500 text-medium'>{chapter?.['About']}</p>
      <div className='flex justify-center my-6'>
        <YouTube videoId={content?.videoId}
      opts={opts}/>
      </div>
      
      <div>
  {content?.content.map((item, index) => (
    <div key={index} className="mb-4 p-5 bg-slate-50 rounded-lg">
      <h2 className="font-medium text-lg text-black">{item.title}</h2>
      <p className="text-gray-400 text-sm mb-2 whitespace-pre-wrap">{item.description}</p>
      
      {item.code && 
      <div className='p-4 bg-black text-white rounded-md mt-3'>
        <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto">
          <code>{item.code}</code>
        </pre>
        </div>
      }
    </div>
  ))}
</div>

    </div>
  )
}

export default ChapterContent

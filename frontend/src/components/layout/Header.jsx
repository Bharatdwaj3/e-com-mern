import React from 'react'

const Header = () => {
  return (
    <>
      <div className=' h-[900px] w-screen bg-linear-to-t from-sky-100 to-slate-400 p-16'>
         
          <div className='h-80 w-80 relative'>
              <div className="h-30 w-80  absolute top-0">
                <h1 className="mt-10 inset-x-0 -left-4 text-purple-900">FocusFlow</h1>
              </div>
              <div className="h-52 w-[700px]  absolute bottom-0">
                <p className="ml-20 font-sans italic text-blue-900">Stay on top of tasks and unlock your potential with FocusFlow’s clean interface and smart features for effortless productivity.</p>
              </div>
          </div>
        </div>
    </>
  )
}

export default Header
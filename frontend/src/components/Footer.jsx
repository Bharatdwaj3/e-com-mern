import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import React from 'react'

const Footer = () => {
  return (
    <>
       <div className='p-16 w-full h-[500px] bg-gradient-to-t from-blue-100 to-slate-600 absolute bottom-0'>
          <div className=" w-[1200px] h-24 absolute inset-x-0 top-0 ml-20  border-white"></div>
         <div className=" w-[1200px] h-80 absolute inset-20  border-white">
              <div className=" h-full grid grid-flow-col grid-rows-1 grid-cols-6 gap-0">

        <div className="  col-span-2">
          <div className=" h-48 relative">
          <div className=" w-full h-12">
              <h1 className="text-white font-extrabold text-left text-xl font-sans">Notes!!</h1>
            </div>
            <div className=" h-36 w-full absolute bottom-0 left-0">
              <ul className="space-y-2 text-xs text-white font-thin font-serif">
                <div className="flex justify-start">
                  <InstagramIcon fontSize="large"/>
                  <TwitterIcon fontSize="large"/>
                  <FacebookIcon fontSize="large"/>
                </div>
                <li className="text-xl">Phone : 91+ 98753-04467</li>
                <li className="text-xl">Email : FocusFlow@foo.com</li>
              </ul>
            </div>
            </div>
          </div>

        <div className=" h-48 relative">
          <div className=" w-full h-12">
            <h1 className="text-white font-extrabold text-left text-xl font-sans">About</h1>
          </div>
          <div className=" h-36 w-full absolute bottom-0 left-0">
            <ul className="space-y-2 text-xs text-white font-thin font-serif mt-12">
              <li>Serices</li>
              <li>Packages</li>
              <li>Docs</li>
            </ul>
          </div>
        </div>

        <div className=" h-48 relative">
          <div className=" w-full h-12">
            <h1 className="text-white font-extrabold text-left text-xl font-sans">Goals</h1>
          </div>
          <div className=" h-36 w-full absolute bottom-0 left-0">
            <ul className="space-y-2 text-xs text-white font-thin font-serif mt-12">
              <li>Legal</li>
              <li>Community</li>
              <li>Team</li>
            </ul>
          </div>
        </div>

      <div className=" h-48 relative">
          <div className=" w-full h-12">
            <h1 className="text-white font-extrabold text-left text-xl font-sans">Users</h1>
          </div>
          <div className=" h-36 w-full absolute bottom-0 left-0">
            <ul className="space-y-2 text-xs text-white font-thin font-serif mt-12">
              <li>Devlopers</li>
              <li>Freelanceers</li>
              <li>Emtusiasts</li>
              <li>HeathFolk</li>
            </ul>
          </div>
        </div>

        

</div>
         </div>
         <div className=" w-[1200px] h-24 absolute inset-x-0 bottom-0 ml-20 border-t border-white"></div>

    </div>
    </>
  )
}

export default Footer
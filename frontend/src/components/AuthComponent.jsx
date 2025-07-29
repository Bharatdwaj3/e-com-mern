import React,{useEffect} from 'react'
import {useAuth0} from '@auth0/auth0-react'
import {useNavigate} from 'react-router-dom'


const AuthComponent = () => {

    const {isAuthenticated, isLoading, loginWithRedirect, error} = useAuth0()
    const navigate = useNavigate()

    useEffect(()=>{
        if(isAuthenticated && !isLoading){
            navigate("/profile")
        }
    },[isAuthenticated, navigate, isLoading])

    if(isLoading){
        return(
            <div className='flex justify-center items-center min-h-[400px]'>
                 <div className='bg-blue-700 mx-w-md w-full mx-auto p-6 rounded-lg shadow-lg'>
                <h2 className='text-white mb-4 text-xl font-bold'>Loading...</h2>
                <p className='text-blue-100 mb-4'>Checking authentication status</p>
                <div className='animate-pulse'>
                    <div className='h-2 bg-blue-300 rounded mb-2'></div>
                    <div className='h-2 bg-blue-300 rounded w-3/4'></div>
                </div>
            </div>
            </div>
        )
    }
if(error){
    
    return (
            
        <>
        
         <div className='flex justify-center items-center min-h-[400px]'>
                 <div className='bg-red-700 mx-w-md w-full mx-auto p-6 rounded-lg shadow-lg'>
                <h2 className='text-white mb-4 text-xl font-bold'>Authentication</h2>
                <p className='text-blue-100 mb-4'>{error.message}</p>
                <button
                    onClick={()=>window.location.reload()}
                    className='bg-white text-red-700 px-4 py-2 rounded hover:bg-red-500'
                >
                    Try Again
                </button>
            </div>
            </div>
        </>     
    )
}
  return (
    <>   
       <div  className='flex justify-center items-center min-h-[400px]'>
         <div className='bg-amber-700 h-auto w-[800px] m-66 p-6 rounded'>
            <div className='mb-6'>
                <h2 className='text-white text-2xl font-bold mb-2'>Login!!</h2>
                <p className='text-amber-800 mb-4'>Welcome back please sign in</p>
            </div>
            <div className='flex flex-col gap-4'>
                <button
                    className='bg-white text-amber-700 p-3 rounded font-semibold hover:bg-amber-50 transition-colors duration-200'
                    type='button'
                    onClick={()=>loginWithRedirect()}
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading...' : 'Login'}
                </button>
                <button
                    className='bg-transparent border-2 border-white text-white p-3 rounded font-semibold hover:bg-white hover:text-amber-700 transition-colors duration-200'
                    type='button'
                    onClick={()=>loginWithRedirect({
                        authorizationParams:{screen_hint:'signup'}
                    })}
                    isabled={isLoading}
                >
                    {isLoading ? 'Loading...' : 'Resgister'}
                </button>
            </div>
        </div>
       </div>
    </>
  )
}

export default AuthComponent
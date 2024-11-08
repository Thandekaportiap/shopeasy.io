
import { Link } from 'react-router-dom'



export default function NoPage() {
  return (
    <>
    
    <div className="text-center">
    <h1 className="mb-4 text-6xl font-semibold text-red-500">404</h1>
    <p className="mb-4 text-lg text-[white]">Oops! Looks like you're lost.</p>
    <div className="animate-bounce">
      <svg className="mx-auto h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
      </svg>
    </div>
    <p className="mt-4 text-[white]">Let's get you back  <Link to={"/"}><button className='border border-[#67595e] hover:bg-[#67595e] hover:text-white bg-violet-200 py-2 px-5 text-[black] font-bold rounded-md'>Home</button></Link>.</p>
  </div>
</>
  )
}
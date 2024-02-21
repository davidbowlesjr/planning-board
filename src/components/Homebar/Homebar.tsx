import { useState } from "react"

type HomebarProps = {
    flipNavbar: ()=> void
}

export default function Homebar({flipNavbar}:HomebarProps) {

    const [isArrowOpen, setIsArrowOpen] = useState(false)


    function onArrowClick(){
        setIsArrowOpen(!isArrowOpen)
        flipNavbar()
    }


    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap justify-between p-4 relative">
                {isArrowOpen? (
                <button 
                type="button"
                className=" bottom-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={onArrowClick}>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-lisnecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                    <span className="sr-only">Icon description</span>
                </button>
               ):(
                <button 
                type="button"
                className=" bottom-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={onArrowClick}>
                    <svg className="w-5 h-5"  aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-lisnecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                    <span className="sr-only">Icon description</span>
                </button>
               ) }
            </div>
        </nav>
    )
}
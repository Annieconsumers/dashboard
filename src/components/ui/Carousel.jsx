import { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";

  
const Carousel = ({image}) => {

    const [current, setCurrent] = useState(0)
    const autoSlide = true
    const autoSlideInterval = 2000

    const nextSlide = () =>{
        setCurrent(current === image.length -1 ? 0 : current + 1 )
    }

    const prevSlide = () =>{
        setCurrent(current === 0 ? image.length -1 : current - 1)
    }
    
    useEffect(() => {
      if (!autoSlide) return
      const slideInterval = setInterval(nextSlide, autoSlideInterval)
      return () => clearInterval(slideInterval)
    }, [autoSlide, current])
    
  return (
    <div className="main relative  flex items-center border border-gray-300">
        <div className="images">
            {
                image.map((item, index) => current === index && <img key={index} src={item} alt="documents"  className=" h-60 w-60 object-contain" /> )
            }
        </div>
        <div className="buttons absolute flex justify-between w-full text-white">
            <button onClick={() =>prevSlide()} className="prev bg-black/70 py-3 px-1 cursor-pointer">
                <FaChevronLeft/>
            </button>
            <button onClick={()=> nextSlide()} className="next bg-black/70 py-3 px-1 cursor-pointer">
                <FaAngleRight/>
            </button>
        </div>
        <div className="indicators absolute bottom-4 right-0 left-0">
            <div className="flex items-center justify-center gap-1 ">

            {
                image.map((_, i)=> (
                    <div key={i} className={`w-2 h-2 rounded-full bg-black/70 ${current === i ? "p-2": "opacity-50"}`} ></div>
                ))
            }
            </div>
        </div>
    </div>
  )
}

export default Carousel
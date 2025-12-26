import hero from '../assets/images/hero.jpg'
import girl_book2 from '../assets/images/girl_book2.png'
import hero2 from '../assets/images/hero2.png'
import { useNavigate } from "react-router-dom";


function Hero(){

    const navigate = useNavigate();

    function gotosignup() {
        navigate("/signup");
    }
    return(
<div className='py-10 px-20 bg-orange-400'>
            <div className='rounded-4xl bg-white/60 backdrop-blur-lg border border-white/50 shadow-xl flex justify-between'>
                <div className='w-2/5'>
                    <div className='flex flex-col gap-4 text-6xl font-black p-10 uppercase'>
                        <h1>
                            Let's
                        </h1>
                        <h1>
                            explore
                        </h1>
                        <h1>
                            unique
                        </h1>
                        <h1>
                            Library.
                        </h1>
                    </div> 
                    <div className='px-10 text-xl font-normal' >
                        Live for influential and innovative study!
                    </div>
                    <div className='py-4 px-10'>
                        <button onClick={gotosignup} className='bg-orange-500 text-white px-5 py-3 rounded-md font-semibold'>Book Now</button>
                    </div>
                </div>
                <div className='w-3/5 flex justify-center'>
                    <img src={girl_book2} width={275}></img>
                </div>
            </div>
         </div>

    )
}
export default Hero;
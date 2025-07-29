
import {discord, mastadon, reddit, telegram} from '../assets/index'
const Hero_Community = () => {
  return (
    <>
        <div className="mt-48 h-[900px] w-[1469px] ">
            <div className="h-[800px] w-[1150px] ml-[80px] mt-48  relative grid grid-flow-row grid-cols-2 grid-gap-2">
                <div className="h-[300px] w-[500px] bg-gradient-to-r from-red-500 to-orange-500  relative rounded-2xl">
                    <div className="absolute h-full w-full">
                        <div className="absolute h-full w-full">
                            <div className="absolute top-0 h-[40%] w-full flex flex-row">
                                <div className="h-[110px] w-1/3 ">
                                    <img className="w-[90px] h-[90px] rounded-full ml-8 mt-2" src={reddit} alt="?"/>
                                </div>
                                <div className="h-[110px] w-2/3">
                                    <h3 className="font-bold italic mt-12 ml-8">Reddit</h3>
                                </div>
                            </div>
                            <div className="absolute top-[35%] h-[40%] w-full">
                                <p className="ml-12">
                                    Get help, ask questions <br/> and get to know other Obsidian users and their setup! A
                                </p>
                            </div>
                            <div className="absolute bottom-0 h-[40%] w-full">
                                <button className="w-[140px] h-[50px] ml-12 mt-8 rounded-2xl">Press!! </button>
                            
                        </div>
                    </div>
                </div>
            </div>


           <div className="h-[300px] w-[500px] bg-gradient-to-r from-blue-700/50 to-purple-500  relative rounded-2xl">
                <div className="absolute h-full w-full">
                    <div className="absolute h-full w-full">
                        <div className="absolute top-0 h-[40%] w-full flex flex-row">
                            <div className="h-[110px] w-1/3 ">
                                <img className="w-[90px] h-[90px] rounded-full ml-8 mt-2" src={discord} alt="?"/>
                            </div>
                            <div className="h-[110px] w-2/3">
                                <h3 className="font-bold italic mt-12 ml-8">Discord</h3>
                            </div>
                        </div>
                        <div className="absolute top-[35%] h-[40%] w-full">
                            <p className="ml-12">
                                Get help, ask questions <br/> and get to know other Obsidian users and their setup! B
                            </p>
                        </div>
                        <div className="absolute bottom-0 h-[40%] w-full">
                            <button className="w-[140px] h-[50px] ml-12 mt-8 rounded-2xl">Press!! </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-[300px] w-[500px] bg-linear-to-r from-cyan-500 to-blue-500 relative rounded-2xl">
                <div className="absolute h-full w-full">
                    <div className="absolute h-full w-full">
                        <div className="absolute top-0 h-[40%] w-full flex flex-row">
                            <div className="h-[110px] w-1/3 ">
                                <img className="w-[90px] h-[90px] rounded-full ml-8 mt-2" src={telegram} alt="?"/>
                            </div>
                            <div className="h-[110px] w-2/3">
                                <h3 className="font-bold italic mt-12 ml-8">Telegram</h3>
                            </div>
                        </div>
                        <div className="absolute top-[35%] h-[40%] w-full">
                            <p className="ml-12">
                                Get help, ask questions <br/> and get to know other Obsidian users and their setup! C
                            </p>
                        </div>
                        <div className="absolute bottom-0 h-[40%] w-full">
                            <button className="w-[140px] h-[50px] ml-12 mt-8 rounded-2xl">Press!! </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-[300px] w-[500px] bg-gradient-to-r from-indigo-500 to-purple-600 relative rounded-2xl">
                <div className="absolute h-full w-full">
                    <div className="absolute h-full w-full">
                        <div className="absolute top-0 h-[40%] w-full flex flex-row">
                            <div className="h-[110px] w-1/3 ">
                                <img className="w-[90px] h-[90px] rounded-full ml-8 mt-2 bg-cover" src={mastadon} alt="?"/>
                            </div>
                            <div className="h-[110px] w-2/3">
                                <h3 className="font-bold italic mt-12 ml-8">Mastadon</h3>
                            </div>
                        </div>
                        <div className="absolute top-[35%] h-[40%] w-full">
                            <p className="ml-12">
                                Get help, ask questions <br/> and get to know other Obsidian users and their setup! D
                            </p>
                        </div>
                        <div className="absolute bottom-0 h-[40%] w-full">
                            <button className="w-[140px] h-[50px] ml-12 mt-8 rounded-2xl">Press!! </button>
                        </div>
                    </div>
                </div>
            </div>

            
        </div>

        </div>
    </>
  )
}

export default Hero_Community
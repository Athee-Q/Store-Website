import Image from "next/image"
import Right from "../icons/Right"

const Hero = () => {
    return (
        <section className="hero md:mt-4">
            <div className="py-8 :py-12">
                <h1 className="text-4xl font-semibold ">
                    Everything<br/> is better <br/> with a <span className="text-primary">Pizza</span>
                </h1>
                <p className="my-6 text-gray-500 text-sm">
                    Pizza is th missing piece that makes every day complete , a simple yet delicious joy in life
                </p>
                <div className="flex gap-4 text-sm">
                    <button className="bg-primary uppercase flex items-center justify-center gap-2 text-white px-4 py-2 rounded-full text-sm">Order now
                    <Right/>
                    </button>
                    <button className="flex gap-2 py-2 text-gray-600 items-center font-semibold border-0">Learn more
                    <Right/>
                    </button>
                </div>
            </div>
            <div className="relative hidden md:block  ">
                <Image className="drop-shadow-2xl" src={'/pizza.png'} fill={true} alt={'Pizza'} />
            </div>
        </section>
    )
}

export default Hero
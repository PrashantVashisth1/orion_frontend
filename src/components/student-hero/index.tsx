import hero from '../../assets/hero-student.png'
export default function Hero() {
  return (
    <section className="mt-10 ">
      <div className="rounded-2xl mt-12 overflow-hidden shadow-lg">
        <div className="relative h-64 sm:h-80 lg:h-96">
          <img
            src={hero}
            alt="office"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center text-white max-w-2xl px-6">
              <p className="uppercase text-sm underline">From Pre - seed to Post - IPO</p>
              <h1 className="text-2xl sm:text-4xl font-extrabold mt-3">Welcome to the world's largest platform For Students!</h1>
              <p className="mt-2 text-sm">Get started under 10 minutes</p>
              <a
                href="#experience"
                className="inline-block mt-5 bg-white text-black py-2 px-6 rounded-full font-semibold shadow"
              >
                Register
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
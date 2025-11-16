import React from 'react'

const Content = () => {
  return (
    <>
      <div className="min-h-screen bg-black/95 text-white pt-32 pb-96"> 

      
        <section className="max-w-7xl mx-auto text-center px-6">
          <h1 className="text-7xl md:text-9xl font-black leading-tight">
            Everyday<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
              essentials.
            </span><br/>
            <span className="text-white">On fire.</span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-20 mt-32">
            {[
              { name: "Clothing", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800" },
              { name: "Electronics", img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800" },
              { name: "Daily Essential", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800" }
            ].map((cat) => (
              <div key={cat.name} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-3xl mb-8 shadow-2xl">
                  <img src={cat.img} alt={cat.name} className="w-full h-96 object-cover group-hover:scale-110 transition duration-500"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <h3 className="absolute bottom-10 left-1/2 -translate-x-1/2 text-6xl font-black text-orange-400 drop-shadow-2xl">
                    {cat.name}
                  </h3>
                </div>
                <a href="#" className="inline-block px-12 py-6 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full font-bold text-xl hover:scale-110 transition shadow-2xl">
                  Shop Now
                </a>
              </div>
            ))}
          </div>
        </section>

        
        <section className="max-w-7xl mx-auto mt-64 text-center px-6">
          <h2 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400 mb-24">
            Why Millions Shop Here
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-20">
            {["2M+", "190+", "30-day", "24/7"].map((stat, i) => (
              <div key={stat}>
                <div className="text-9xl font-black text-orange-400">{stat}</div>
                <p className="text-2xl text-gray-400 mt-4">
                  {["Orders shipped", "Countries", "Free returns", "Support"][i]}
                </p>
              </div>
            ))}
          </div>
        </section>

     
        <section className="max-w-7xl mx-auto mt-64 text-center px-6">
          <h2 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400 mb-24">
            New Drops This Week
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { img: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800", title: "Summer Heat" },
              { img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800", title: "Tech Drop" },
              { img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800", title: "Carry Pro" }
            ].map((drop) => (
              <div key={drop.title} className="group relative rounded-3xl overflow-hidden shadow-2xl cursor-pointer">
                <img src={drop.img} alt={drop.title} className="w-full h-96 object-cover group-hover:scale-110 transition duration-700"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                <div className="absolute bottom-10 left-10 text-left">
                  <h3 className="text-6xl font-black text-white drop-shadow-2xl">{drop.title}</h3>
                  <p className="text-3xl font-bold text-yellow-400 mt-3">Shop Now →</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </>
  )
}

export default Content
import client1 from "/images/Index/Brand/client-1-copyright.webp";
import client2 from "/images/Index/Brand/client-2-copyright.webp";
import client3 from "/images/Index/Brand/client-3-copyright.webp";
import client4 from "/images/Index/Brand/client-4-copyright.webp";
import client5 from "/images/Index/Brand/client-5-copyright.webp";
import client6 from "/images/Index/Brand/client-6-copyright.webp";

const Brands = () => {

  const clients = [
    { id: 1, image: client1 },
    { id: 2, image: client2 },
    { id: 3, image: client3 },
    { id: 4, image: client4 },
    { id: 5, image: client5 },
    { id: 6, image: client6 },
  ]

  return (
    <>
      <div className='container mx-auto grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-6 gap-10 pb-[8%]'>
        {clients.map((client) => (
          <div key={client.id} className='bg-white h-20 shadow hover:shadow-lg transition-all duration-300 rounded-sm w-ful opacity-20 hover:opacity-100'>
            <img
              src={client.image}
              alt={client.name}
              className='section-image object-contain lg:object-cover'
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default Brands
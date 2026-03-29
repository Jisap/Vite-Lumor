import MainBtn from "../ui/Buttons/MainBtn";

const About = () => {
  const aboutMainImg = "/images/Index/About/about-main-image.jpg";
  const aboutImg1 = "/images/Index/About/about-image01.jpg"
  const aboutImg2 = "/images/Index/About/about-image02.jpg"
  const aboutImg3 = "/images/Index/About/about-image03.jpg"

  return (
    <section id="about" className='about container py-[8%] mx-auto section-container gap-14 min-h-[60vh] flex flex-col lg:flex-row items-center'>
      <div className='about-image rounded-sm w-full lg:w-1/2 max-w-full lg:max-w-125 mx-auto relative overflow-hidden h-[400px] md:h-[500px] lg:h-[600px]'>
        <div className='about-bg-video absolute inset-0 -z-10 h-full w-full'>
          <img
            src={aboutMainImg}
            alt="about-image"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="about-content w-full lg:w-1/2 px-4">
        <span className="title-span">About Us</span>

        <h2 className="heading-1 mb-5">Creative Solutions
          <br />
          by professional Designers
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 xl:gap-8 lg:grid-cols-3 mx-auto mb-14 md:mb-18">
          <div className="image hover:translate-y-3 transition-all duration-300 w-full">
            <img src={aboutImg1} alt="about-image" className="section-image" />
          </div>

          <div className="image hover:translate-y-3 transition-all duration-300 w-full">
            <img src={aboutImg2} alt="about-image" className="section-image" />
          </div>

          <div className="image hover:translate-y-3 transition-all duration-300 w-full">
            <img src={aboutImg3} alt="about-image" className="section-image" />
          </div>

          <MainBtn
            text={"Read More"}
            path="/about"
            className="bg-black! text-white!"
          />
        </div>
      </div>
    </section>
  )
}

export default About
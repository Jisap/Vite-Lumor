import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import TeamData from "../assets/data/TeamData.json"
import PageBanner from "../components/ui/PageBanner"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Mail, Minus, Phone, Plus } from "lucide-react"
import MainBtn from "../components/ui/Buttons/MainBtn"
import SocialIcons from "../components/ui/SocialIcons"
import data from "../assets/data"

gsap.registerPlugin(ScrollTrigger)


const TeamDetails = () => {

  const teamDetailsRef = useRef();
  const [active, setActive] = useState(null);
  const { id } = useParams();
  const team = TeamData.find((team) => team.id === parseInt(id));

  return (
    <>
      <PageBanner
        title="Team Details"
        currentPage="Team Details"
        productName={team.name}
      />

      <div ref={teamDetailsRef} className="container py-[8%] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 mb-10">
          <div className="team-image rounded-sm group overflow-hidden w-full h-auto lg:h-150">
            <img
              src={team.image}
              alt={team.name}
              className="group-hover:scale-110 transition-all duration-200 section-image"
            />
          </div>

          <div className="team-content">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-medium pb-3">
              {team.name}
            </h3>

            <span className="text-2xl text-coffee pb-5 block">
              {team.category}
            </span>

            <p className="text-paragraph leading-relaxed pb-8">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur corporis optio quas! Nemo dolore numquam natus unde, minus quo explicabo eveniet assumenda illo eligendi dolorem tempora dignissimos quasi, excepturi molestiae.
            </p>

            <ul className="space-y-2 pb-8">
              <li>
                <span className="font-semibold text-lg">Age: </span>
                <span className="text-muted">{team.age}</span>
              </li>

              <li>
                <span className="font-semibold text-lg">Experience: </span>
                <span className="text-muted">{team.Experience}</span>
              </li>

              <li>
                <span className="font-semibold text-lg">Specialization: </span>
                <span className="text-muted">{team.Specialization}</span>
              </li>
            </ul>

            <ul className="space-y-2 pb-10">
              <li className="centered-row gap-2">
                <Phone size={25} className="text-coffee-light" />
                <span className="text-muted">{team.mobnumber}</span>
              </li>
              <li className="centered-row gap-2">
                <Mail size={25} className="text-coffee-light" />
                <span className="text-muted">{team.email}</span>
              </li>
            </ul>

            <SocialIcons />
          </div>

          <div className="team-contact-form bg-[#f3f2f2] px-5 py-8 lg:px-8 lg:py-10 rounded-sm lg:col-span-2 xl:col-span-1">
            <h4 className="text-center text-2xl font-medium pb-10">
              Contact me directly
            </h4>

            <form method="post">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full rounded-sm py-4 bg-white px-4 outline-none mb-8"
              />

              <input
                type="email"
                placeholder="Your Email address"
                className="w-full rounded-sm py-4 bg-white px-4 outline-none mb-8"
              />

              <textarea
                placeholder="Message"
                className="w-full rounded-sm py-4 bg-white px-4 outline-none resize-none mb-8 h-40"
              />

              <MainBtn
                type="submit"
                text="Send Message"
                className="w-full! bg-black! text-white! rounded-none! shadow-none!"
              />
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
          <div className="team-about">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-medium pb-3">
              About Me
            </h3>

            <p className="pb-5 text-paragraph">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi excepturi fugiat veniam magni cumque, obcaecati consequatur quasi officia, aliquam omnis illum soluta nostrum velit exercitationem illo, laborum praesentium facilis dolore.
            </p>

            <p className="pb-5 text-paragraph">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi excepturi fugiat veniam magni cumque, obcaecati consequatur quasi officia, aliquam omnis illum soluta nostrum velit exercitationem illo, laborum praesentium facilis dolore.
            </p>

            <MainBtn
              text="Contact Me"
              className="bg-black! text-white! rounded-sm! shadow-none!"
            />
          </div>

          <div className="team-experience">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-medium pb-6">
              Experience
            </h3>

            <ul className="space-y-4">
              {data.experiences.map((item, index) => (
                <li key={index} className="bg-gray-100 overflow-hidden">
                  <div
                    onClick={() => setActive(active === index ? null : index)}
                    className="flex justify-between items-center px-6 py-5 cursor-pointer"
                  >
                    <span className="font-semibold">
                      {item.title}
                    </span>

                    {active === index ? <Minus /> : <Plus />}
                  </div>

                  <div
                    className={`
                      px-6 transition-all duration-500 ease-in-out overflow-hidden
                      ${active === index ? "max-h-40 opacity-100 pb-5" : "max-h-0 opacity-0"}
                    `}
                  >
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="team-skills-form lg:col-span-2 xl:col-span-1">

          </div>
        </div>
      </div>
    </>
  )
}

export default TeamDetails
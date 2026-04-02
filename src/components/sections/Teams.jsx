import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useRef } from "react"
import TeamData from "../../assets/Data/TeamData.json"
import TeamCard from "../ui/Cards/TeamCard";


gsap.registerPlugin(ScrollTrigger);



const Teams = () => {
  return (
    <>
      <div className="bg-light-yellow">
        <div className="container py-[8%] mx-auto px-4">
          <div className="text-center w-full mb-16">
            <span className="title-span">
              Our Team
            </span>

            <h2 className="heading-1 mb-5">
              Popular
              <span className="text-coffe"> Architects</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-10">
            {TeamData.slice(3, 7).map(team => (
              <TeamCard key={team.id} {...team} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Teams
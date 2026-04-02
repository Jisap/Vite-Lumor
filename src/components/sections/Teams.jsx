import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useRef } from "react"
import TeamData from "../../assets/Data/TeamData.json"
import TeamCard from "../ui/Cards/TeamCard";


gsap.registerPlugin(ScrollTrigger);



const Teams = () => {

  const teamRef = useRef();
  const headingRef = useRef();

  useEffect(() => {
    if (!headingRef.current) return;
    if (!teamRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 90%',
          toggleActions: "play reverse play reverse"
        },
      });

      const cards = teamRef.current.querySelectorAll(".team-card");

      gsap.from(cards, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: teamRef.current,
          start: 'top 85%',
          toggleActions: "play reverse play reverse"
        },
      });
    }, teamRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="bg-light-yellow">
        <div className="container py-[8%] mx-auto px-4">
          <div ref={headingRef} className="text-center w-full mb-16">
            <span className="title-span">
              Our Team
            </span>

            <h2 className="heading-1 mb-5">
              Popular
              <span className="text-coffe"> Architects</span>
            </h2>
          </div>

          <div ref={teamRef} className="grid lg:grid-cols-2 xl:grid-cols-4 gap-10">
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
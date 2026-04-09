import PageBanner from '../components/ui/PageBanner'
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useRef } from "react"
import TeamData from "../assets/Data/TeamData.json"
import TeamCard from '../components/ui/Cards/TeamCard'

gsap.registerPlugin(ScrollTrigger);



const Team = () => {

  const teamRef = useRef();


  useEffect(() => {
    if (!teamRef.current) return;

    const ctx = gsap.context(() => {
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
      <PageBanner title="Team" currentPage="Team" />

      <div ref={teamRef} className="container py-[8%] mx-auto px-4">
        <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-10">
          {TeamData.map(team => (
            <TeamCard key={team.id} {...team} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Team
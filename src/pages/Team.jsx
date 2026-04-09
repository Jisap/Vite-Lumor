import PageBanner from '../components/ui/PageBanner'
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useRef, useMemo } from "react"
import TeamData from "../assets/Data/TeamData.json"
import TeamCard from '../components/ui/Cards/TeamCard'

gsap.registerPlugin(ScrollTrigger);

const Team = () => {
  const introRef = useRef();
  const teamRef = useRef();

  const categories = useMemo(() => (
    [...new Set(TeamData.map(t => t.category))]
  ), []);

  // Animación sección intro
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".team-intro-content > *", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".team-intro-content",
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });

      gsap.from(".team-stat", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".team-stats",
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });
    }, introRef);

    return () => ctx.revert();
  }, []);

  // Animación cards
  useEffect(() => {
    if (!teamRef.current) return;

    const ctx = gsap.context(() => {
      const cards = teamRef.current.querySelectorAll(".team-card");
      gsap.from(cards, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: teamRef.current,
          start: "top 85%",
          toggleActions: "play reverse play reverse"
        },
      });
    }, teamRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <PageBanner title="Team" currentPage="Team" />

      {/* Sección Introductoria */}
      <div ref={introRef} className="bg-light-yellow py-[8%]">
        <div className="container mx-auto px-4 text-center">
          <div className="team-intro-content">
            <span className="title-span">Nuestro equipo</span>

            <h2 className="heading-1">
              Las personas detrás de{" "}
              <span className="text-coffee">cada proyecto</span>
            </h2>

            <p className="pera-text max-w-2xl mx-auto">
              Un equipo de diseñadores, arquitectos y creativos apasionados
              por transformar espacios en experiencias únicas e inolvidables.
            </p>

            <div className="team-stats flex justify-center gap-12 mt-4">
              <div className="team-stat text-center">
                <p className="text-4xl lg:text-5xl font-semibold text-heading">
                  {TeamData.length}<span className="text-coffee">+</span>
                </p>
                <p className="text-sm uppercase tracking-widest text-muted mt-1">
                  Miembros
                </p>
              </div>

              <div className="w-px bg-coffee/30 self-stretch" />

              <div className="team-stat text-center">
                <p className="text-4xl lg:text-5xl font-semibold text-heading">
                  {categories.length}<span className="text-coffee">+</span>
                </p>
                <p className="text-sm uppercase tracking-widest text-muted mt-1">
                  Especialidades
                </p>
              </div>

              <div className="w-px bg-coffee/30 self-stretch" />

              <div className="team-stat text-center">
                <p className="text-4xl lg:text-5xl font-semibold text-heading">
                  10<span className="text-coffee">+</span>
                </p>
                <p className="text-sm uppercase tracking-widest text-muted mt-1">
                  Años de experiencia
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid del equipo */}
      <div ref={teamRef} className="container py-[8%] mx-auto px-4">
        <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-10">
          {TeamData.map(team => (
            <TeamCard key={team.id} {...team} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Team;
import { MoveRight } from "lucide-react"
import { Link } from "react-router-dom"




const WorkCard = ({ id, title, image, number }) => {
  return (
    <>
      <Link to={`/work/${id}`} className="service-card overflow-hidden group relative">
        <div className="service-image w-full overflow-hidden rounded-sm">
          <img src={image} alt={title} className="section-image group-hover:scale-110 transition-all duration-300" />
        </div>

        <div className="service-info flex justify-between items-center py-5">
          <div className="flex items-center gap-3 text-2xl font-medium transition-all duration-300">
            <span className="text-coffee">{number}</span>
            <h3 className="group-hover:text-coffee transition-colors duration-300">{title}</h3>
          </div>
          <div className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            <MoveRight className="text-coffee" size={28} />
          </div>
        </div>
      </Link>
    </>
  )
}

export default WorkCard
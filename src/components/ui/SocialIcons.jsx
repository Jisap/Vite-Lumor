import { Dribbble, Facebook, Instagram, Twitter } from "lucide-react"
import { Link } from "react-router-dom"



const SocialIcons = () => {

  const socials = [
    { icon: <Facebook />, link: "https://facebook.com", gradient: "from-blue-600 to-blue-400" },
    { icon: <Twitter />, link: "https://x.com", gradient: "from-sky-400 to-sky-600" },
    { icon: <Instagram />, link: "https://dribble.com", gradient: "from-pink-600 to-pink-400" },
    { icon: <Dribbble />, link: "https://instagram.com", gradient: "from-yellow-600 via-pink-500 to-purple-600" },
  ]

  return (
    <>
      <ul className="flex space-x-5 relative">
        {socials.map((social, index) => (
          <li key={index} className="w-12 h-12 rounded-sm overflow-hidden">
            <Link
              to={social.link}
              className={`
                flex justify-center items-center w-full h-full text-white transform transition duration-500 bg-linear-to-r
                ${social.gradient} hover:rotate-y-180 hover:scale-110
              `}
            >
              {social.icon}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default SocialIcons
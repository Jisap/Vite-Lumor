import { MoveUp } from "lucide-react"
import { useEffect, useState } from "react"





const ScrollToTop = () => {

  const [visible, setVisible] = useState();

  const toggleVisibility = () => {
    window.scrollY > 300 ? setVisible(true) : setVisible(false);
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [])

  return (
    <>
      {visible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 bg-primary text-white p-3 rounded-sm shadow-lg hover:bg-coffe-light transition-all duration-300 hover:text-black cursor-pointer"
        >
          <MoveUp />
        </button>
      )}
    </>
  )
}

export default ScrollToTop
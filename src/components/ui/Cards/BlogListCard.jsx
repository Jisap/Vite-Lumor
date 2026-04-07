import { Navigate, useNavigate } from "react-router-dom"


const BlogListCard = ({ blog }) => {

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/blogs/${blog.id}`);
  }

  return (
    <>
      <div className="blog-card flex flex-col lg:flex-row gap-8 bg-white shadow-lg rounded-sm group p-5 lg:p-2 recent-item">
        <div className="lg:w-1/2 w-full overflow-hidden rounded-sm">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-all duration-300"
          />
        </div>

        <div className="lg:w-1/2 w-full flex flex-col justify-center py-5">
          <span className="bg-primary text-white px-3 py-1 rounded-sm text-sm w-fit">
            {blog.category}
          </span>

          <span className="text-2xl sm:text-2xl font-medium mt-5 mb-6">
            {blog.title}
          </span>

          <p className="line-clamp-2 mb-6 text-gray-600">
            {blog.description}
          </p>

          <div className="w-8 h-[0.75px] bg-black mb-6"></div>

          <ul className="flex to-gray-500 mb-6">
            <li className="mr-2">
              {blog.date} •
            </li>
            <li>
              {blog.comments}
            </li>
          </ul>

          <button
            onClick={() => handleNavigate()}
            className="bg-primary text-white px-6 py-2 w-fit hover:bg-black transition cursor-pointer"
          >
            read More
          </button>
        </div>
      </div>
    </>
  )
}

export default BlogListCard
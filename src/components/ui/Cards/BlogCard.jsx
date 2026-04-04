import { Link } from "react-router-dom"



const BlogCard = ({ image, title, date, category, id }) => {
  return (
    <>
      <div className='blog-item w-full group'>
        <Link to={`/blog/${id}`} className="mb-10 block">
          <div className="blog-image w-full overflow-hidden rounded-sm">
            <img src={image} alt="post-image" className="section-image group-hover:scale-110 transition-all duration-300" />
          </div>
        </Link>

        <Link to={`/blog/${id}`}>
          <div className="blog-content pt-8">
            <div className="post_meta">
              <span className="post-cat uppercase font-semibold text-[14px] relative">
                {category} ·
              </span>

              <span className="post-date text-sm text-gray-500">
                {date}
              </span>
            </div>

            <h4 className="text-2xl font-semibold leading-snug text-heading">
              {title}
            </h4>
          </div>

        </Link>
      </div>
    </>
  )
}

export default BlogCard
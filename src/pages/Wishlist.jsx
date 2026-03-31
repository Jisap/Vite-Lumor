

const Wishlist = () => {
  return (
    <>
      <div className="container mx-auto pt-32 pb-10 text-black min-h-screen">
        <h1 className="text-4xl font-bold mb-8">My Wishlist</h1>
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-gray-200 rounded-lg">
          <p className="text-gray-500 text-lg italic">Your wishlist is currently empty.</p>
        </div>
      </div>
    </>
  )
}

export default Wishlist
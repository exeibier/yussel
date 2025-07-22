import Image from "next/image"
import Link from "next/link"

const categories = [
  {
    id: "commercial",
    name: "Commercial",
    image: "/work/commercial/commercial002.jpg?height=400&width=600",
    gridClass: "md:col-span-4 md:row-span-1",
    transform: "md:-rotate-1",
    height: "h-64 md:h-80",
  },
  {
    id: "dj",
    name: "DJ",
    image: "/work/dj/dj002.jpg?height=500&width=700",
    gridClass: "md:col-span-3 md:col-start-6 md:row-span-1",
    transform: "md:rotate-2",
    height: "h-64 md:h-96",
    marginClass: "md:mt-8",
  },
  {
    id: "documental",
    name: "Documental",
    image: "/work/documental/documental002.jpg?height=500&width=700",
    gridClass: "md:col-span-5 md:col-start-4 md:row-start-2",
    transform: "md:rotate-1",
    height: "h-64 md:h-96",
  },
  {
    id: "music",
    name: "Music Photography",
    image: "/work/music/music002.jpg?height=300&width=400",
    gridClass: "md:col-span-3 md:col-start-1 md:row-start-2",
    transform: "md:-rotate-3",
    height: "h-48 md:h-64",
    marginClass: "md:mt-12",
    hideOnMobile: true,
  },
  {
    id: "portrait",
    name: "Portrait",
    image: "/work/portrait/portrait002.jpg?height=350&width=300",
    gridClass: "md:col-span-2 md:col-start-10 md:row-start-1",
    transform: "md:rotate-3",
    height: "h-40 md:h-96",
    marginClass: "md:mt-4",
    hideOnMobile: true,
  },
  {
    id: "skate",
    name: "Skate",
    image: "/work/skate/skate002.jpg?height=250&width=350",
    gridClass: "md:col-span-2 md:col-start-10 md:row-start-2",
    transform: "md:-rotate-2",
    height: "h-32 md:h-48",
    marginClass: "md:mt-20",
    hideOnMobile: true,
  },
  {
    id: "tattoo",
    name: "Tattoo",
    image: "/work/tattoo/tattoo002.jpg?height=300&width=400",
    gridClass: "md:col-span-3 md:col-start-1 md:row-start-3",
    transform: "md:rotate-1",
    height: "h-48 md:h-56",
    marginClass: "md:mt-4",
    hideOnMobile: true,
  },
]

export default function OffsetPhotoGrid() {
  return (
    <div className="min-h-screen bg-sky-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">Portfolio</h1>
          <p className="text-lg md:text-xl text-gray-800 max-w-2xl mx-auto">
            Explore my photography through different categories and styles
          </p>
        </div>

        {/* Main Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 min-h-[80vh]">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/${category.id}`}
              className={`${category.gridClass} ${category.hideOnMobile ? "hidden md:block" : ""} relative group cursor-pointer`}
            >
              <div
                className={`relative ${category.height} w-full transform ${category.transform} group-hover:rotate-0 transition-all duration-500 ${category.marginClass || ""}`}
              >
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  fill
                  className="object-cover rounded-lg shadow-lg transition-all duration-500 group-hover:shadow-2xl"
                />

                {/* Overlay */}
                <div className="absolute inset-0 opacity-0 bg-black  group-hover:opacity-60 transition-all duration-300 rounded-lg flex items-center justify-center">
                  <div className="transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <h3 className="text-white text-xl md:text-2xl font-bold text-center px-4">{category.name}</h3>
                    <div className="w-12 h-0.5 bg-white mx-auto mt-2 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 delay-100"></div>
                  </div>
                </div>

                {/* Corner accent */}
                <div className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200"></div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile Grid for Hidden Categories */}
        <div className="md:hidden mt-8 space-y-6">
          {categories
            .filter((cat) => cat.hideOnMobile)
            .map((category, index) => (
              <Link key={category.id} href={`/${category.id}`} className="block group cursor-pointer">
                <div
                  className={`relative h-48 w-full transform ${index % 2 === 0 ? "-rotate-1" : "rotate-2"} group-hover:rotate-0 transition-all duration-500`}
                >
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-cover rounded-lg shadow-lg transition-all duration-500 group-hover:shadow-2xl"
                  />

                  {/* Mobile Overlay */}
                  <div className="absolute inset-0 opacity-0 bg-black  group-hover:opacity-60 transition-all duration-300 rounded-lg flex items-center justify-center">
                    <div className="transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <h3 className="text-white text-xl font-bold text-center px-4">{category.name}</h3>
                      <div className="w-12 h-0.5 bg-white mx-auto mt-2 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 delay-100"></div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 right-10 w-4 h-4 bg-white rounded-full opacity-60 hidden lg:block animate-pulse"></div>
        <div className="absolute bottom-32 left-16 w-6 h-6 bg-white rounded-full opacity-40 hidden lg:block animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-white rounded-full opacity-80 hidden lg:block animate-pulse delay-500"></div>
      </div>
    </div>
  )
}

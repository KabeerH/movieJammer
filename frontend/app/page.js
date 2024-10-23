'use client';
import Particles from "@/components/ui/particles";
import Link from "next/link";

export default function Home() {
  return (
    <div>
        {/* Welcome Section */}
      <section className="relative h-screen overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
      <div className="text-center text-white z-10">
        <h1 className="text-6xl font-extrabold text-purple-300 mb-4">
          Welcome to MovieJaMMer!
        </h1>
        <p className="text-2xl mb-6">
          Discover your favorite movies/DVDs!
        </p>
        <Link href="#aboutSection">
          <button className="bg-purple-600 text-white px-8 py-4 rounded-full shadow-lg transform transition-all hover:scale-110 hover:bg-purple-700">
            Learn more about me!
          </button>
        </Link>
      </div>
    </section>

      {/* Particles */}
      <Particles 
        className="absolute inset-0 z-0" 
        quantity={150} 
        ease={100} 
        color="#FF8C00"
        shape="circle"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.7)', 
        }}
        refresh
      />

      {/* About Section */}
      <section id="aboutSection" className="py-20 bg-gray-800">
        <div className="container mx-auto px-6 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="w-64 h-64 mb-6 md:mb-0">
              <img
                src="profilePic.jpg"
                alt="Profile"
                className="rounded-full object-cover w-full h-full shadow-lg"
              />
            </div>
            <div className="text-white md:w-2/3 mt-7">
              <p className="text-lg text-gray-300 mb-4">
                Hello! My name is <strong>Kabeer Harjani</strong>, and I am currently pursuing a <span className="font-semibold"><Link href="https://www.senecapolytechnic.ca/programs/fulltime/BSD.html" target="_blank" className="text-indigo-400 hover:text-indigo-500">Bachelor of Technology in Software Development</Link></span> at <span className="italic"><Link href="https://www.senecacollege.ca/" target="_blank" className="text-indigo-400 hover:text-indigo-500">Seneca Polytechnic</Link></span>. My passion for <span className="italic">technology</span> and <span className="italic">problem-solving</span> has driven me to this field, where I continuously seek to expand my knowledge and adapt to new technologies.
              </p>
              <p className="text-lg text-gray-300 mb-4">
                Through my academic journey, I have gained a solid foundation in <span className="font-semibold">software development principles</span> and practices. Additionally, I actively engage in <span className="font-semibold">personal projects</span>, honing my <span className="italic">analytical abilities</span> and teamwork skills. I am eager to contribute to the <span className="font-semibold">tech industry</span> and excited about the opportunities ahead.
              </p>
              <p className="text-lg text-gray-300 mb-4">
                I believe that <span className="font-semibold">continuous learning</span> is the key to growth in this ever-evolving field, and I am committed to leveraging my skills and knowledge to make a positive impact in the industry.
              </p>
              <Link href="/KabeerHarjani_Resume.pdf" target="_blank">
                <button className="bg-indigo-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-indigo-700 transition duration-300">
                  View My Resume
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Projects Section */}
      <section id="projectsSection" className="py-16 bg-gray-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-12">Check Out These Other Cool Projects...</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project 1 */}
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="p-6">
                <div className="relative">
                  <img
                    src="/senecaLibrary.png"
                    alt="Project 1"
                    className="w-full h-48 object-cover rounded-lg border-4 border-gray-600 "
                  />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4 mt-3">Seneca Library Application</h3>
                <p className="text-gray-300 mb-6">
                  Upon arrival at the Seneca library, all books and other resources are systematically labeled and placed in an orderly manner on the shelves for convenience.
                  I’ve engineered a digital solution that catalogs these resources into the system, capturing all the necessary details for easy location in the future.
                  This console based system also enables library patrons to borrow these resources, each assigned with a specific date for return. If not returned on time
                  then a appropriate fee is charged!
                </p>
                <Link href="https://github.com/KabeerH/seneca_library" target="_blank" className="text-indigo-500 hover:underline transition duration-300">Learn More</Link>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="p-6">
                <div className="relative">
                  <img
                    src="/assembly.png"
                    alt="Project 2"
                    className="w-full h-48 object-cover rounded-lg border-4 border-gray-600 "
                  />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4 mt-3">Assembly Line Simulation</h3>
                <p className="text-gray-300 mb-6">
                 This project involves an assembly line with multiple workstations, each holding specific stock items. Customer orders, consisting of a list of items, 
                 are moved along the line by a line manager. Each station processes orders from a queue, filling an order if it requests the station’s item and the 
                 item is in stock. The line manager continues moving orders until all are processed. If a station runs out of stock, it can’t fill more orders. At the end,
                 orders are either completed or incomplete due to insufficient inventory. The simulator lists both completed and incomplete orders after all orders have 
                 been processed.</p>
                <Link href="https://github.com/KabeerH/assembly_line_sim" target="_blank" className="text-indigo-500 hover:underline transition duration-300">Learn More</Link>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="p-6">
                <div className="relative">
                  <img
                    src="/reservation_system.png"
                    alt="Project 3"
                    className="w-full h-48 object-cover rounded-lg border-4 border-gray-600"
                  />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4 mt-3">Restaurant Reservation System</h3>
                <p className="text-gray-300 mb-6">
                 This project is a cloud-based restaurant reservation system designed to help individuals manage, update, and cancel reservations for a restaurant system.
                 The system allows users to create new reservations, update pre-existing reservations, and delete (cancel) reservations. Before making a reservation 
                 to their desired restaurant, users are required to register for an account. Unlike traditional restaurant reservation systems, this system asks the 
                 user to register for an account, giving the user access to multiple restaurants.</p>
                <Link href="https://github.com/KabeerH/Cloud-Based-Restaurant-Reservation-System" target="_blank" className="text-indigo-500 hover:underline transition duration-300">Learn More</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

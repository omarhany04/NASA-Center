import React from "react";

const AboutPage = () => {
  return (
    
    <div className="container mx-auto p-5 text-gray-200">
      <h1 className="text-4xl font-bold text-center mb-5">About NASA</h1>
      <div className="flex justify-center">
        <img 
          src="https://www.nasa.gov/wp-content/uploads/2015/06/edu_what_is_nasa_emblem.jpg" 
          alt="NASA Logo" 
          className="w-48 mb-5"
        />
        
      </div>
      <p className="text-lg leading-7 mb-5">
        The National Aeronautics and Space Administration (NASA) was established on July 29, 1958, 
        and officially opened on October 1, 1958. It was created in response to the Soviet Union’s 
        launch of Sputnik, the first artificial satellite. NASA has since led U.S. efforts in space 
        exploration, aeronautics research, and technological innovation.
      </p>
      <h2 className="text-2xl font-semibold mt-5">NASA's Mission and Vision</h2>
      <p className="mt-3 text-lg">
        NASA's mission is to pioneer the future in space exploration, scientific discovery, and aeronautics research. 
        Its vision is to reach new heights and reveal the unknown for the benefit of humanity.
      </p>
      
      <h2 className="text-2xl font-semibold mt-5">Key NASA Missions</h2>
      <div className="mt-3 space-y-5">
        <div>
          <h3 className="text-xl font-bold">Apollo 11 (1969)</h3>
          <div className="flex justify-center">
            <img src="https://ichef.bbci.co.uk/news/1024/cpsprodpb/3566/production/_107807631_79ab055d-47b5-4568-b597-f5548a9e7245.jpg.webp" 
              alt="Apollo 11 Moon Landing" 
              className="w-2/3 rounded-md mt-2" />
          </div>
          <p className="mt-2">Apollo 11 was the first crewed mission to land on the Moon. On July 20, 1969, 
          Neil Armstrong and Buzz Aldrin became the first humans to walk on the lunar surface.</p>
        </div>
        <div>
          <h3 className="text-xl font-bold">Mars Rover Missions</h3>
          <div className="flex justify-center">
            <img src="https://technetics.com/wp-content/uploads/2021/04/Mars-Perseverence-Rover1-2048x771.jpg" 
              alt="Perseverance Rover" 
              className="w-2/3 rounded-md mt-2" />
          </div>
          <p className="mt-2">NASA’s Mars rovers, including Spirit, Opportunity, Curiosity, and Perseverance, 
          have explored the Red Planet, studying its surface and searching for signs of past life.</p>
        </div>
        <div>
          <h3 className="text-xl font-bold">James Webb Space Telescope (2021)</h3>
          <div className="flex justify-center">
            <img src="https://cdn.mos.cms.futurecdn.net/z8sf5yaERm5hCoeAaikmSX-970-80.jpg.webp"
              alt="James Webb Space Telescope" 
              className="w-2/3 rounded-md mt-2" />
          </div>
          <p className="mt-2">Launched in 2021, the James Webb Space Telescope is NASA’s most advanced telescope, 
          designed to observe distant galaxies and uncover the secrets of the universe.</p>
        </div>
        <div>
        <h3 className="text-xl font-bold">Voyager Program (1977)</h3>
        <div className="flex justify-center gap-4 mt-2">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Titan_3E_Centaur_launches_Voyager_2.jpg" 
            alt="Voyager 2 Launch" 
            className="w-1/3 rounded-md" 
           />
         <img 
            src="https://nssdc.gsfc.nasa.gov/image/spacecraft/voyager.jpg" 
            alt="Voyager Spacecraft Model" 
            className="w-1/3 rounded-md" 
            />
        </div>
        <p className="mt-2">
         Voyager 1 and Voyager 2 were launched in 1977 to explore the outer planets. 
         Voyager 1 became the first human-made object to enter interstellar space.
        </p>
        </div>
        <div>
          <h3 className="text-xl font-bold">Hubble Space Telescope (1990)</h3>
          <div className="flex justify-center">
            <img src="https://science.nasa.gov/wp-content/uploads/2023/04/27946391011_d40ff10573_h-jpg.webp" 
              alt="Hubble Space Telescope" 
              className="w-2/3 rounded-md mt-2" />
          </div>
          <p className="mt-2">Launched in 1990, the Hubble Space Telescope has provided breathtaking images 
          of the universe, helping scientists understand the cosmos.</p>
        </div>
        <div>
          <h3 className="text-xl font-bold">Artemis Program (Ongoing)</h3>
          <div className="flex justify-center">
            <img src="https://www.nasa.gov/wp-content/uploads/2022/11/nhq202211160203.jpg" 
              alt="Artemis Rocket Launch" 
              className="w-2/3 rounded-md mt-2" />
          </div>
          <p className="mt-2">The Artemis program aims to return humans to the Moon and establish a sustainable 
          presence, serving as a stepping stone for future Mars missions.</p>
        </div>
      </div>
      
      
      <h2 className="text-2xl font-semibold mt-5">Current and Future Missions</h2>
      <p className="mt-3 text-lg">
        NASA continues to push the boundaries of space exploration. Some of its current and future projects include:
      </p>
      <ul className="list-disc list-inside mt-3 text-lg">
        <li><strong>Artemis Program:</strong> Aims to return humans to the Moon by 2025 and establish a long-term lunar presence.</li>
        <li><strong>Europa Clipper:</strong> Scheduled for the 2030s, this mission will investigate the possibility of life on Jupiter's moon Europa.</li>
        <li><strong>Dragonfly Mission:</strong> Set to launch in 2027, this mission will send a drone to explore Saturn’s moon Titan.</li>
        <li><strong>NASA's Mars Sample Return:</strong> A project to bring Martian soil back to Earth for detailed study.</li>
      </ul>
      
      <h2 className="text-2xl font-semibold mt-5">NASA's Impact on Technology and Society</h2>
      <p className="mt-3 text-lg">
        NASA's innovations extend beyond space exploration. Many everyday technologies originate from NASA research, including:
      </p>
      <ul className="list-disc list-inside mt-3 text-lg">
        <li>Memory foam, initially developed for aircraft seats.</li>
        <li>Water purification systems used in remote areas and disaster relief efforts.</li>
        <li>Scratch-resistant lenses for eyeglasses.</li>
        <li>Satellite GPS technology that enables modern navigation systems.</li>
      </ul>
      
      <p className="mt-5 text-lg">NASA remains committed to advancing science and technology, inspiring the next generation of explorers, and 
      uncovering the mysteries of the universe.</p>
    </div>
  );
};

export default AboutPage;
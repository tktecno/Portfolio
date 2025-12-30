
import React, { useEffect, useRef, useState } from "react";
import { Intro } from "./Intro";
import { Img } from "./Img";
import { Link } from "react-router-dom";

function Reveal({ children }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          // observer.disconnect();
        }
        else {
          setVisible(false);
        }
      },
      { threshold: 0.25, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  });




  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
    >
      {children}
    </div>
  );
}


export default function Portfolio() {



  const [skills, setSkills] = useState([
    { skill: "JavaScript", icon: "https://img.icons8.com/color/48/javascript--v1.png" },
    { skill: "C++", icon: "https://img.icons8.com/color/48/c-plus-plus-logo.png" },
    { skill: "React", icon: "https://img.icons8.com/color/48/react-native.png" },
    { skill: "Next.js", icon: "https://img.icons8.com/fluency-systems-filled/48/ffffff/nextjs.png" },
    { skill: "Express", icon: "./icons8-express-js-96.png" },
    { skill: "MongoDB", icon: "https://img.icons8.com/color/48/mongodb.png" },
    { skill: "MySQL", icon: "https://img.icons8.com/color/48/mysql-logo.png" },
    { skill: "PostgreSQL", icon: "https://img.icons8.com/color/48/postgreesql.png" },
    { skill: "Drizzle", icon: "https://img.icons8.com/office/48/rain.png" },
    { skill: "Docker", icon: "https://img.icons8.com/color/48/docker.png" },
  ]);
  
  

  return (
    <>
    <Intro/>
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-purple-50 text-gray-800 dark:bg-gradient-to-b dark:from-gray-900 dark:via-gray-900 dark:to-black dark:text-gray-100 font-sans">
      {/* Header */}
      <header className="w-full sticky top-0 bg-white/70 dark:bg-gray-900 backdrop-blur border-b dark:border-gray-700 z-20 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/">
            <h1 className="text-2xl font-bold">Tapash Roy</h1>
          </a>
          <nav className="space-x-6">
            <a href="#about" className="hover:text-blue-600">About</a>
            <a href="#skills" className="hover:text-blue-600">Skills</a>
            <a href="#projects" className="hover:text-blue-600">Projects</a>
            <a href="#contact" className="hover:text-blue-600">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 py-24 text-center">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="w-72 h-72 bg-blue-300/20 blur-3xl rounded-full absolute top-10 left-10 animate-pulse" />
          <div className="w-80 h-80 bg-purple-300/20 blur-3xl rounded-full absolute bottom-10 right-10 animate-pulse" />
        </div>

        {/* Profile Photo */}
        <div className="w-28 h-28 mx-auto mb-6 rounded-2xl overflow-hidden border shadow-[-6px_-6px_14px_rgba(0,0,0,0.04),6px_6px_14px_rgba(0,0,0,0.14)] dark:shadow-[-6px_-6px_14px_rgba(255,255,255,0.03),6px_6px_14px_rgba(0,0,0,0.4)] bg-white/70 dark:bg-gray-800/70 backdrop-blur">
          <Img/>
        </div>

        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Full‑Stack Web Developer</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          A passionate Web Developer who loves building modern, responsive, and user‑friendly web applications.
        </p>
        <div className="mt-8 flex gap-4 justify-center">
          <a href="#projects" className="px-6 py-3 rounded-2xl shadow font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-xl hover:scale-105 transition-transform duration-200">View Projects</a>
          <a href="#contact" className="px-6 py-3 rounded-2xl shadow font-medium border border-blue-400/40 bg-white/80 dark:bg-gray-800/80 hover:bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-xl hover:scale-105 transition-transform duration-200">Contact Me</a>
        </div>
      </section>

      {/* About */}
      <Reveal>
        <section id="about" className="max-w-5xl mx-auto px-6 py-20">
          <h3 className="text-3xl font-bold mb-6">About Me</h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          I’m a Full-Stack Web Developer and job seeker from India with a strong interest in building scalable applications and great user experiences. I enjoy working across both frontend and backend, exploring modern web technologies, and constantly improving my skills through hands-on projects.

This portfolio is built using React and Tailwind CSS, reflecting my focus on clean design, performance, and responsive interfaces. I’m actively looking for opportunities where I can grow, contribute, and collaborate with a great development team.
          </p>
        </section>
      </Reveal>

      {/* Skills */}
      <Reveal>
        <section id="skills" className="max-w-5xl mx-auto px-6 py-20">
          <h3 className="text-3xl font-bold mb-8">Skills</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {skills.map(({ skill, icon }) => (
              <div
                key={skill}
                className="p-4 rounded-2xl border text-center shadow-sm bg-white/80 dark:bg-gray-800/80 hover:shadow-md transition flex justify-evenly items-center"
              >

                <img src={icon} className="w-6 flex justify-center items-center" alt={skill + 'logo'}/> <span className="text-xl flex justify-center items-center">{skill}</span>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Projects */}
      <Reveal>
        <section id="projects" className="max-w-5xl mx-auto px-6 py-20">
          <h3 className="text-3xl font-bold mb-8">Mini Projects & Learning Work</h3>

          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mb-8">
            I’m early in my developer journey — here are some small but meaningful things I’ve built while learning.
            I focus on clean UI, responsive design, and real‑world fundamentals.
          </p>

          <div className="grid md:grid-cols-2 gap-6">


          <div className="rounded-2xl border p-6 transition-transform duration-200 bg-white/80 dark:bg-gray-800/80 backdrop-blur shadow-[-8px_-8px_18px_rgba(0,0,0,0.04),8px_8px_18px_rgba(0,0,0,0.12)] hover:shadow-[-10px_-10px_22px_rgba(0,0,0,0.06),10px_10px_22px_rgba(0,0,0,0.16)] hover:-translate-y-1">
              <h4 className="text-xl font-semibold mb-2">Restaurant Menu </h4>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
              A restaurant menu interface showcasing category-based food items with a clean design and smooth user experience.
              </p>
              <div className="text-sm text-gray-500 mb-3">React • CSS</div>
              Source Code - 
              <a href="https://github.com/tktecno/Food-Blog-Application" target="_blank" className=" py-1 px-2 shadow-sm hover:shadow-gray-700 hover:bg-slate-500 shadow-white rounded-lg "> GitHub</a>
            </div>
            <div className="rounded-2xl border p-6 transition-transform duration-200 bg-white/80 dark:bg-gray-800/80 backdrop-blur shadow-[-8px_-8px_18px_rgba(0,0,0,0.04),8px_8px_18px_rgba(0,0,0,0.12)] hover:shadow-[-10px_-10px_22px_rgba(0,0,0,0.06),10px_10px_22px_rgba(0,0,0,0.16)] hover:-translate-y-1">
              <h4 className="text-xl font-semibold mb-2"> Hide Here </h4>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
              A lightweight, privacy-focused tool for saving links, notes, todos, and text for quick access anytime.
              </p>
              <div className="text-sm text-gray-500 mb-3">React • CSS • Ejs • Express • Drizzle • Jwt </div>
              Source Code - 
              <a href="https://github.com/tktecno/Hide-Here" target="_blank" className=" py-1 px-2 shadow-sm hover:shadow-gray-700 hover:bg-slate-500 shadow-white rounded-lg "> GitHub</a>
            </div>
            <div className="rounded-2xl border p-6 transition-transform duration-200 bg-white/80 dark:bg-gray-800/80 backdrop-blur shadow-[-8px_-8px_18px_rgba(0,0,0,0.04),8px_8px_18px_rgba(0,0,0,0.12)] hover:shadow-[-10px_-10px_22px_rgba(0,0,0,0.06),10px_10px_22px_rgba(0,0,0,0.16)] hover:-translate-y-1">
              <h4 className="text-xl font-semibold mb-2"> Todo App </h4>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
              A responsive todo application built to practice state management, UI design, and interactive features.
              </p>
              <div className="text-sm text-gray-500 mb-3">React • CSS </div>
              Source Code - 
              <a href="https://github.com/tktecno/Todo-App" target="_blank" className=" py-1 px-2 shadow-sm hover:shadow-gray-700 hover:bg-slate-500 shadow-white rounded-lg "> GitHub</a>
            </div>

            <div className="rounded-2xl border p-6 transition-transform duration-200 bg-white/80 dark:bg-gray-800/80 backdrop-blur shadow-[-8px_-8px_18px_rgba(0,0,0,0.04),8px_8px_18px_rgba(0,0,0,0.12)] hover:shadow-[-10px_-10px_22px_rgba(0,0,0,0.06),10px_10px_22px_rgba(0,0,0,0.16)] hover:-translate-y-1">
              <h4 className="text-xl font-semibold mb-2">Personal Portfolio Website</h4>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                A responsive portfolio built using React & Tailwind to showcase my skills and growth as a developer.
              </p>
              <div className="text-sm text-gray-500 mb-3">React • Tailwind CSS</div>
            </div>

            <div className="rounded-2xl border p-6 transition-transform duration-200 bg-white/80 dark:bg-gray-800/80 backdrop-blur shadow-[-8px_-8px_18px_rgba(0,0,0,0.04),8px_8px_18px_rgba(0,0,0,0.12)] hover:shadow-[-10px_-10px_22px_rgba(0,0,0,0.06),10px_10px_22px_rgba(0,0,0,0.16)] hover:-translate-y-1">
              <h4 className="text-xl font-semibold mb-2">World Eduhub</h4>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
              An educational website UI designed using core web technologies focusing on clean layout and responsiveness.
              </p>
              <div className="text-sm text-gray-500 mb-3">HTML • CSS • JavaScript</div>
              <div className="flex gap-5"> 
              <a href="https://github.com/tktecno/World-Eduhub" target="_blank" className=" py-1 px-2 shadow-sm hover:shadow-gray-700 hover:bg-slate-500 shadow-white rounded-lg " >Github</a>
              <Link to="/world-eduhub" className=" py-1 px-2 shadow-sm hover:shadow-gray-700 hover:bg-slate-500 shadow-white rounded-lg ">Preview</Link>
              </div>
            </div>

            <div className="rounded-2xl border p-6 transition-transform duration-200 bg-white/80 dark:bg-gray-800/80 backdrop-blur shadow-[-8px_-8px_18px_rgba(0,0,0,0.04),8px_8px_18px_rgba(0,0,0,0.12)] hover:shadow-[-10px_-10px_22px_rgba(0,0,0,0.06),10px_10px_22px_rgba(0,0,0,0.16)] hover:-translate-y-1">
              <h4 className="text-xl font-semibold mb-2">UI Components & Practice Layouts</h4>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                A collection of buttons, cards, forms and layouts created to improve my frontend design skills.
              </p>
              <div className="text-sm text-gray-500 mb-3">HTML • CSS • JavaScript</div>
            </div>

            <div className="rounded-2xl border p-6 transition-transform duration-200 bg-white/80 dark:bg-gray-800/80 backdrop-blur shadow-[-8px_-8px_18px_rgba(0,0,0,0.04),8px_8px_18px_rgba(0,0,0,0.12)] hover:shadow-[-10px_-10px_22px_rgba(0,0,0,0.06),10px_10px_22px_rgba(0,0,0,0.16)] hover:-translate-y-1">
              <h4 className="text-xl font-semibold mb-2">API & Backend Practice</h4>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Practicing building simple APIs and connecting frontend and backend using Node and Express.
              </p>
              <div className="text-sm text-gray-500 mb-3">Node.js • Express</div>
            </div>

            <div className="rounded-2xl border p-6 transition-transform duration-200 bg-white/80 dark:bg-gray-800/80 backdrop-blur shadow-[-8px_-8px_18px_rgba(0,0,0,0.04),8px_8px_18px_rgba(0,0,0,0.12)] hover:shadow-[-10px_-10px_22px_rgba(0,0,0,0.06),10px_10px_22px_rgba(0,0,0,0.16)] hover:-translate-y-1">
              <h4 className="text-xl font-semibold mb-2">More Coming Soon 🚀</h4>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                I’m actively building new projects — this section will keep growing as I learn.
              </p>
            </div>

          </div>
        </section>
      </Reveal>

      {/* Contact */}
      <Reveal>
        <section id="contact" className="max-w-5xl mx-auto px-6 py-20">
          <h3 className="text-3xl font-bold mb-6">Get In Touch</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-6">Send me a message and it will come straight to my email.</p>

          {/* Netlify form */}
          <form
            name="contact"
            method="POST"
            data-netlify="true"
            className="max-w-2xl mx-auto space-y-4 p-6 border rounded-2xl shadow-sm"
          >
            <input type="hidden" name="form-name" value="contact" />

            <div>
              <label className="block text-sm font-medium mb-1">Your Name</label>
              <input
                name="name"
                required
                className="w-full border rounded-xl p-3 outline-none focus:ring"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Your Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full border rounded-xl p-3 outline-none focus:ring"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                name="message"
                required
                rows="4"
                className="w-full border rounded-xl p-3 outline-none focus:ring"
                placeholder="Write your message..."
              />
            </div>

            <button type="submit" className="px-6 py-3 rounded-2xl shadow font-medium bg-blue-600 text-white hover:bg-blue-700 transition">
              Send Message
            </button>
          </form>

          <p className="text-center text-gray-500 mt-4 text-sm">
            Or email me directly at {" "}
            <a className="text-blue-600 hover:underline" href="mailto:troykinger000@gmail.com">
              troykinger000@gmail.com
            </a>
          </p>
        </section>
      </Reveal>

      {/* Footer */}
      <footer className="text-center py-8 border-t dark:border-gray-700">
        <p className="text-gray-500">© {new Date().getFullYear()} tapash roy — All rights reserved.</p>
      </footer>
    </div>
    </>
  );
}
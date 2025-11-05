import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

interface HackathonProject {
  title: string;
  thumbnail: string;
  repo: string;
  devpost: string;
  description: string;
  hackathon: string;
  year: string;
  stack: string[];
}

const projects: HackathonProject[] = [
  {
    title: "Daily Indigest",
    thumbnail: "di.jpg",
    repo: "https://github.com/ruslannnn2/Daily-Indigest",
    devpost: "https://devpost.com/software/daily-indigest",
    description:
      "Won 2nd best Data Visualization. Daily Ingest is an authentic news source directly from the everyday crowd. The data gathered on the Ingest are results of real reactions to real events, sourced from a live 24-hour scrolling window Twitter feed. ",
    hackathon: "Hop Hacks",
    year: "2025",
    stack: ["Rust", "Typescript", "React", "Tailwindcss", "Flask", "WebGL", "SpacetimeDB", "Node.js", "Express.js", "WebSockets", "HuggingFace"],
  },
  {
    title: "Bear Escape",
    thumbnail: "bear.jpg",
    repo: "https://github.com/SamanthaJeanneb/guitar",
    devpost: "https://devpost.com/software/bear-escape",
    description:
      "Won MLH Track, Best UI/UX. Bear Escape is a rhythm game with the theme of “saving the bears.” Players hit notes in time with music to keep the bears safe, with both single and multiplayer modes. Can be used with GuitarHero controller and OpenCV for hand motion tracking. ",
    hackathon: "BigRed//Hacks",
    year: "2025",
    stack: ["OpenCV", "Python", "React", "Typescript", "Rust", "SpacetimeDB", "Three.js"],
  },
  {
    title: "Priorikitty",
    thumbnail: "kat.gif",
    repo: "https://github.com/eggoil166/divhaks",
    devpost: "https://devpost.com/software/priorikitty",
    description:
      "Won MLH Track. The Chrome extension brings Priorikitty to life on your browser as an animated lion companion that stays with you while you work. Each time you complete a task, the extension rewards you with points that can be spent in the in-app store to feed and care for your kitty with snacks, drinks, and other fun items. The kitty reacts to your activity, making productivity feel like a playful pet-care game rather than a chore. ",
    hackathon: "DivHacks",
    year: "2025",
    stack: ["Electron", "Chrome", "React", "Rust", "SpacetimeDB", "Typescript", "Tailwindcss", "Flask", "Node.js", "Auth0"],
  },
  {
    title: "VisionForge", 
    thumbnail: "vf.png",
    repo: "https://github.com/eggoil166/calhacks",
    devpost: "https://devpost.com/software/daedalus-hncywq",
    description:
        "VibeCAD brought to life. Direct and LLM-based editing of CAD models, as well as image-to-CAD fitted directly to real-life measurements. Mixed reality AR placement with Three.js + WebXR, built for Oculus/Meta Quest 1 & 2 in Oculus Browser. ",
    hackathon: "CalHacks",
    year: "2025",
    stack: ["OpenSCAD", "Three.js", "WebXR", "React", "Typescript", "Tailwindcss", "Flask", "Python", "Node.js", "FishAudio", "Prompt Engineering", "Javascript"]
  }
];

export default function HackathonPage() {
  return (
    <div
      className="w-full h-full overflow-auto rounded-md scrollbar-hide"
      style={{ backgroundColor: "#C8C393" }}
    >
      <div className="p-8 space-y-6" style={{ color: "#160F29" }}>
        <h1
          className="text-3xl font-semibold mb-2"
          style={{ color: "#281C4A" }}
        >
            Hackathons
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: "#20163C" }}>
          A welcome escape from the rigor of schoolwork, I dodge commitments to code in a dark room for a weekend with friends.
        </p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="p-4 rounded-xl text-sm bg-[#E8E4C9] border border-[#D4CE9E] shadow-sm"
          style={{ color: "#281C4A" }}
        >
          <span className="font-medium text-[#855A5C]">Coming soon:</span>{" "}
          next hackathons!! <span className="italic">HackPrinceton</span>,{" "}
          <span className="italic">TreeHacks</span>,{" "}
          <span className="italic">BitCamp 2025 (organizer)</span>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4 items-start">
          {projects.map((proj, i) => (
            <ProjectCard key={i} project={proj} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: HackathonProject }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className="bg-[#E8E4C9] rounded-2xl shadow-md overflow-hidden cursor-pointer flex flex-col justify-between self-start"
    >
      <div onClick={() => setExpanded((s) => !s)}>
        <motion.img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-40 object-cover"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        />
        <div className="p-4 space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold" style={{ color: "#281C4A" }}>
              {project.title}
            </h3>
            <div className="flex space-x-3">
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#855A5C]"
                onClick={(e) => e.stopPropagation()}
              >
                <Github size={18} />
              </a>
              <a
                href={project.devpost}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#855A5C]"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={18} />
              </a>
            </div>
          </div>

          <p className="text-sm text-[#4B3E64] font-medium">
            {project.hackathon} -- {project.year}
          </p>

          <div className="flex flex-wrap gap-2 mt-2">
            {project.stack.map((tech, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 text-xs rounded-full bg-[#D4CE9E] text-[#160F29]"
              >
                {tech}
              </span>
            ))}
          </div>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.25 }}
                className="mt-3"
              >
                <p
                  className="text-sm leading-relaxed text-[#20163C]"
                  style={{ wordBreak: "break-word" }}
                >
                  {project.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            className="text-xs mt-2 text-[#855A5C] hover:underline"
            onClick={(e) => {
              e.stopPropagation();
              setExpanded((prev) => !prev);
            }}
          >
            {expanded ? "Show Less" : "Read More"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function ResearchSection() {
  const projects = [
    {
      title: "Zero-Shot Translation with Token Fusion",
      summary: "Studying shared vocabularies for cross-domain understanding.",
      details:
        "Exploring compositional visual-textual token spaces for unsupervised cross-domain alignment. Using discrete tokens on images, enabling zero-shot translation through a shared vocabulary.",
      stack: ["PyTorch", "Transformers", "CLIP", "Faiss", "VQ/VAE"],
    },
    {
      title: "Large-scale case study for Morality in LLMs and Prompting Techniques",
      summary:
        "Testing moral reasoning capacity of LLMs through diverse models and scenario datasets.",
      details:
        "Using suites of moral dilemma datasets to benchmark and analyze the ethical reasoning capabilities of large language models. Investigates the impact of different prompting strategies on moral alignment.",
      stack: ["API", "NumPy", "Pandas"],
    },
    {
      title: "LLM Martingale Evaluation",
      summary:
        "Evaluating models through their probabilistic consistency under repeated sampling.",
      details:
        "Implements martingale-based uncertainty estimation for large language models. Studies probabilistic calibration under incremental evidence assimilation.",
      stack: ["Python", "NumPy", "Matplotlib", "HuggingFace", "PyTorch"],
    },
  ];

  const pastprojects = [
    {
      title: "NIST SHIP Program: Multi-Agent Communication in Autonomous Materials Discovery",
      summary: "Unifying measurements from multiple remote labs for materials optimization.",
      details:
        "Fusing discrete and continuous experimental data from distributed laboratories to optimize materials discovery. Developed multi-agent communication protocols to share insights and accelerate convergence on target properties. Collaboration with UMD in progress, aiming to finalize findings and publish. ",
      stack: ["Tensorflow", "Keras", "Python", "GPFlow", "NumPy"],
    },
    {
      title: "Multi-and-Single-View Pedestrian Tracking Algorithms",
      summary:
        "Developing robust tracking methods for pedestrian detection and footfall tracking.",
      details:
        "Implementing multi-and-single-view algorithms for accurate pedestrian tracking and footfall analysis. Utilizing DeepSORT and OpenCV as well as custom similarity metrics to enhance tracking performance in multi-view scenarios. Multiview case has 8% track loss rate, finished experimental review and writing modularized version.",
      stack: ["DeepSORT", "NumPy", "Python", "OpenCV", "Scikit-learn", "Scipy"],
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="p-8 space-y-6" style={{ color: "#160F29" }}>
      <h1
        className="text-3xl font-semibold mb-2"
        style={{ color: "#281C4A" }}
      >
        Research
      </h1>
      <p className="text-lg leading-relaxed" style={{ color: "#20163C" }}>
        I'm currently working on connections of{" "}
        <span style={{ color: "#855A5C" }}>natural language</span> in LLM/VLMs
        in conjunction with moral behavior and conformity to intrinsic random
        properties (<span style={{ color: "#855A5C" }}>Martingales</span>).
        Before this, I've also done research at NIST and independently on topics
        in <span style={{ color: "#855A5C" }}>computational materials science</span> and{" "}
        <span style={{ color: "#855A5C" }}>computer vision</span> for
        sustainability respectively.
      </p>

      <div>
        <h2 className="text-xl mt-8 mb-3" style={{ color: "#281C4A" }}>
          Current Projects
        </h2>

        <div className="space-y-4">
          {projects.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="border border-[#281C4A]/30 rounded-xl p-4 cursor-pointer bg-[#F6F3E9]/70 hover:bg-[#F6F3E9]/90 transition-all duration-300"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg" style={{ color: "#281C4A" }}>
                  {p.title}
                </h3>
                <motion.span
                  animate={{ rotate: openIndex === i ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-[#855A5C] font-bold"
                >
                  ▶
                </motion.span>
              </div>

              <p className="mt-1 text-base" style={{ color: "#20163C" }}>
                {p.summary}
              </p>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="mt-3 text-sm leading-relaxed" style={{ color: "#281C4A" }}>
                      {p.details}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {p.stack.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2 py-1 rounded-full border border-[#855A5C]/40 bg-[#E6E1D1]/60 text-[#281C4A]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-xl mt-8 mb-3" style={{ color: "#281C4A" }}>
          Past Projects
        </h2>

        <div className="space-y-4">
          {pastprojects.map((p, i) => (
            <motion.div
              key={i+3}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (i+3) * 0.1 }}
              className="border border-[#281C4A]/30 rounded-xl p-4 cursor-pointer bg-[#F6F3E9]/70 hover:bg-[#F6F3E9]/90 transition-all duration-300"
              onClick={() => setOpenIndex(openIndex === i+3 ? null : i+3)}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg" style={{ color: "#281C4A" }}>
                  {p.title}
                </h3>
                <motion.span
                  animate={{ rotate: openIndex === i+3 ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-[#855A5C] font-bold"
                >
                  ▶
                </motion.span>
              </div>

              <p className="mt-1 text-base" style={{ color: "#20163C" }}>
                {p.summary}
              </p>

              <AnimatePresence>
                {openIndex === i+3 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="mt-3 text-sm leading-relaxed" style={{ color: "#281C4A" }}>
                      {p.details}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {p.stack.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2 py-1 rounded-full border border-[#855A5C]/40 bg-[#E6E1D1]/60 text-[#281C4A]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

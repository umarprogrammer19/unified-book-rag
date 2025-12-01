import styles from "./modules-section.module.css"

const modules = [
  {
    title: "Foundations of GenAI",
    description: "Understand the core principles of generative AI and its applications in robotics.",
    topics: ["Neural Networks", "Transformers", "Diffusion Models"],
  },
  {
    title: "Practical Implementations",
    description: "Learn to implement AI models for robot control and decision-making systems.",
    topics: ["PyTorch", "ROS Integration", "Control Systems"],
  },
  {
    title: "Advanced Techniques",
    description: "Explore vision-language models, sim-to-real transfer, and multi-modal learning.",
    topics: ["VLMs", "Sim-to-Real", "Reinforcement Learning"],
  },
  {
    title: "Real-World Case Studies",
    description: "Analyze real-world applications of physical AI across various industries.",
    topics: ["Manufacturing", "Healthcare", "Logistics"],
  },
  {
    title: "Deployment & Scaling",
    description: "Understand how to deploy and scale AI models for robust robotic systems.",
    topics: ["Edge Computing", "Cloud Integration", "Optimization"],
  },
  {
    title: "Future Trends",
    description: "Stay updated with the latest advancements and future directions in physical AI.",
    topics: ["Humanoid Robots", "AGI", "Emerging Tech"],
  },
]

export function ModulesSection() {
  return (
    <section id="modules" className={styles.modules}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>Curriculum</span>
          <h2 className={styles.title}>Key Modules & Features</h2>
          <p className={styles.subtitle}>
            A structured learning path designed to take you from fundamentals to advanced physical AI applications.
          </p>
        </div>

        <div className={styles.grid}>
          {modules.map((module, index) => (
            <article key={index} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.moduleNum}>0{index + 1}</span>
                <svg
                  className={styles.arrow}
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </div>
              <h3 className={styles.cardTitle}>{module.title}</h3>
              <p className={styles.cardDesc}>{module.description}</p>
              <div className={styles.topics}>
                {module.topics.map((topic, i) => (
                  <span key={i} className={styles.topic}>
                    {topic}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

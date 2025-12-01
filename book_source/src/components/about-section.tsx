import styles from "./about-section.module.css"

const features = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4M12 8h.01" />
      </svg>
    ),
    title: "Deep Understanding",
    description: "Master the fundamental concepts of generative AI and how they apply to physical systems.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="4" y="4" width="6" height="6" rx="1" />
        <rect x="14" y="4" width="6" height="6" rx="1" />
        <rect x="4" y="14" width="6" height="6" rx="1" />
        <rect x="14" y="14" width="6" height="6" rx="1" />
      </svg>
    ),
    title: "Hands-On Projects",
    description: "Build and deploy real robotic applications using state-of-the-art AI techniques.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: "Industry Ready",
    description: "Learn deployment strategies and scaling techniques for production systems.",
  },
]

export function AboutSection() {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.label}>About the Course</span>
          <h2 className={styles.title}>Bridge the gap between AI theory and robotics practice</h2>
          <p className={styles.description}>
            The Physical AI Course is your comprehensive guide to mastering generative AI and humanoid robotics. Dive
            deep into the foundations of physical AI, explore cutting-edge simulation techniques, and build real-world
            robotic applications.
          </p>
          <p className={styles.subdesc}>
            Designed for engineers, researchers, and enthusiasts who want to transform theoretical knowledge into
            practical, deployable robotics solutions.
          </p>
        </div>

        <div className={styles.features}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.featureIcon}>{feature.icon}</div>
              <div className={styles.featureContent}>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDesc}>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

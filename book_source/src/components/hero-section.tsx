import Link from "@docusaurus/Link"
import styles from "./hero-section.module.css"
import RoboImage from "./asset/robo.jpg";

export function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.backgroundPattern} />
      <div className={styles.glowOrb} />

      <div className={styles.container}>
        <div className={styles.badge}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          <span>Physical AI Course</span>
        </div>

        <h1 className={styles.title}>
          Master the Future of <span className="text-gradient">Generative AI</span> & Robotics
        </h1>

        <p className={styles.subtitle}>
          Your comprehensive guide to building intelligent systems that bridge the gap between AI theory and practical
          humanoid robotics applications.
        </p>

        <div className={styles.actions}>
          <Link href="/docs/Module 01 Hardware-Lab/1.1-physical-ai-foundations-basics" className={styles.primaryBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
            Start Reading
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <Link href="/docs/category/syllabus" className={styles.secondaryBtn}>
            View Syllabus
          </Link>
        </div>

        <div className={styles.heroImage}>
          <div className={styles.imageGlow} />
          <div className={styles.imageContainer}>
            <img
              src={RoboImage}
              alt="Physical AI Course Overview - Neural networks and robotics visualization"
            />
            <div className={styles.imageOverlay} />
          </div>
        </div>
      </div>
    </section>
  )
}

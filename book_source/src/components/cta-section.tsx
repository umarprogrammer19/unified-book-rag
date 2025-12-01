import Link from "@docusaurus/Link"
import styles from "./cta-section.module.css"

export function CTASection() {
  return (
    <section className={styles.cta}>
      <div className={styles.glowLeft} />
      <div className={styles.glowRight} />

      <div className={styles.container}>
        <h2 className={styles.title}>Ready to start your journey in Physical AI?</h2>
        <p className={styles.description}>
          Join engineers and researchers who are building the future of intelligent robotics. Start learning today with
          our comprehensive curriculum.
        </p>

        <div className={styles.actions}>
          <Link href="/docs/Module 01 Hardware-Lab/1.1-physical-ai-foundations-basics" className={styles.primaryBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
            Start the Course
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <Link href="/docs/category/syllabus" className={styles.secondaryBtn}>
            Browse Syllabus
          </Link>
        </div>
      </div>
    </section>
  )
}

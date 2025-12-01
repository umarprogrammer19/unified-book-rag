import styles from "./stats-section.module.css"

const stats = [
  { value: "6+", label: "Comprehensive Modules" },
  { value: "40+", label: "Hours of Content" },
  { value: "1000+", label: "Active Learners" },
  { value: "Expert", label: "Level Training" },
]

export function StatsSection() {
  return (
    <section className={styles.stats}>
      <div className={styles.container}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.statItem}>
            <span className={styles.value}>{stat.value}</span>
            <span className={styles.label}>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

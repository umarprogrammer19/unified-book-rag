import { useState } from "react"
import Link from "@docusaurus/Link"
import styles from "./navbar.module.css"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <div className={styles.logoIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="4" y="4" width="6" height="6" rx="1" />
              <rect x="14" y="4" width="6" height="6" rx="1" />
              <rect x="4" y="14" width="6" height="6" rx="1" />
              <rect x="14" y="14" width="6" height="6" rx="1" />
            </svg>
          </div>
          <span className={styles.logoText}>Physical AI</span>
        </Link>

        <div className={styles.navLinks}>
          <Link href="#about" className={styles.navLink}>
            About
          </Link>
          <Link href="#modules" className={styles.navLink}>
            Modules
          </Link>
        </div>

        <div className={styles.navActions}>
          <Link href="/docs/Module 01 Hardware-Lab/1.1-physical-ai-foundations-basics" className={styles.docLink}>
            Documentation
          </Link>
          <Link href="/docs/Module 01 Hardware-Lab/1.1-physical-ai-foundations-basics" className={styles.ctaButton}>
            Start Learning
          </Link>
        </div>

        <button
          className={styles.menuButton}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {isOpen && (
        <div className={styles.mobileMenu}>
          <Link href="#about" className={styles.mobileLink} onClick={() => setIsOpen(false)}>
            About
          </Link>
          <Link href="#modules" className={styles.mobileLink} onClick={() => setIsOpen(false)}>
            Modules
          </Link>
          <Link
            href="/docs/Module 01 Hardware-Lab/1.1-physical-ai-foundations-basics"
            className={styles.mobileCta}
            onClick={() => setIsOpen(false)}
          >
            Start Learning
          </Link>
        </div>
      )}
    </nav>
  )
}

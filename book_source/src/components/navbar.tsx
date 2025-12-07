import { useState, useEffect } from "react"
import Link from "@docusaurus/Link"
import styles from "./navbar.module.css"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <div style={{
            fontSize: "40px"
          }}>🤖</div>
          <span className={styles.logoText}>Physical AI And Humonoid Robotics</span>
          <span className={styles.betaBadge}>Course</span>
        </Link>

        <div className={styles.navLinks}>
          <Link href="#about" className={styles.navLink}>
            About
          </Link>
          <Link href="#modules" className={styles.navLink}>
            Modules
          </Link>
          <Link href="/docs/category/syllabus" className={styles.navLink}>
            Syllabus
          </Link>
          <Link href="/docs" className={styles.navLink}>
            Docs
          </Link>
        </div>

        <div className={styles.navActions}>
          <Link href="/login" className={styles.loginBtn}>
            Login
          </Link>
          <Link href="/register" className={styles.signupBtn}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="8.5" cy="7" r="4" />
              <line x1="20" y1="8" x2="20" y2="14" />
              <line x1="23" y1="11" x2="17" y2="11" />
            </svg>
            Sign Up
          </Link>
          <Link href="/docs/Module 01 Hardware-Lab/1.1-physical-ai-foundations-basics" className={styles.ctaButton}>
            Start Learning
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
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

      <div className={`${styles.mobileMenu} ${isOpen ? styles.mobileMenuOpen : ""}`}>
        <Link href="#about" className={styles.mobileLink} onClick={() => setIsOpen(false)}>
          About
        </Link>
        <Link href="#modules" className={styles.mobileLink} onClick={() => setIsOpen(false)}>
          Modules
        </Link>
        <Link href="/docs/category/syllabus" className={styles.mobileLink} onClick={() => setIsOpen(false)}>
          Syllabus
        </Link>
        <Link href="/docs" className={styles.mobileLink} onClick={() => setIsOpen(false)}>
          Documentation
        </Link>
        <div className={styles.mobileActions}>
          <Link href="/login" className={styles.mobileLoginBtn} onClick={() => setIsOpen(false)}>
            Login
          </Link>
          <Link href="/register" className={styles.mobileSignupBtn} onClick={() => setIsOpen(false)}>
            Sign Up
          </Link>
        </div>
        <Link
          href="/docs/Module 01 Hardware-Lab/1.1-physical-ai-foundations-basics"
          className={styles.mobileCta}
          onClick={() => setIsOpen(false)}
        >
          Start Learning
        </Link>
      </div>
    </nav>
  )
}

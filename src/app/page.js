'use client'
import { Inter } from '@next/font/google'
import Link from 'next/link'
import styles from './page.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={styles.main}>

      <div className={styles.menu}>
        <h1>Retro Number Cruncher</h1>
        <div>
          <Link href="/game" className={styles.buttonGroup}>START</Link>
        </div>
      </div>
    </main>
  )
}

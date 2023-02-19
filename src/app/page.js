'use client'
import { Inter } from '@next/font/google'
import Link from 'next/link'
import styles from './page.module.css'
import { useSelector } from 'react-redux'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const highScore = useSelector((state) => state.scoreCount.highScore);
  return (
    
    <main className={styles.main}>

      <div className={styles.menu}>
        <h1>Retro Number Cruncher</h1>
        <div>
          <Link href="/game" className={styles.buttonGroup}>START</Link>
        </div>
        <h3>
          {highScore > 0? "Highest Score : " + highScore : null}
        </h3>
      </div>
      
    </main>
    
  )
}

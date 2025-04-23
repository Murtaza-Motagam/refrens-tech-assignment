import React from 'react'
import Image from 'next/image'

import styles from '@/app/page.module.css'
import Link from 'next/link'

interface CharacterCardsProps {
    char: {
        id: number
        image: string
        name: string
    }
}

export const CharacterCardsSkeleton = () => {
    return (
        <div className={styles.grid}>
            {Array.from({ length: 10 }).map((_, index) => (
                <div className={styles.card} key={index}>
                    <div className={`${styles.image} ${styles.skeleton}`} />
                    <div className={`${styles.name} ${styles.skeletonText}`} />
                </div>
            ))}
        </div>
    )
}

const CharacterCards = ({ char }: CharacterCardsProps) => {
    return (
        <Link href={`/character/${char.id}`} key={char.id} className={styles.card}>
            <Image unoptimized src={char.image} alt={char.name} width={300} height={300} className={styles.image} />
            <p className={styles.paraName}>{char.name}</p>
        </Link>
    )
}

export default CharacterCards;
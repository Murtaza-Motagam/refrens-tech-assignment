'use client'
import React from 'react'

import styles from '@/app/page.module.css'
import useCharacterHook, { episodeProps } from './hooks/useCharacterHook'
import Image from 'next/image'

const CharacterProfileSkeleton = () => {
    return (
        <div className={styles.profileCard}>
            <div className={`${styles.avatar} ${styles.skeleton}`}></div>
            <div className={styles.details}>
                <div className={`${styles.name} ${styles.skeletonText}`}></div>
            </div>
        </div>
    )
}

const CharacterProfile = () => {

    const { character, loading, episodes } = useCharacterHook();
    return (
        <div className={styles.profileWrapper}>
            {loading ? (
                <CharacterProfileSkeleton />
            ) : (
                <div className={styles.profileCard}>
                    <Image
                        width={500}
                        height={500}
                        unoptimized
                        src={character?.image || ''}
                        alt={character?.name || ''}
                        className={styles.avatar}
                    />

                    <div className={styles.details}>
                        <h2 className={styles.name}>{character?.name}</h2>

                        <div className={styles.grid}>
                            <div>
                                <span className={styles.label}>Species:</span>
                                <span className={styles.value}>{character?.species}</span>
                            </div>
                            <div>
                                <span className={styles.label}>Gender:</span>
                                <span className={styles.value}>{character?.gender}</span>
                            </div>
                            <div>
                                <span className={styles.label}>Type:</span>
                                <span className={styles.value}>{character?.type || 'N/A'}</span>
                            </div>
                            <div>
                                <span className={styles.label}>Status:</span>
                                <span className={styles.value}>{character?.status}</span>
                            </div>
                            <div>
                                <span className={styles.label}>Location:</span>
                                <span className={styles.value}>{character?.location}</span>
                            </div>
                            <div>
                                <span className={styles.label}>Origin:</span>
                                <span className={styles.value}>{character?.origin}</span>
                            </div>
                        </div>
                        <div className={styles.episodeSection}>
                            <h3>Appearance in {character?.episode?.length} Episodes</h3>
                            <div className={styles.episodeList}>
                                {episodes?.map((ep: episodeProps) => (
                                    <div key={ep.id} className={styles.episodeCard}>
                                        <p>Name: <strong>{ep.name}</strong></p>
                                        <p>Episode: <strong>{ep.episode}</strong></p>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    )
}

export default CharacterProfile
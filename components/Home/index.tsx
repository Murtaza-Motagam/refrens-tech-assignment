'use client';
import React from 'react'
import styles from '@/app/page.module.css'
import CharacterCards, { CharacterCardsSkeleton } from '../ui/CharacterCards'
import useHome, { characterListProps } from './hooks/useHome'
import SearchInput from '../ui/Input';
import FilterFields from './FilterFields';
import Pagination from './Pagination';

const Home = () => {

    const { characterLists = [], loading, handleCharacterSearch, updateFilter, filterFieldsData, handlePageClick, page, pagination } = useHome();

    return (
        <div className="container">
            <div className="center">
                <h2 className="heading-2">Rick & Morty Character lists</h2>
                <SearchInput onChange={handleCharacterSearch} />
                <FilterFields updateFilter={updateFilter} filterFieldsData={filterFieldsData} />

            </div>
            {loading ? (
                <CharacterCardsSkeleton />
            ) : characterLists?.length > 0 ? (
                <div className={styles.grid}>
                    {characterLists.map((char: characterListProps) => (
                        <CharacterCards key={char.id} char={char} />
                    ))}
                </div>
            ) : (
                <h1 className='noData'>No Data found !</h1>
            )}
            {!loading && characterLists?.length > 1 && (
                <Pagination handlePageClick={handlePageClick} pagination={pagination} page={page} />
            )}
        </div>
    )
}

export default Home
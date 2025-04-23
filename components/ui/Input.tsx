import React from 'react';
import styles from '@/app/page.module.css';

const SearchInput = ({ onChange }: { onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
    return (
        <input onChange={onChange} className={styles.searchInput} type="text" placeholder="Search character..." />
    );
};

export default SearchInput;

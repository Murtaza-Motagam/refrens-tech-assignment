import React from 'react';

import styles from '@/app/page.module.css'

interface filterFieldProps {
    updateFilter: (name: string, value: string) => void,
    filterFieldsData: { name: string, options: string[] }[]
}

const FilterFields = ({ updateFilter, filterFieldsData }: filterFieldProps) => {

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        updateFilter(e.target.name, e.target.value);
    };

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            {filterFieldsData.map((field: { name: string, options: string[] }) => (
                <select className={styles.selectInput} key={field.name} name={field.name} onChange={handleChange}>
                    <option value="">{field.name && field.name[0].toUpperCase() + field.name.slice(1)}</option>
                    {field.options.map((opt: string, index: number) => (
                        <option value={opt.toLowerCase()} key={index}>{opt && opt[0].toUpperCase() + opt.slice(1)}</option>
                    ))}
                </select>
            ))}
        </div>
    );
};

export default FilterFields;

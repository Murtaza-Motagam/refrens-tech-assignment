import React from 'react'
import { paginationProps } from './hooks/useHome'

interface paginationComponentProps {
    handlePageClick: (page: number) => void,
    pagination: paginationProps | undefined,
    page: number
}

const Pagination = ({ handlePageClick, pagination, page }: paginationComponentProps) => {
    return (
        <div className="pagination">
            <button className='btn' onClick={() => handlePageClick(page - 1)} disabled={page === 1}>
                Prev
            </button>
            <span>Page {page} of {pagination?.pages}</span>
            <button className='btn' onClick={() => handlePageClick(page + 1)} disabled={page === pagination?.pages}>
                Next
            </button>
        </div>
    )
}

export default Pagination
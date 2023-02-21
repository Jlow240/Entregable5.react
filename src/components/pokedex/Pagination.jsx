import React from 'react'
import "./styles/pagination.css"

const Pagination = ({ pagesInBlock, setCurrentPage, handleNextPage, handlePreviousPage, lastPage }) => {
    return (
        <section className='pagination'>
            <ul className='pagination__list'>
                <li className='pagination__item' onClick={handlePreviousPage}>{"<<"}</li>
                <li className='pagination__item' onClick={() => setCurrentPage(1)}>...</li>
                {
                    pagesInBlock.map(page => <li className='pagination__item' onClick={() => setCurrentPage(page)} key={page}>{page}</li>)
                }
                <li className='pagination__item' onClick={() => setCurrentPage(lastPage)}>...</li>
                <li className='pagination__item' onClick={handleNextPage}>{">>"}</li>
            </ul>
        </section>
    )
}

export default Pagination
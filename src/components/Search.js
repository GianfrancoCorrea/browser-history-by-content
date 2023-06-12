import React from 'react';
import { searchHistoryAPI } from '../api/apiService';

function Search({ onSearch }) {

    const handleSubmit = (e) => {
        if (e.key === 'Enter') {
            searchHistoryAPI(e.target.value).then((data) => {
                data = JSON.parse(data)
                onSearch(data)
            })
        }
    }

    const handleChange = (e) => {
        if (e.target.value === '') {
            onSearch(null);
        }
    }


    return (
        <div className='search'>
            <input type="text" placeholder='Search' onKeyDown={handleSubmit} onChange={handleChange} />
        </div>
    )
}

export default Search;

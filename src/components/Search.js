import React from 'react';

function Search({ onSearch }) {


    const handleSubmit = (e) => {
        if (e.key === 'Enter') {
            console.log(e.target.value)
            fetch('http://127.0.0.1:5000/api/search', {
                method: 'POST',
                body: new URLSearchParams({
                    'query': e.target.value,
                })
            })
                .then(response => response.text())
                .then(data => {
                    data = JSON.parse(data);
                    onSearch(data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
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

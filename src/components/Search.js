import React from 'react';

function Search() {


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
                    console.log(data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }



    return (
        <div className='search'>
            <input type="text" placeholder='Search' onKeyDown={handleSubmit} />
        </div>
    )
}

export default Search;

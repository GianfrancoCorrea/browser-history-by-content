
const API_URL = (endpoint) => `http://127.0.0.1:5000/api/${endpoint}`;

export const addHistoryAPI = (params) => fetch(API_URL('add'), {
    method: 'POST',
    body: new URLSearchParams(params)
})
    .then(response => response.text())
    .catch(error => {
        console.error('Error:', error);
    });

export const searchHistoryAPI = (params) => fetch(API_URL('search'), {
    method: 'POST', // TODO: make get request
    body: new URLSearchParams({
        'query': params,
    })
})
    .then(response => response.text())
    .catch(error => {
        console.error('Error:', error);
    });

export const clearHistoryAPI = () => fetch(API_URL('clear'), {
    method: 'DELETE',
})
    .then(data => {
        console.log(data)
    })
    .catch(error => {
        console.error('Error:', error);
    });

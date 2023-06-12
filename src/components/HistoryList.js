import React, { useEffect } from 'react'
import { addToCache, getFromCache, loadLocalCache, clearCache } from '../cache'


const SyncButton = ({ history_item }) => {

    const [loading, setLoading] = React.useState(false)
    const [sync, setSync] = React.useState(false)

    useEffect(() => {
        if (getFromCache(history_item.url) !== null) {
            setSync(true)
        }
    }, [history_item.url])

    const fetchAPI = (history_item) => {
        return fetch('http://127.0.0.1:5000/api/add', {
            method: 'POST',
            body: new URLSearchParams({
                id: history_item.id,
                url: history_item.url,
                title: history_item.title,
            })
        })
            .then(response => response.text())
            .then(data => {
                return data
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    const handleClick = () => {
        if (getFromCache(history_item.url) === null) {
            setLoading(true)
            fetchAPI(history_item).then((data) => {
                setLoading(false)
                setSync(true)
                console.log('%c 🍩 data: ', 'font-size:12px;background-color: #ED9EC7;color:#fff;', data);
                addToCache(history_item.url, data)
            })
        }
    }


    return (
        <>
            {loading & !sync ? <button className='sync' style={{ backgroundColor: 'gray' }}>Syncing...</button> : null}
            {!loading & !sync ? <button className='sync' onClick={handleClick}>Sync</button> : null}
            {sync ? <button className='sync' style={{ backgroundColor: 'transparent', fontSize: '1.3em' }}>✅</button> : null}
        </>

    )
}

function HistoryList({ history, searchResults }) {

    useEffect(() => {
        loadLocalCache()
    }, [])

    const handleClear = () => {
        return fetch('http://127.0.0.1:5000/api/clear', {
            method: 'DELETE',
        })
            .then(data => {
                console.log(data)
                clearCache()
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return (
        <ul>
            <button onClick={handleClear}>Clear DB & cache</button>
            {!searchResults ?
                history.map((item, index) => {
                    const formatedDate = new Date(item.lastVisitTime).toLocaleString()
                    return (
                        <li key={index}>
                            <div className='text-container' style={{ maxWidth: '90%', overflow: 'hidden' }}>
                                {item.title}
                                <div>
                                    <span className='text-small'>{item.url}</span>
                                </div>
                                <div>
                                    <span className='text-small'>{formatedDate}</span>
                                </div>
                            </div>
                            <div>
                                <SyncButton history_item={item} />
                            </div>
                        </li>
                    )
                })
                : searchResults?.map((item, index) => {
                    // const formatedDate = new Date(item.lastVisitTime).toLocaleString()
                    return (
                        <li key={index}>
                            <div className='text-container' style={{ maxWidth: '90%', overflow: 'hidden' }}>
                                {item.title}
                                <div>
                                    <span className='text-small'>{item.url}</span>
                                </div>
                                {/* <div>
                                <span className='text-small'>{formatedDate}</span>
                            </div> */}
                            </div>
                            <div>
                                <SyncButton history_item={item} />
                            </div>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default HistoryList

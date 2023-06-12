import React, { useEffect, useState } from 'react'
import { addToCache, getFromCache } from '../cache'
import { addHistoryAPI } from '../api/apiService'

const SyncButton = ({ history_item }) => {

    const [loading, setLoading] = useState(false)
    const [sync, setSync] = useState(false)

    useEffect(() => {
        if (getFromCache(history_item.url) !== null) {
            setSync(true)
        }
    }, [history_item.url])

    const handleClick = () => {
        if (getFromCache(history_item.url) === null) {
            setLoading(true)
            addHistoryAPI(history_item).then((data) => {
                setLoading(false)
                setSync(true)
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

export default SyncButton

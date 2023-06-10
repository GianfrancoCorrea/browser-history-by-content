import React from 'react'


const SyncButton = ({ history_item }) => {

    const [loading, setLoading] = React.useState(false)
    const [sync, setSync] = React.useState(false)

    const fetchAPI = (history_item) => {
        return fetch('http://127.0.0.1:5000/api/html', {
            method: 'POST',
            body: new URLSearchParams({
                id: history_item.id,
                url: history_item.url,
                title: history_item.title,
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

    const handleClick = () => {
        setLoading(true)
        fetchAPI(history_item).then(() => {
            setLoading(false)
            setSync(true)
        })
    }


    return (
        <>
            {loading & !sync ? <button className='sync' style={{ backgroundColor: 'gray' }}>Syncing...</button> : null}
            {!loading & !sync ? <button className='sync' onClick={handleClick}>Sync</button> : null}
            {sync ? <button className='sync' style={{ backgroundColor: 'transparent', fontSize: '1.3em' }}>✅</button> : null}
        </>

    )
}

function HistoryList(props) {



    return (
        <ul>
            {props.history.map((item, index) => {
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
            })}
        </ul>
    )
}

export default HistoryList
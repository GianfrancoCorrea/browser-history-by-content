import React from 'react'
import SyncButton from './SyncButton'


function HistoryList({ history, searchResults }) {

    const handleClick = (url) => {
        chrome.tabs.create({ url: url });
    }

    return (
        <ul>
            {!searchResults ?
                history.map((item, index) => {
                    const formatedDate = new Date(item.lastVisitTime).toLocaleString()
                    return (
                        <li key={index} >
                            <div className='text-container' style={{ maxWidth: '90%', overflow: 'hidden' }} onClick={() => handleClick(item.url)} >
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
                    return (
                        <li key={index}>
                            <div className='text-container' style={{ maxWidth: '90%', overflow: 'hidden' }} onClick={() => handleClick(item.url)} >
                                {item.title}
                                <div>
                                    <span className='text-small'>{item.url}</span>
                                </div>
                                <div>
                                    <span className='text-small'>{item.keywords}</span>
                                </div>
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

export default HistoryList;

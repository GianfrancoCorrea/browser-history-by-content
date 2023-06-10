import React from 'react'


const SyncButton = () => {
    /* send to api the history item */
    /* handle sync states */

    return (
        <button className='sync'>Sync</button>
    )
}

function Component(props) {
    return (
        <ul>
            {props.history.map((item, index) => {
                return (
                    <li key={index}>
                        <div className='text-container'>
                            {item.title}
                            <div>
                                <span className='text-small'>{item.url}</span>
                            </div>
                            <div>
                                <span className='text-small'>{item.lastVisitTime}</span>
                            </div>
                        </div>
                        <div>
                            <SyncButton />
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}

export default Component
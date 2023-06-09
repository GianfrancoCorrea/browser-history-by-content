import React from 'react'

function Component(props) {
    return (
        <ul>
            {props.history.map((item, index) => {
                return (
                    <li key={index}>
                        {item.title}
                        <div>
                            <span className='text-small'>{item.url}</span>
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}

export default Component
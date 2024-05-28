import React from 'react'

const NewsItem = ({message, date}) => {
    return (
        <div>
            <div>
                 <h3>
                     {date}
                 </h3>
            </div>
            <div>
                <p>
                    {message}
                </p>
            </div>
        </div>
    )
}
export default NewsItem

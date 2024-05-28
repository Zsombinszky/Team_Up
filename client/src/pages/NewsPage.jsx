import React, {useEffect, useState} from 'react'
import NewsItem from "../component/NewsItem.jsx";

const NewsPage = () => {
    const [dispatches, setDispatches] = useState([])

    function fetchUsers() {
        return fetch("/api/dispatches").then(res => res.json())
    }

    useEffect(() => {
        fetchUsers().then((dispatches) => setDispatches(dispatches))
    }, []);

    return (
        <div>
            {dispatches.map((dispatch, index) => (
                <div key={index}>
                    <NewsItem message={dispatch.message} date={dispatch.published}/>
                </div>
            ))}
        </div>
    )
}
export default NewsPage

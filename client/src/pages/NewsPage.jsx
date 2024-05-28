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


        // <div className={"carousel"}>
        //     <div className={"carousel-item"}>
        //         <img src={"https://wallpapercave.com/wp/wp13290368.jpg"} alt={"wallpaper1"}/>
        //     </div>
        //     <div className={"carousel-item"}>
        //         <img src={"https://wallpapercave.com/wp/wp13290371.png"} alt={"wallpaper2"}/>
        //     </div>
        //     <div className={"carousel-item"}>
        //         <img src={"https://wallpapercave.com/wp/wp11515404.jpg"} alt={"wallpaper3"}/>
        //     </div>
        //     <div className={"carousel-item"}>
        //         <img src={"https://wallpapercave.com/wp/wp13290372.png"} alt={"wallpaper4"}/>
        //     </div>
        // </div>
    )
}
export default NewsPage

import React, {useEffect, useState} from 'react'
import Table from "../component/Table.jsx";
import axios from "axios";

const AdminGuildsPage = () => {
    const [guilds, setGuilds] = useState([]);
    const token = localStorage.getItem("token")

    const fetchGuilds = async () => {
        try {
            const response = await axios.get(`/api/guild/all`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }, {responseType: "json"});
            setGuilds(response.data)
        } catch (err) {
            console.error("Could not find feedbacks.", err);
        }
    }

    useEffect(() => {
        fetchGuilds()
    }, [guilds]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/guild/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        } catch (error) {
            console.error("Error deleting data:", error)
        }
    }


    return (
        <div>
            <Table handleDelete={handleDelete} props={guilds}/>
        </div>
    )
}
export default AdminGuildsPage

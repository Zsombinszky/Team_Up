import React, {useEffect, useState} from 'react'
import Table from "../component/Table.jsx";
import axios from "axios";

const AdminWeaponsPage = () => {
    const [weapons, setWeapons] = useState([]);
    const token = localStorage.getItem("token");

    const fetchWeapons = async () => {
        try {
            const response = await axios.get(`/api/weapons`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }, {responseType: "json"});
            setWeapons(response.data)
        } catch (err) {
            console.error("Could not find weapons.", err);
        }
    }

    useEffect(() => {
        fetchWeapons()
    }, []);

    const handleDelete = async (id) => {
        const token = localStorage.getItem("token")
        try {
            await axios.delete(`/api/weapons/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            fetchWeapons()
        } catch (error) {
            console.error("Error deleting data:", error)
        }
    }


    return (
        <div>
            <Table handleDelete={handleDelete} props={weapons}/>
        </div>
    )
}
export default AdminWeaponsPage

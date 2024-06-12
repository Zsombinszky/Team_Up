import React, {useEffect, useState} from 'react'
import Table from "../component/Table.jsx";
import axios from "axios";

const AdminUsersPage = () => {

    const [users, setUsers] = useState([])

    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchUsers().then(res => setUsers(res))
    }, []);

    function fetchUsers() {
        return fetch("/api/user/users", {
            headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
        }).then(res => res.json())
    }

    async function handleDelete(userId) {
        try {
            await axios.delete(`/api/user/users/delete/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            fetchUsers()
        } catch (error) {
            console.error("Error deleting data:", error)
        }
    }

    return (
        <div>
            <Table handleDelete={handleDelete} props={users}/>
        </div>
    )
}
export default AdminUsersPage

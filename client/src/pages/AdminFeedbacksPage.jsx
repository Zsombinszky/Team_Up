import React, {useEffect, useState} from 'react'
import Table from "../component/Table.jsx";
import axios from "axios";

const AdminFeedbacksPage = () => {
    const [feedbacks, setFeedbacks] = useState([]);

    const fetchFeedbacks = async () => {
        try {
            const response = await axios.get(`/api/feedback/all`, {responseType: "json"});
            setFeedbacks(response.data)
        } catch (err) {
            console.error("Could not find feedbacks.", err);
        }
    }

    useEffect(() => {
        fetchFeedbacks()
    }, [feedbacks]);

    const handleDelete = async (id) => {
        const token = localStorage.getItem("token")
        try {
            await axios.delete(`/api/feedback/delete/${id}`, {
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
            <Table handleDelete={handleDelete} props={feedbacks}/>
        </div>
    )
}
export default AdminFeedbacksPage

import React, {useEffect, useState} from 'react'
import Table from "../component/Table.jsx";
import axios from "axios";

const AdminWeaponsPage = () => {
    const [weapons, setWeapons] = useState([]);
    const token = localStorage.getItem("token");
    const [weaponName, setWeaponName] = useState("");
    const [weaponImageURL, setWeaponImageURL] = useState("");


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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/api/weapons/add", {
                name: weaponName,
                image: weaponImageURL
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            fetchWeapons()
        } catch (error) {
            console.error("Error adding data:", error)
        }
    }


    return (
        <div>
            <div>
                <h1>Add weapon</h1>
                <form onSubmit={handleSubmit}>
                    <label>Weapon name</label>
                    <input type={"text"} value={weaponName} onChange={(e) => setWeaponName(e.target.value)}/>
                    <label>Weapon image URL</label>
                    <input type={"text"} value={weaponImageURL} onChange={(e) => setWeaponImageURL(e.target.value)}/>
                    <button>Submit</button>
                </form>
            </div>
            <Table handleDelete={handleDelete} props={weapons}/>
        </div>
    )
}
export default AdminWeaponsPage

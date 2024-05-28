import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

const ProfilePage = () => {

    const [user, setUser] = useState(null);
    const [toggleAddWeapon, setToggleAddWeapon] = useState(false)
    const [weapons, setWeapons] = useState([]);

    const {id} = useParams()

    useEffect(() => {
        fetchProfile(id).then((u) => setUser(u))
    }, []);

    useEffect(() => {
        if (toggleAddWeapon) {
            fetchWeapons().then((response) => setWeapons(response))
        }
    }, []);

    return (
        user == null ? "Loading..." :
            <div>
                <div className="flex flex-col p-24 justify-center items-center space-y-2">
                    <p>{user.image}</p>
                    <p className="text-2xl">{user.username}</p>
                    <p className="text-lg">{user.email}</p>
                    <p className="text-lg">{user.birthdate}</p>
                    <p>{user.title}</p>
                    <p>{user.level}</p>
                    <ul>
                        {user.weapons.map((weapon) => (
                            <li>{weapon}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <button
                        onClick={() =>setToggleAddWeapon(!toggleAddWeapon)}>{toggleAddWeapon ? "Close" : "Add Weapon"}</button>
                </div>
                {toggleAddWeapon && weapons.length > 0 ? <div>
                    <p>Add weapon to your favorites</p>
                    <select>
                        {weapons.map((weapon) => (
                            <div>
                                <h1>{weapon.name}</h1>
                                <img src={weapon.image} alt={weapon.name} height={50} width={100}/>
                            </div>
                        ))}
                    </select>
                </div> : ""
                }
            </div>
    );
}
export default ProfilePage;

function fetchProfile(id) {
    return fetch(`/api/user/users/${id}`).then(res => res.json())
}

function fetchWeapons() {
    return fetch("/api/weapons").then(res => res.json())
}

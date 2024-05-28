import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Titles} from "../data/Titles.js";

const ProfilePage = () => {

    const [user, setUser] = useState(null);
    const [toggleAddWeapon, setToggleAddWeapon] = useState(false)
    const [weapons, setWeapons] = useState([]);
    const [titleImage, setTitleImage] = useState("");


    const {id} = useParams()


    useEffect(() => {
        fetchProfile(id).then((u) => setUser(u))
    }, []);

    useEffect(() => {
        if (user) {
            const titleImg = findTitleImageByName(Titles, user.title);
            setTitleImage(titleImg);
        }
    }, [user]);

    useEffect(() => {
        if (toggleAddWeapon) {
            fetchWeapons().then((response) => setWeapons(response))
        }
    }, []);


    return (
        user === null ? "Loading..." :
            <div>
                <div className="flex flex-col p-24 justify-center items-center space-y-2 px-4 pb-6">
                    <img className="rounded w-48 h-48 border-4 mx-auto my-4" src={user.image}></img>
                    <p className="text-3xl">{user.username}</p>
                    <p className="text-2xl">{user.title}</p>
                    <img className="w-24 h-24" src={titleImage}></img>
                    <p className="text-lg">{user.email}</p>
                    <p className="text-lg">{user.birthdate}</p>
                    <p>level {user.level}</p>
                    <ul>
                        {user.weapons.map((weapon) => (
                            <li>{weapon}</li>
                        ))}
                    </ul>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <button
                        onClick={() => setToggleAddWeapon(!toggleAddWeapon)}
                        className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded">
                        {toggleAddWeapon ? "Close" : "Add Weapon"}
                    </button>
                </div>
                {toggleAddWeapon && weapons.length > 0 ? <div className="justify-center items-center">
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

const findTitleImageByName = (titles, userTitle) => {
    const filteredTitle = titles.filter(title => userTitle === title.name);
    return filteredTitle ? filteredTitle[0].image : "";
}

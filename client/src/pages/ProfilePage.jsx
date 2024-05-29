import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Titles} from "../data/Titles.js";

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [toggleAddWeapon, setToggleAddWeapon] = useState(false);
    const [weapons, setWeapons] = useState([]);
    const [titleImage, setTitleImage] = useState("");

    const {id} = useParams();

    useEffect(() => {
        fetchProfile(id).then((u) => setUser(u));
    }, [id]);

    useEffect(() => {
        if (user) {
            const titleImg = findTitleImageByName(Titles, user.title);
            setTitleImage(titleImg);
        }
    }, [user]);

    useEffect(() => {
        if (toggleAddWeapon) {
            fetchWeapons().then((response) => setWeapons(response));
        }
    }, [toggleAddWeapon]);

    return user === null ? (
        "Loading..."
    ) : (
        <div className="flex flex-row justify-center items-center p-24 space-y-2 px-4 pb-4">
            <div className="flex justify-between space-x-16">
                <div
                    className="w-[380px] h-[600px] flex flex-col justify-center items-center border border-gray-200 py-12 rounded-lg bg-[#4a4e69]">
                    <p className="text-4xl text-yellow-300 font-bold">{user.username}</p>
                    <img className="rounded-lg w-48 h-48 border-4 mx-auto my-4 object-cover" src={user.image}
                         alt="User"/>
                    <img className="w-24 h-24" src={titleImage} alt="Title"/>
                    <p className="text-2xl mb-5">{user.title}</p>
                    <p className="text-lg">{user.email}</p>
                    <p className="text-lg">{user.birthdate}</p>
                    <p>level {user.level}</p>
                </div>
                <div className="w-[380px] h-[600px] flex flex-col justify-center items-center border border-gray-200
                                py-12 rounded-lg bg-[#4a4e69]">
                    <div>
                        <ul className={"flex flex-col justify-center items-center"}>
                            {user.weapons.map((weapon) => (
                                <li key={weapon.id}>
                                    <div className={"flex flex-col justify-center items-center"}>
                                        <p>{weapon.name}</p>
                                        <img className="w-[100px] h-[100px]" src={weapon.image} alt={weapon.name}/>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <button
                            onClick={() => setToggleAddWeapon(!toggleAddWeapon)}
                            className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
                        >
                            {toggleAddWeapon ? "Close" : "Add Weapon"}
                        </button>
                    </div>
                    {toggleAddWeapon && weapons.length > 0 ? (
                        <div className="flex flex-col justify-center items-center mt-4">
                            <p>Add weapon to your favorites</p>
                            <select className="justify-center items-center">
                                {weapons.map((weapon) => (
                                    <option key={weapon.id}>{weapon.name}</option>
                                ))}
                            </select>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;

function fetchProfile(id) {
    return fetch(`/api/user/users/${id}`).then((res) => res.json());
}

function fetchWeapons() {
    return fetch("/api/weapons").then((res) => res.json());
}

const findTitleImageByName = (titles, userTitle) => {
    const filteredTitle = titles.filter((title) => userTitle === title.name);
    return filteredTitle.length > 0 ? filteredTitle[0].image : "";
};

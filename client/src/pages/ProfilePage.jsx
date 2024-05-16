import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

const ProfilePage = () => {

    const [user, setUser] = useState(null);

    const {id} = useParams()

    useEffect(() => {
        fetchProfile(id).then((u) => setUser(u))
    }, []);

    return (
        user == null ? "Loading..." :
        <div className="flex flex-col p-24 justify-center items-center space-y-2">
            <p className="text-2xl">{user.username}</p>
            <p className="text-lg">{user.email}</p>
            <p className="text-lg">{user.birthdate}</p>
        </div>
    );

}
export default ProfilePage;

function fetchProfile(id) {
    return fetch(`/api/users/${id}`).then(res => res.json())
}

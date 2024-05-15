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
        <div>
            <p>{user.username}</p>
        </div>
    );

}
export default ProfilePage;

function fetchProfile(id) {
    return fetch(`/api/users/${id}`).then(res => res.json())
}

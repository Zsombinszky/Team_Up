import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export const UserList = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers().then((users) => setUsers(users))
    }, []);

    return (
        users.length === 0 ? "Loading..." :
            <div>
                {users.map((user) => (
                    <div>
                        <Link to={`/profile/${user.id}`} key={user.id}>
                            <p>{user.username}</p>
                        </Link>
                    </div>
                ))}
            </div>
    )
}

function fetchUsers() {
    return fetch("/api/users").then(res => res.json())
}

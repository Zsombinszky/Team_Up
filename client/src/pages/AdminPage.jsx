import {Link} from "react-router-dom";
import Table from "../component/Table.jsx";
import {Weapons} from "../data/Weapons.js";
import {courses} from "../data/Courses.js";

const AdminPage = () => {

    return (
        <div>
            <div className={"space-x-4 pb-12"}>
                <Link to={"/admin/feedbacks"}>
                    <button>Feedbacks</button>
                </Link>
                <Link to={"/admin/guilds"}>
                    <button>Guilds</button>
                </Link>
                <Link to={"/admin/users"}>
                    <button>Users</button>
                </Link>
                <Link to={"/admin/weapons"}>
                    <button>Weapons</button>
                </Link>
            </div>
        </div>
    )
}
export default AdminPage

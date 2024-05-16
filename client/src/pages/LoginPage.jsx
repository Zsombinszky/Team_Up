import {useState} from "react";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {

    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = {
            username: username,
            password: password
        }

        await setUser(user)

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
            if (response.ok) {
                console.log("Login successful")
                navigate("/")
            } else {
                console.error("Unsuccessful login attempt")

            }
        } catch (err) {
            console.log("Error during login: ", err)
        }
    }


    return (
        <div className="flex flex-col p-24 justify-center items-center">
            <h1 align="center" className="py-2 text-2xl text-[#20B486] font-medium" >LOGIN</h1>
            <form className="bg-white border max-w-[500px] p-4 input-box-shadow rounded-md justify-between" onSubmit={e => handleSubmit(e)}>
                <p><label htmlFor="userName">Username</label></p>
                <input type="text"
                       placeholder="please enter your username"
                       value={username}
                       onChange={e=>setUsername(e.target.value)}/>
                <p><label htmlFor="password">Password</label></p>
                    <input type="password"
                       placeholder="please enter your password"
                       value={password}
                       onChange={e=>setPassword(e.target.value)}/>
                <button className="bg-[#20B486] hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Login</button>
            </form>
        </div>
    )
}
export default LoginPage

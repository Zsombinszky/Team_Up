import {useState} from "react";
import {useNavigate} from "react-router-dom";
import LoginBackground from "../assets/loginbgbig.jpg"

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
            const response = await fetch("/api/user/login", {
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
        <div className={"w-full h-screen"}>
            <img
                className='hidden sm:block absolute w-full h-full object-cover'
                src={LoginBackground}
                alt='/'
            />
            <div className='fixed w-full px-4 py-24 z-50'>
                <div className='max-w-[450px] h-[600px] mx-auto bg-black/75 text-white'>
                    <div className='max-w-[320px] mx-auto py-16'>
                        <h1 className='text-3xl font-bold py-8'>Sign In</h1>
                        <form onSubmit={handleSubmit} className='w-full flex flex-col'>
                            <p><label className={"block uppercase tracking-wide text-sm font-bold mb-2"}
                                      htmlFor="userName">Username</label></p>
                            <input
                                onChange={(e) => setUsername(e.target.value)}
                                className='p-3 my-2 bg-gray-700 rounded'
                                value={username}
                                type='text'
                                placeholder='username'
                            />
                            <p><label className={"block uppercase tracking-wide text-sm font-bold mb-2 mt-5"}
                                      htmlFor="password">Password</label></p>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                className='p-3 my-2 bg-gray-700 rounded'
                                type='password'
                                value={password}
                                placeholder='password'
                                autoComplete='current-password'
                            />
                            <button
                                className='bg-yellow-500 hover:bg-[#FFD700] py-3 my-6 rounded font-bold ease-in duration-200'>
                                Sign In
                            </button>
                            <div className='flex justify-between items-center text-sm text-gray-600'>
                                <p>
                                    <input className='mr-2 accent-amber-400' type='checkbox'/>
                                    Remember me
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LoginPage

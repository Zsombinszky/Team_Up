import {useEffect, useState} from "react";

const RegisterPage = () => {

    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [birthDate, setBirthDate] = useState("");


    async function handleSubmit(e) {
        e.preventDefault();
        const user = {
            username: username,
            password: password,
            email: email,
            birthDate: birthDate,
        }
        await setUser(user);

        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            if (response.ok) {
                console.log("Registration successful")
            } else {
                console.error("Registration failed")
            }

        } catch (err) {
            console.error("Error during registration", err);
        }


    }


    return (
        <div className="register-page">
            <form className="register-form" onSubmit={e => handleSubmit(e)}>
                <div className="form-group">
                    <label htmlFor="userName" className="form-label">User name</label> <br/>
                    <input type="text" placeholder="name" value={username}
                           onChange={(e) => setUsername(e.target.value)}/> <br/>

                    <label htmlFor="password" className="form-label">password</label> <br/>
                    <input type="password" placeholder="password" value={password}
                           onChange={e => setPassword(e.target.value)}/> <br/>

                    <label htmlFor="email" className="form-label">email</label> <br/>
                    <input type="email" placeholder="email" value={email}
                           onChange={e => setEmail(e.target.value)}/> <br/>

                    <label htmlFor="birthdate" className="form-label">birthdate</label> <br/>
                    <input type="date" value={birthDate}
                           onChange={e => setBirthDate(e.target.value)}/>
                </div>
                <button type="submit" className="submit-button">Register</button>
            </form>
        </div>
    )
}

export default RegisterPage


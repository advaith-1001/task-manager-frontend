import { useContext, useState } from 'react';
import '../styles/login.css'
import axios from 'axios';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../context/AuthContext';


function Register() {
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[username, setUsername] = useState("")

    const handleSubmit = async (e) => {
       e.preventDefault();

       const registration = {
        username,
        email,
        password,
        emailVerified: false,
        oauthProvider: "",
        oauthId: ""
       }

       try
       {const response = await axios.post('http://localhost:8080/api/auth/register', registration, {
        headers: {
            'Content-Type' : 'application/json',
        },
        withCredentials: true,
       });

       console.log('registered: ', response.data)
       alert('Registration Succesful');
    } catch(error) {
        console.log('Error registering user', error);
        alert('Failed registering user');
    }
    };

    return(
        <div className="login-ctr">
                                <div className="register">
            <h2 className="login-header">Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>

                <input 
                    type="email" 
                    className="email-inp"
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    className="password-inp"
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />

<input type="text" className='email-inp' placeholder='Username' value={username}
                onChange={(e) => setUsername(e.target.value)}/>
                <button className="login-btn" type="submit">Register</button>
            </form> 
        </div>
        </div>
    );
}

export default Register
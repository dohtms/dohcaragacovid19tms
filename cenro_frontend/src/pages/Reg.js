import React, { useState } from 'react'
import axios from 'axios'
const Reg = () => {
    const [register, setRegister] = useState({
        name: '',
        username: '',
        password: ''
    })
    const handleChange = (e) => {
        setRegister({ ...register, [e.target.name]: e.target.value })
    }
    const handleRegister = () => {
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/registerUser`, {
                name: register.name,
                username: register.username,
                password: register.password
            })
                .then(res => console.log(res))
        });
    }
    return (
        <div>
            <input type="text" name="name" value={register.name} onChange={handleChange} />
            <input type="text" name="username" value={register.username} onChange={handleChange} />
            <input type="text" name="password" value={register.password} onChange={handleChange} />
            <button onClick={handleRegister} >register</button>
        </div>
    );
}

export default Reg;
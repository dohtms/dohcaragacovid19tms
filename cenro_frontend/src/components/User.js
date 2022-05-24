import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import Swal from 'sweetalert2';
const User = (props) => {
    const [isLoading, setIsLoading] = useState(true)
    const [status, setStatus] = useState('')
    const [isSubmit,setIsSubmit] = useState(false)
    const [user, setUser] = useState({
        name: '',
        username: '',
        password: '',
        password2: ''
    })
    const [valErr,setValErr] = useState('')
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    const handleUpdateUser = () => {
        setStatus('')
        setValErr('')
        if(user.password ==='' || user.password.length <= 3 || user.name ==='' || user.name.length <= 3 || user.username ==='' || user.username.length <= 3){
            setStatus(<span style={{color:'red'}}>Error in Input</span>)
            return
        }
        if(user.password !== user.password2) {
            setStatus(<span style={{color:'red'}}>Password didn't match</span>)
            return
        }
        setIsSubmit(true)
        axios.post(`/api/updateUser`,user)
        .then(res => {
            setIsSubmit(false)
            if(res.data.val_err){
                setValErr(res.data.val_err)
            }
            if(res.data.status === 200){
                props.setCenroName(res.data.result.new_name)
                setStatus(<span style={{color:'green'}}>Updated</span>)
            }
            if(res.data.status === 500){
                setStatus(<span style={{color:'red'}}>Failed to update</span>)
            }
         
        })
    }
    useEffect(() => {
        let mounted = false
        axios.post(`/api/getCurrUser`, {
            username: localStorage.getItem('cenro_username')
        })
            .then(res => {
                if(mounted){
                    return
                }
                if (res.data.status === 200) {
                    setIsLoading(false)
                    setUser({
                        name: res.data.result.name,
                        username: res.data.result.email,
                        password: ''
                    })
                }
                if (res.data.status === 500) {
                    Swal.fire({
                        title: 'failed',
                        icon: 'error'
                    })
                }
            })

            return (() => { //clean up lets go
                mounted = true
            })
    }, [])
    return (
        <Box sx={{ flexGrow: 1, p: 2, height: '100%', width: '100%' }}>
            {isLoading ? (
                <>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1, height: '100%', width: '100%' }}>
                        <CircularProgress size={200} />
                    </Box>
                </>
            ) : (
                <>
                    <Typography variant="h5" sx={{ textAlign: 'center',mb:1 }}>Change user credentials</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start',mb:1 }}>
                        <Typography sx={{ textAlign: 'left', color: 'red' }}>*name must be greater than 3 characters</Typography>
                        <Typography sx={{ textAlign: 'left', color: 'red' }}>*username must be greater than 3 characters</Typography>
                        <Typography sx={{ textAlign: 'left', color: 'red' }}>*password must be greater than 3 characters</Typography>
                    </Box>
                    {valErr ? (
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start',mb:2 }}>
                            {valErr.name ? (<Typography sx={{bgcolor:'red',color:'#fff'}}>{valErr.name}</Typography>):null}
                            {valErr.username ? (<Typography sx={{bgcolor:'red',color:'#fff'}}>{valErr.username}</Typography>):null}
                            {valErr.password ? (<Typography sx={{bgcolor:'red',color:'#fff'}}>{valErr.password}</Typography>):null}
                        </Box>
                    ) : null}
                    <TextField label="Name" variant="outlined" name="name" value={user.name} onChange={handleChange} focused fullWidth sx={{ mb: 2 }} />
                    <TextField label="Username" variant="outlined" name="username" value={user.username} onChange={handleChange} focused fullWidth sx={{ mb: 2 }} />
                    <TextField label="Password" variant="outlined" type="password" name="password" value={user.password} onChange={handleChange} focused fullWidth sx={{ mb: 2 }} />
                    <TextField label="Confirm Password" variant="outlined" type="password" name="password2" value={user.password2} onChange={handleChange} focused fullWidth sx={{ mb: 2 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                            <Typography>status:</Typography>
                            <Typography sx={{ ml: 2 }}>{status === '' ? null : status}</Typography>
                        </Box>
                        <Button variant="contained" onClick={handleUpdateUser}>{isSubmit ? (<CircularProgress sx={{color:'#fff'}} />) : 'Submit'}</Button>
                    </Box>
                </>
            )}
        </Box>
    );
}

export default User;
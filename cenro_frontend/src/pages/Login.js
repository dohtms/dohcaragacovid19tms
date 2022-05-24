import React, { useState, useEffect } from 'react'
import { Box, Grid, Card, CardContent, TextField, Button, Typography } from '@mui/material'
import CenroLogo from '../assets/img/a.png'
import Bt from '../assets/img/b.png'
import Bton from '../assets/img/bton.png'
import Cicto from '../assets/img/cicto.png'
import LoginIcon from '@mui/icons-material/Login';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import Swal from 'sweetalert2'
import {useNavigate} from 'react-router-dom'
import axios from "axios";

const Login = () => {
 
    const navigate = useNavigate()
    const [login, setLogin] = useState({
        username: '',
        password: ''
    })
    const [valErr,setValErr] = useState({
        username: '',
        password: ''
    })

    const handleChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value })
    }
    const handleLogin = () => {
        setValErr('')
        if(login.username === '' && login.password === ''){
            setValErr({
                username: 'Field is empty',
                password: 'Field is empty'
            })
            return
        }
        else if(login.username ===''){
            setValErr({
                username: 'Field is empty',
            })
            return
        }
        else if(login.password ===''){
            setValErr({
                password: 'Field is empty'
            })
            return
        }
        
        Swal.fire('logging in . . .')
        Swal.showLoading()
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/loginUser`, {
                username: login.username,
                password: login.password
            })
                .then(res => {
                    Swal.close()
                    if(res.data.status === 200){
                        localStorage.setItem('cenro_name',res.data.res.cenro_name)
                        localStorage.setItem('cenro_auth_token',res.data.res.cenro_auth_token)
                        localStorage.setItem('cenro_username',res.data.res.cenro_username)
                        navigate('/cenro/home')
                    }
                    if(res.data.status === 401){
                        Swal.fire({
                            title:res.data.message,
                            icon:'question'
                        })
                    }
                    if(res.data.val_err){
                        setValErr({
                            username: res.data.val_err.username ? res.data.val_err.username : '',
                            password: res.data.val_err.password ? res.data.val_err.password : ''
                        })
                    }
                })
        })
    }

    useEffect(() => {
        let mounted = false
        if(localStorage.getItem('cenro_auth_token')){
            Swal.fire('checking connection . . .')
            Swal.showLoading()
            axios.get(`/api/checkAuth`)
            .then(res => {
                if(mounted){
                    return
                }
                Swal.close()
                if(res.data.status === 200){
                    navigate('/cenro/home')
                }
                else {
                    navigate('/cenro/')
                }
            })
            .catch(err => {
                if(err.response.status === 401){
                    Swal.fire({
                        title:'Access Denied',
                        icon:'warning'
                    })
                    navigate('/cenro/')
                }
            })
        }
        else {
            navigate('/cenro/')
        }

        return (() => { //clean up lets go
            mounted = true
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return (
        <Box sx={{ flexGrow: 1, height: '100vh', width: '100vw', background: 'radial-gradient(#000051, #000)', p: 0, m: 0 }}>
            <Grid container spacing={2} sx={{ display: 'flex', height: '100vh' }}>
                <Grid item xs={12} sm={12} md={7} lg={7}>
                    <Box sx={{ display: 'flex', height: '100%', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <img src={Bt} alt="" width="500" style={{ opacity: .6 }} />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={5} lg={5} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
                    <Card sx={{ ml: 2, minWidth: '400px' }}>
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                            <Typography sx={{ mb: 2, textAlign: 'center' }}><b>C.E.N.R.O. LOGIN</b></Typography>
                            <Typography sx={{color:'red'}}>{valErr.username}</Typography>
                            <TextField
                                id="input-with-icon-username"
                                label="Username"
                                name="username"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="standard"
                                sx={{ mb: 2 }}
                                onChange={handleChange}
                            />
                            <Typography sx={{color:'red'}}>{valErr.password}</Typography>
                            <TextField
                                id="input-with-icon-password"
                                label="Password"
                                name="password"
                                type="password"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <VpnKeyIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="standard"
                                sx={{ mb: 2 }}
                                onChange={handleChange}
                            />
                            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }} >
                                <Button variant="contained" size="large" onClick={handleLogin}>Login &nbsp; <LoginIcon /></Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Box sx={{display:'flex',alignItems:'center',justifyContent:'space-evenly'}}>
                        <Box sx={{height:'3px',width:'30%',bgcolor:'#fff',ml:2}}></Box>
                        <Box sx={{display:'flex',flexDirection:'column'}}>
                            <Box  sx={{ml:2}}><img src={Bton} width="90" alt="img_alt" /></Box>
                            {/* <Typography sx={{color:'#fff',textAlign:'center'}}>sample / test</Typography> */}
                        </Box>
                        <Box sx={{display:'flex',flexDirection:'column'}}>
                            <Box  sx={{ml:2}}><img src={Cicto} width="90" alt="img_alt" /></Box>
                            {/* <Typography sx={{color:'#fff',textAlign:'center'}}>sample / test</Typography> */}
                        </Box>
                        <Box sx={{display:'flex',flexDirection:'column'}}>
                            <Box  sx={{ml:2}}><img src={CenroLogo} width="90" alt="img_alt" /></Box>
                            {/* <Typography sx={{color:'#fff',textAlign:'center'}}>sample / test</Typography> */}
                        </Box>
                        <Box sx={{height:'3px',width:'30%',bgcolor:'#fff',ml:2}}></Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Login;
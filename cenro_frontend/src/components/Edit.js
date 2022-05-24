import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import LinearProgress from '@mui/material/LinearProgress';
import axios from 'axios';
const Edit = (props) => {
    const [isEdit, setIsEdit] = useState(false)
    const [isUpdated, setIsUpdated] = useState('')
    const [bussinessInfo, setBussinessInfo] = useState({
        firstname: props.data.firstname,
        middlename: props.data.middlename,
        lastname: props.data.lastname,
        busName: props.data.bus_name,
        busLoc: props.data.bus_loc,
        doneDate: props.data.done_date,
        orNo: props.data.or_no,
        amount: props.data.amount,
        date: props.data.date,
        count: props.data.count,
        with: props.data.with_env,
        participated: props.data.participated,
        setter: props.data.id
    })
    const handleChange = (e) => {
        setBussinessInfo({ ...bussinessInfo, [e.target.name]: e.target.value })
    }

    const handleEdit = () => {
        if(bussinessInfo.amount === 100){
            bussinessInfo.participated = ''
        }
        setIsEdit(true)
        axios.post(`/api/editInfo`, bussinessInfo)
            .then(res => {
                setIsEdit(false)
                if (res.data.status === 200) {
                    setIsUpdated(<p style={{ color: 'green', padding: 0, margin: 0 }}>data is updated!</p>)
                    props.setSearch(res.data.res.firstname)
                    props.setForceFetch(!props.forceFetch)
                    setTimeout(()=>props.handleCloseModalEdit(),500)
                }
                if (res.data.status === 500) {
                    setIsUpdated(<p style={{ color: 'red', padding: 0, margin: 0 }}>failed to updated!</p>)
                }
            })
            .catch(error => {
                setIsEdit(false)
                setIsUpdated(<p style={{ color: 'red', padding: 0, margin: 0 }}>server Error!</p>)
            })
    }
    return (
        <>
            {isEdit ? (<LinearProgress />) : null}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1, px: 2 }} fullWidth>
                <Typography variant="h6">Update</Typography>
                {isUpdated}
            </Box>
            <TextField fullWidth id="outlined-fname" label="First Name" variant="outlined" sx={{ mr: 1, mb: 1 }} name="firstname" value={bussinessInfo.firstname} onChange={handleChange} />
            <TextField fullWidth id="outlined-middlename" label="Middle Name" variant="outlined" sx={{ mr: 1, mb: 1 }} name="middlename" value={bussinessInfo.middlename} onChange={handleChange} />
            <TextField fullWidth id="outlined-lastname" label="Last Name" variant="outlined" sx={{ mr: 1, mb: 1 }} name="lastname" value={bussinessInfo.lastname} onChange={handleChange} />
            <TextField fullWidth id="outlined-bus" label="Bussiness Name" variant="outlined" sx={{ mr: 1, mb: 1 }} name="busName" value={bussinessInfo.busName} onChange={handleChange} />
            <TextField fullWidth id="outlined-busad" label="Bussiness Address" variant="outlined" sx={{ mr: 1, mb: 1 }} name="busLoc" value={bussinessInfo.busLoc} onChange={handleChange} />
            {/* <TextField fullWidth id="outlined-iss" label="Issued date" focused type="date" variant="outlined" sx={{ mr: 1, mb: 1 }} name="doneDate" value={bussinessInfo.doneDate} onChange={handleChange} /> */}
            <TextField fullWidth id="outlined-paid" label="Paid under OR No." variant="outlined" sx={{ mr: 1, mb: 1 }} name="orNo" value={bussinessInfo.orNo} onChange={handleChange} />
            <FormControl fullWidth sx={{ mb: 1 }}>
                <InputLabel id="amount-label">Amount</InputLabel>
                <Select
                    labelId="amount-label"
                    id="demo-amount-select"
                    value={bussinessInfo.amount}
                    label="Amount"
                    name="amount"
                    onChange={handleChange}
                >
                    <MenuItem value={100}>New /PHP 100</MenuItem>
                    <MenuItem value={50}>Renew /PHP 50</MenuItem>
                </Select>
            </FormControl>
            {bussinessInfo.amount === 50 && bussinessInfo.amount !== '' ? (
                <FormControl fullWidth sx={{ mb: 1 }}>
                    <InputLabel id="outlined-participated">Participated</InputLabel>
                    <Select
                        labelId="outlined-participated"
                        id="demo-outlined-participated"
                        value={bussinessInfo.participated}
                        label="Participated"
                        name="participated"
                        onChange={handleChange}
                    >
                        <MenuItem value="Y">Yes</MenuItem>
                        <MenuItem value="N">No</MenuItem>
                    </Select>
                </FormControl>
            ) : null}
            <FormControl fullWidth sx={{ mb: 1 }}>
                <InputLabel id="with-label">With/Without</InputLabel>
                <Select
                    labelId="with-label"
                    id="demo-with-select"
                    value={bussinessInfo.with}
                    label="With/Without"
                    name="with"
                    onChange={handleChange}
                >
                    <MenuItem value={'T'}>With Environmental Impact</MenuItem>
                    <MenuItem value={'F'}>Without Environmental Impact</MenuItem>
                </Select>
            </FormControl>
            <TextField fullWidth id="outlined-d" label="OR Issued date" focused type="date" variant="outlined" sx={{ mr: 1, mb: 1 }} name="date" value={bussinessInfo.date} onChange={handleChange} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="contained" size="large" onClick={handleEdit}>Update</Button>
            </Box>
        </>
    );
}

export default Edit;
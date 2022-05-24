import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CssBaseline from '@mui/material/CssBaseline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PrintIcon from '@mui/icons-material/Print';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import LinearProgress from '@mui/material/LinearProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { yellow, red } from '@mui/material/colors';
import { useReactToPrint } from 'react-to-print';
import PrintWith from '../print/PrintWith'
import PrintWithout from '../print/PrintWithout'
import Export from '../components/Export'
import axios from "axios";
import Swal from 'sweetalert2'
import Edit from '../components/Edit'
import User from '../components/User'
import HeaderV2 from '../assets/img/header_v2.png'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const buttonsTheme = createTheme({
    palette: {
        primary: {
            main: yellow[500],
        },
        secondary: {
            main: red[500]
        },
    },
});


const Home = () => {

    const navigate = useNavigate()

    // printing with 
    const componentRefWith = useRef();
    const [printWithData, setPrintWithData] = useState('')
    // 
    // printing without
    const componentRefWithout = useRef();
    const [printWithoutData, setPrintWithoutData] = useState('')
    // 
    // states for modal
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const handleOpenModalAdd = () => setOpenModalAdd(true);
    const handleCloseModalAdd = () => setOpenModalAdd(false);
    const firstRender = useRef(null) //checker for first render in update and search

    const [openModalEdit, setOpenModalEdit] = useState(false); // for edit modal
    const [edit, setEdit] = useState('')
    const handleOpenModalEdit = async (row) => {
        Swal.fire('loading . . .')
        Swal.showLoading()
        let checker = await checkIfExist(row)
        // console.log(checker)
        if (checker === 200) {
            Swal.close()
            setEdit(row)
            setOpenModalEdit(true)
        }
        if (checker === 500) {
            Swal.close()
            Swal.fire({
                title: 'Data Not Found',
                text: 'Data does not exist in the database',
                icon: 'error'
            })
        }

    };
    const handleCloseModalEdit = () => setOpenModalEdit(false);

    const [openModalExport, setOpenModalExport] = useState(false); // for export modal
    const handleOpenModalExport = () => setOpenModalExport(true);
    const handleCloseModalExport = () => setOpenModalExport(false);

    // for modal change user credentials
    const [openModalUser, setOpenModalUser] = useState(false); // for export modal
    const handleOpenModalUser = () => setOpenModalUser(true);
    const handleCloseModalUser = () => setOpenModalUser(false);
    // state used for this page
    const [bussinessInfo, setBussinessInfo] = useState({
        firstname: '',
        middlename: '',
        lastname: '',
        busName: '',
        busLoc: '',
        doneDate: '',
        orNo: '',
        amount: '',
        date: '',
        count: '',
        with: '',
        participated: '',
        created: ''
    })
    const [bussinessInfoGetter, setBussinessInfoGetter] = useState('')
    const [isSubmit, setIsSubmit] = useState(false) //for submit checker
    const [isStore, setIsStore] = useState('') //for storing checker
    const [isFetch, setIsFetch] = useState(true) // checking if there is data returned from use effect fetch bussiness info
    const [search, setSearch] = useState('')
    const [forceFetch, setForceFetch] = useState(false)
    const [printWithInvoker, setPrintWithInvoker] = useState(false)
    const [printWithoutInvoker, setPrintWithoutInvoker] = useState(false)
    const [cenroName, setCenroName] = useState('')
    const [isPagesLoad, setIsPagesLoad] = useState(false)
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const handleChangePaginate = (event, value) => {
        setPage(value);
    };
    // 

    // menu states
    const [anchorElLogout, setAnchorElLogout] = React.useState(null);
    const openLogout = Boolean(anchorElLogout);
    const handleClickLogout = (event) => {
        setAnchorElLogout(event.currentTarget);
    };
    const handleCloseLogout = () => {
        setAnchorElLogout(null);
    };
    // 

    // printing logic
    const handlePrintWith = useReactToPrint({
        content: () => componentRefWith.current,
    });
    const handlePrintWithPre = async(data) => {
        Swal.fire('loading . . .')
        Swal.showLoading()
        let checker = await checkIfExist(data)
        // console.log(checker)
        if (checker === 200) {
            Swal.close()
            if (data.participated === 'N') {
                Swal.fire({
                    title: 'Cannot Proceed to Printing',
                    text: 'Only who participated can proceed to printing of certificate',
                    icon: 'warning'
                })
                return
            }
            Swal.fire({
                title: 'Print Certificate',
                // text: "This will add the O.R. Date and will change the remarks!",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Print!'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire('loading . . .')
                    Swal.showLoading()
                    setPrintWithData(data)
                    setPrintWithInvoker(!printWithInvoker)
                    setTimeout(() => {
                        Swal.close()
                        handlePrintWith()
                    }, 300)
                }
            })
        }
        if (checker === 500) {
            Swal.close()
            Swal.fire({
                title: 'Data Not Found',
                text: 'Data does not exist in the database',
                icon: 'error'
            })
        }
    }

    const handlePrintWithout = useReactToPrint({
        content: () => componentRefWithout.current,
    });
    const handlePrintWithoutPre = async(data) => {
        Swal.fire('loading . . .')
        Swal.showLoading()
        let checker = await checkIfExist(data)
        // console.log(checker)
        if (checker === 200) {
            Swal.close()
            if (data.participated === 'N') {
                Swal.fire({
                    title: 'Cannot Proceed to Printing',
                    text: 'Only who participated can proceed to printing of certificate',
                    icon: 'warning'
                })
                return
            }
            Swal.fire({
                title: 'Print Certificate',
                // text: "This will add the O.R. Date and will change the remarks!",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Print!'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire('loading . . .')
                    Swal.showLoading()
                    setPrintWithoutData(data)
                    setPrintWithoutInvoker(!printWithoutInvoker)
                    setTimeout(() => {
                        Swal.close()
                        handlePrintWithout()
                    }, 300)
                }
            })
        }
        if (checker === 500) {
            Swal.close()
            Swal.fire({
                title: 'Data Not Found',
                text: 'Data does not exist in the database',
                icon: 'error'
            })
        }
    }

    // 

    // checker if data still exist or deleted
    const checkIfExist = (row) => {
        return new Promise((resolve, reject) => {
            axios.post(`/api/checkIfExist`, row)
                .then(res => {
                    if (res.data.status === 200) {
                        resolve(res.data.status)
                    }
                    if (res.data.status === 500) {
                        resolve(res.data.status)
                    }
                })
        })

    }

    // change event in adding
    const handleChange = (e) => {
        setBussinessInfo({ ...bussinessInfo, [e.target.name]: e.target.value })
    }

    // add new
    const handleAdd = async() => {
        if (bussinessInfo.amount === 100) {
            bussinessInfo.participated = ''
        }
        setIsStore('')
        setIsSubmit(true)
        setIsPagesLoad(true)
        axios.post(`/api/storeInfo`, bussinessInfo)
            .then(res => {
                console.log(res)
                // return
                setIsPagesLoad(false)
                setIsSubmit(false)
                if (res.data.status === 200) {
                    setIsStore(<p style={{ color: 'green', padding: 0, margin: 0 }}>data is saved!</p>)
                    setBussinessInfo({
                        firstname: '',
                        middlename: '',
                        lastname: '',
                        busName: '',
                        busLoc: '',
                        doneDate: '',
                        orNo: '',
                        amount: '',
                        date: '',
                        count: '',
                        with: '',
                        participated: '',
                        created: new Date().getMonth() + 1
                    })
                    // setBussinessInfoGetter(bussinessInfoGetter => [res.data.res, ...bussinessInfoGetter])
                    setBussinessInfoGetter(res.data.res.data)
                    setTotal(res.data.res.last_page)

                    setTimeout(() => handleCloseModalAdd(), 500)
                }
                if (res.data.status === 500) {
                    setIsStore(<p style={{ color: 'red', padding: 0, margin: 0 }}>failed to save!</p>)
                }
            })
            .catch(err => {
                setIsSubmit(false)
                setIsStore(<p style={{ color: 'red', padding: 0, margin: 0 }}>Server Error!</p>)
            })
    }


    const handleDelete = async (row) => {
        Swal.fire('loading . . .')
        Swal.showLoading()
        let checker = await checkIfExist(row)
        if (checker === 200) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire('deleting . . .')
                    Swal.showLoading()
                    axios.post(`/api/deleteInfo`, row)
                        .then(res => {
                            if (res.data.status === 200) {
                                const filtered = bussinessInfoGetter.filter((item) => item.id !== row.id)
                                setBussinessInfoGetter(filtered)
                                Swal.fire({
                                    title: res.data.message,
                                    icon: 'success'
                                })
                            }
                            if (res.data.status === 500) {
                                Swal.fire({
                                    title: res.data.message,
                                    icon: 'error'
                                })
                            }
                        })
                }
            })
        }
        if (checker === 500) {
            Swal.fire({
                title: 'Data Not Found',
                text: 'Data does not exist in the database',
                icon: 'error'
            })
        }


    }
    const handleSearch = () => {
        setIsPagesLoad(true)
        Swal.fire('searching . . .')
        Swal.showLoading()
        setPage(1)
        axios.post(`/api/searchInfo?page=1`, {
            search: search
        })
            .then(res => {
                setIsPagesLoad(false)
                Swal.close()
                if (res.data.status === 200) {
                    setTotal(res.data.res.last_page)
                    setBussinessInfoGetter(res.data.res.data)
                }
                if (res.data.status === 500) {
                    Swal.fire({
                        title: 'No record found!',
                        icon: 'question'
                    })
                }
            })
    }

    const handleChangeUser = () => {
        Swal.fire({
            title: 'Submit your pasword for verification',
            input: 'password',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Look up',
            showLoaderOnConfirm: true,
            preConfirm: (login) => {
                return axios.post(`/api/verifyPassword`, {
                    password: login,
                    username: localStorage.getItem('cenro_username')
                })
                    .then(res => {
                        return res.data.status
                    })
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                if (result.value === 500) {
                    Swal.fire({
                        title: 'Wrong Password!',
                        icon: 'error'
                    })
                }
                if (result.value === 200) {
                    handleOpenModalUser()
                }
            }
        })
    }

    const handleLogout = () => {
        Swal.fire('logging out . . .')
        Swal.showLoading()
        axios.post(`/api/logoutUser`)
            .then(res => {
                Swal.close()
                if (res.data.status === 200) {
                    localStorage.removeItem('cenro_name')
                    localStorage.removeItem('cenro_auth_token')
                    localStorage.removeItem('cenro_username')
                    navigate('/cenro/')
                }
                if (res.data.status === 500) {
                    Swal.fire({
                        title: res.data.message,
                        icon: 'warning'
                    })
                }
            })
    }

    useEffect(() => {
        let mounted = false
        setIsPagesLoad(true)
        if (search) {
            axios.post(`/api/searchInfo?page=${page}`, {
                search: search
            })
                .then(res => {
                    if (mounted) {
                        return
                    }
                    setIsPagesLoad(false)
                    Swal.close()
                    if (res.data.status === 200) {
                        setTotal(res.data.res.last_page)
                        setBussinessInfoGetter(res.data.res.data)
                    }
                    if (res.data.status === 500) {
                        Swal.fire({
                            title: 'No record found!',
                            icon: 'question'
                        })
                    }
                })
        }
        else {
            axios.get(`/api/fetch?page=${page}`)
                .then(res => {
                    setIsPagesLoad(false)
                    // console.log(res)
                    if (mounted) {
                        return
                    }
                    setIsFetch(false)
                    if (res.data.status === 200) {
                        setBussinessInfoGetter(res.data.res.data)
                        setTotal(res.data.res.last_page)
                    }
                    if (res.data.status === 500) {
                        setBussinessInfoGetter('')
                        Swal.fire({
                            title: 'Empty Data',
                            icon: 'error'
                        })
                    }
                })
        }

        return (() => {  //clean up lets go
            mounted = true
        })
    }, [page])
    useEffect(() => {
        if (firstRender.current) {
            handleSearch()
        }
        else {
            firstRender.current = true
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [forceFetch])

    useEffect(() => {
        setCenroName(localStorage.getItem('cenro_name'))
    }, [])
    useEffect(()=> {
        setBussinessInfo({...bussinessInfo,created: new Date().getMonth()+1})
    },[])
    return (
        <>
            <Grid container spacing={2}>
                <CssBaseline />
                {/* add modal */}
                <Modal
                    open={openModalAdd}
                    onClose={handleCloseModalAdd}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        height: '95%',
                        overflow: 'scroll',
                        bgcolor: 'background.paper',
                        borderRadius: '5px',
                        boxShadow: 24,
                        px: 2,
                    }}>
                        {isSubmit ? (<LinearProgress />) : null}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', bm: 1, p: 2 }} fullWidth>
                            <Typography variant="h6">Register</Typography>
                            {isStore}
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
                            <Button variant="contained" size="large" onClick={handleAdd}>submit</Button>
                            <Box>
                            </Box>
                        </Box>
                    </Box>
                </Modal>
                {/* edit modal below */}
                <Modal
                    open={openModalEdit}
                    onClose={handleCloseModalEdit}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        height: '97%',
                        overflow: 'scroll',
                        bgcolor: 'background.paper',
                        borderRadius: '5px',
                        boxShadow: 24,
                        px: 2,
                    }}>
                        <Edit data={edit} setForceFetch={setForceFetch} forceFetch={forceFetch} setSearch={setSearch} handleCloseModalEdit={handleCloseModalEdit} />
                    </Box>
                </Modal>
                {/* modal export */}
                <Modal
                    open={openModalExport}
                    onClose={handleCloseModalExport}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '90%',
                        height: '95%',
                        overflow: 'scroll',
                        bgcolor: 'background.paper',
                        borderRadius: '5px',
                        boxShadow: 24,
                        p: 4,
                    }}>
                        <Export />
                    </Box>
                </Modal>
                {/* user modal below */}
                <Modal
                    open={openModalUser}
                    onClose={handleCloseModalUser}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        height: '75%',
                        overflow: 'scroll',
                        bgcolor: 'background.paper',
                        borderRadius: '5px',
                        boxShadow: 24,
                        px: 2,
                    }}>
                        <User setCenroName={setCenroName} />
                    </Box>
                </Modal>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <AppBar position="static" sx={{ backgroundImage: `url(${HeaderV2})`, backgroundSize: '100% 100%  ' }}>
                        <Toolbar>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                CENRO BUTUAN CERTIFICATE GENERATOR
                            </Typography>
                            <Button sx={{ color: '#fff' }}>
                                {cenroName}
                            </Button>
                            <Tooltip title="Account Actions">
                                <Fab
                                    color="primary"
                                    aria-label="add"
                                    sx={{ width: 40, height: 40, color: '#fff' }}
                                    id="basic-button"
                                    aria-controls="basic-menu"
                                    aria-haspopup="true"
                                    aria-expanded={openLogout ? 'true' : undefined}
                                    onClick={handleClickLogout}
                                    size="small"
                                >
                                    <AccountCircleIcon />
                                </Fab>
                            </Tooltip>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorElLogout}
                                open={openLogout}
                                onClose={handleCloseLogout}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={handleChangeUser} sx={{ color: 'green' }}> <EditIcon />  &nbsp; Change user credentials  </MenuItem>
                                <MenuItem onClick={handleLogout} sx={{ color: 'red' }}><Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}> <ExitToAppIcon /> &nbsp;Logout </Box> </MenuItem>
                            </Menu>
                        </Toolbar>
                    </AppBar>
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ p: 2 }}>
                <CssBaseline />
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <div style={{ display: 'none' }}>
                        <div ref={componentRefWith}>
                            {printWithData ? (<PrintWith data={printWithData && printWithData} printWithInvoker={printWithInvoker} />) : null}

                        </div>
                    </div>
                    <div style={{ display: 'none' }}>
                        <div ref={componentRefWithout}>
                            {printWithoutData ? (<PrintWithout data={printWithoutData && printWithoutData} printWithoutInvoker={printWithoutInvoker} />) : null}
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mt: -2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box>
                            <Tooltip title="Export Data">
                                <Fab color="primary" aria-label="add" size="small" onClick={handleOpenModalExport}>
                                    <ImportExportIcon />
                                </Fab>
                            </Tooltip>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
                            <TextField id="outlined-basic" label="Search" variant="outlined" size="small" sx={{ mr: 1 }} value={search} onChange={(e) => setSearch(e.target.value)} />
                            <Button variant="contained" onClick={handleSearch}><SearchIcon /></Button>
                        </Box>
                    </Box>
                    {isFetch ? (<LinearProgress />) : null}
                    <TableContainer component={Paper} style={{ maxHeight: '58vh', height: '58vh' }}>
                        {isPagesLoad ? (<LinearProgress />) : null}
                        <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ color: '#fff', bgcolor: '#102027' }}>Bussiness Owner Name</TableCell>
                                    <TableCell align="left" sx={{ color: '#fff', bgcolor: '#102027' }}>Bussiness Name</TableCell>
                                    <TableCell align="center" sx={{ color: '#fff', bgcolor: '#102027' }}>Remarks</TableCell>
                                    <TableCell align="center" sx={{ color: '#fff', bgcolor: '#102027' }}>Participated</TableCell>
                                    <TableCell align="right" sx={{ color: '#fff', bgcolor: '#102027' }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {bussinessInfoGetter && bussinessInfoGetter.map((row, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        className="bussiness-row"
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.firstname} {row.middlename} {row.lastname}
                                        </TableCell>
                                        <TableCell align="left">{row.bus_name}</TableCell>
                                        <TableCell align="center" sx={{ bgcolor: row.date ? '' : 'red', color: row.date ? '' : '#fff' }}>{row.date ? 'Printed Date' : 'No O.R.'}</TableCell>
                                        <TableCell align="center" sx={{ bgcolor: row.participated === 'N' ? 'red' : row.participated === 'Y' ? 'green' : '', color: row.participated === 'N' ? '#fff' : row.participated === 'Y' ? '#fff' : '' }}>{row.participated === 'N' ? 'No' : row.participated === 'Y' ? 'Yes' : 'New'}</TableCell>
                                        <TableCell align="right" sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                            <ThemeProvider theme={buttonsTheme}>
                                                <Tooltip title="Delete" >
                                                    <Fab aria-label="print_with" size="small" color="secondary" onClick={() => handleDelete(row)} >
                                                        <DeleteIcon />
                                                    </Fab>
                                                </Tooltip>
                                            </ThemeProvider>
                                            <ThemeProvider theme={buttonsTheme}>
                                                <Tooltip title="Edit">
                                                    <Fab color="primary" aria-label="print_with" size="small" sx={{ mr: 1 }} onClick={() => handleOpenModalEdit(row)}>
                                                        <EditIcon />
                                                    </Fab>
                                                </Tooltip>
                                            </ThemeProvider>
                                            {row.with_env === 'T' ? (
                                                <Tooltip title="Print with environmental impact" >
                                                    <Fab color="primary" aria-label="print_with" size="small" sx={{ mr: 1 }} onClick={() => handlePrintWithPre(row)}>
                                                        <PrintIcon />
                                                    </Fab>
                                                </Tooltip>
                                            ) : (
                                                <Tooltip title="Print without environmental impact" >
                                                    <Fab aria-label="print_with" size="small" color="secondary" sx={{ mr: 1 }} onClick={() => handlePrintWithoutPre(row)}>
                                                        <PrintIcon />
                                                    </Fab>
                                                </Tooltip>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Stack spacing={2} sx={{ mt: 2 }}>
                        <Pagination count={total} page={page} variant="outlined" color="primary" shape="rounded" onChange={handleChangePaginate} />
                    </Stack>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, position: 'fixed', top: '80%', left: '90%' }}>
                        <Tooltip title="Add new">
                            <Fab color="primary" aria-label="add" sx={{ width: 80, height: 80 }} onClick={handleOpenModalAdd}>
                                <AddIcon sx={{ fontSize: '50px' }} />
                            </Fab>
                        </Tooltip>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}

export default Home;
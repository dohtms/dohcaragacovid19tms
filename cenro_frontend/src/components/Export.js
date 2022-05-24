import React, { useState } from 'react'
import { Box, Grid, Typography, Card, CardContent, TextField, Button } from '@mui/material'
import ImportExportIcon from '@mui/icons-material/ImportExport';
import ViewComfyIcon from '@mui/icons-material/ViewComfy';
import { Tooltip, Fab,CircularProgress } from '@mui/material';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ReactExport from "react-export-excel";
import axios from 'axios'
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


const Export = () => {
    const [dateFrom, setDateFrom] = useState('')
    const [dateTo, setDateTo] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isView,setIsView] = useState(false)
    const [toExport,setToExport] = useState('')
    // const [isShowExportBtn,set]

    const viewExport = () => {
        setIsLoading(false)
        setIsView(true)
        axios.post(`/api/exportInfo`, {
            dateFrom: dateFrom,
            dateTo: dateTo
        })
            .then(res => {
                setIsView(false)
                setIsLoading(true)
                setToExport(res.data.res)
            })
    }
    return (
        <Box sx={{ flexGrow: 1, p: 0, m: 0 }}>
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', bgcolor: 'green', p: 1, color: '#fff', textAlign: 'left', mb: 1, width: '100%' }}>Export &nbsp; <ImportExportIcon /></Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                    <Card sx={{ mt: 2 }}>
                        <CardContent>
                            <TextField variant="outlined" focused label="Date From" type="date" fullWidth sx={{ mb: 1 }} value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
                            <TextField variant="outlined" focused label="Date To" type="date" fullWidth sx={{ mb: 2 }} value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button variant="contained" size="large" onClick={viewExport}> {isView ? (<CircularProgress sx={{color:'#fff'}} size={25} />) : (<ViewComfyIcon />)} &nbsp;View</Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={8} lg={8}>
                    {/* {isLoading ? (<Box> */}
                        <Box>
                            <TableContainer component={Paper} style={{ maxHeight: '70vh',height: '70vh' }}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell align="center">Bussiness Name</TableCell>
                                            <TableCell align="center">Date Created</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {toExport && toExport.map((row,index) => (
                                            <TableRow
                                                key={index}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {row.firstname} {row.middlename} {row.lastname}
                                                </TableCell>
                                                <TableCell align="center">{row.bus_name}</TableCell>
                                                <TableCell align="center">{row.created_at}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            {toExport ? (<>
                                <ExcelFile element={
                                <Tooltip title="Download Excel File" placement="top">
                                    <Fab color="primary" aria-label="add" size="large" sx={{ mt: 2 }}>
                                        <SimCardDownloadIcon />
                                    </Fab>
                                </Tooltip>
                            } 
                            filename={dateFrom + '_' + dateTo + '_bussinessExported'}
                            >
                                <ExcelSheet data={toExport && toExport} name="Bussiness Info" >
                                    <ExcelColumn label="Firstname" value="firstname" />
                                    <ExcelColumn label="Middlename" value="middlename" />
                                    <ExcelColumn label="Lastname" value="lastname" />
                                    <ExcelColumn label="Bussiness Name" value="bus_name" />
                                    <ExcelColumn label="Date created" value="created_at" />
                                    <ExcelColumn label="Or No" value="or_no" />
                                </ExcelSheet>
                            </ExcelFile>
                            </>) : null}
                        </Box>
                    {/* </Box>) : (<LinearProgress />)} */}
                </Grid>
            </Grid>
        </Box>
    );
}

export default Export;
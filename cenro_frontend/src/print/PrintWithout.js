import React, { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import Img1 from '../assets/img/b.png'
import Img1a from '../assets/img/a.png'
import Esig from '../assets/img/e.png'
import Bt from '../assets/img/bt.png'
import moment from 'moment'

const monthArr = [];
monthArr[0] = "January";
monthArr[1] = "February";
monthArr[2] = "March";
monthArr[3] = "April";
monthArr[4] = "May";
monthArr[5] = "June";
monthArr[6] = "July";
monthArr[7] = "August";
monthArr[8] = "September";
monthArr[9] = "October";
monthArr[10] = "November";
monthArr[11] = "December";

const PrintWidthout = React.forwardRef((props, ref) => {
    const [count, setCount] = useState('')
    const [superS,setSuperS] = useState('')
    const [doneDate, setDoneDate] = useState({
        day:'',
        month:''
    })
    const ordinalSuffix = (i) => {
        let j = i % 10,
            k = i % 100;
        if (j === 1 && k !== 11) {
            setSuperS("st")
            return i ;
        }
        if (j === 2 && k !== 12) {
            setSuperS("nd")
            return i ;
        }
        if (j === 3 && k !== 13) {
            setSuperS("rd")
            return i ;
        }
        setSuperS("th")
        return i ;
    }
    useEffect(() => {
        const d = new Date();
        let year = d.getFullYear()
        let month = d.getMonth();
        const temp = props.data.count
        const temp2 = temp < 10 ? '000' + temp : temp >= 10 && temp < 100 ? '00' + temp : temp >= 100 && temp < 1000 ? '0' + temp : temp
        let datess = new Date(props.data.created_at)
        const dater = (datess.getMonth() +1) + ' - ' + temp2 + ' - ' + year
        // let day = new Date(props.data.done_date)
        setDoneDate({
            ...doneDate,
            day: ordinalSuffix(datess.getDate()),
            month: monthArr[datess.getMonth()]
        })
        setCount(dater)
        // eslint-disable-next-line react-hooks/exhaustive-deps
}, [props.printWithoutInvoker])
    return (
        <Box ref={ref} sx={{ width: '787.2px', height: '99%', overflow: 'hidden', m: 0, p: 0, pt: '48px' }}>
            <header style={{ padding: '0px', margin: '0px' }}>
                <div style={{ width: '100%', display: 'flex', marginBottom: '10px' }}>
                    <div style={{ width: '15%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <img src={Img1} alt="butuan_logo" width="80" />
                    </div>
                    <div style={{ width: '70%' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <p style={{ padding: 0, margin: 0, fontSize: '19px', fontFamily: 'Monotype Corsiva',lineHeight: '18px' }}><b>Republic of the Philippines</b></p>
                            <p style={{ padding: 0, margin: 0, fontSize: '16px', fontFamily: 'Bookman Old Style', color: 'green',lineHeight: '18px' }}><b>CITY ENVIRONMENT AND NATURAL RESOURCES OFFICE</b></p>
                            <p style={{ padding: 0, margin: 0, fontSize: '12px', fontFamily: 'Century Gothic',lineHeight: '18px' }}>CARBDP Building, Motorpool, Doongan, Butuan City</p>
                            <p style={{ padding: 0, margin: 0, fontSize: '16px', fontFamily: 'Century Gothic',lineHeight: '18px' }}>Tel. No. 817-5259</p>
                        </div>
                    </div>
                    <div style={{ width: '15%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <img src={Img1a} alt="cenro" width="80" />
                    </div>
                </div>
            </header>
            <div style={{ margin: 0, padding: '0px 96px', paddingBottom: '48px' }}>
                <div style={{ width: '100%', borderBottom: '2px solid black', marginBottom: '15px', borderColor: 'green' }}></div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <p style={{ padding: 0, margin: 0, fontSize: '16px', fontFamily: 'Lucida Calligraphy',lineHeight: '18px' }}><b>ENVIRONMENTAL CLEARANCE</b></p>
                    <p style={{ padding: 0, margin: 0, fontSize: '14px', color: 'green',lineHeight: '18px' }}>WITHOUT ENVIRONMENTAL IMPACT</p>
                    <p style={{ padding: 0, margin: 0, fontSize: '12px', fontFamily: 'Copperplate Gothic Light',lineHeight: '18px' }}>EC No. <u>BXU - {count}</u></p>
                </div>
                <div>
                    <p style={{ padding: 0, margin: 0, fontSize: '13px', marginBottom: '5px' }}><b>To whom it may concern:</b></p>
                    <p style={{ padding: 0, margin: 0, fontSize: '13px', marginBottom: '15px', fontFamily: 'Century Gothic', textAlign: 'justify',textIndent: '25px' }}>
                        This Environmental Clearance is hereby granted to <u style={{ marginRight: '5px' }}><b>{props.data.firstname.toUpperCase()} {props.data.middlename.toUpperCase()} {props.data.lastname.toUpperCase()}</b></u>
                        for its <u><b>{props.data.bus_name.toUpperCase()}</b></u> located at <u><b>{props.data.bus_loc}</b></u>, Butuan City pursuant to <b>SP Resolution 010-2010.</b>
                    </p>
                    <p style={{ padding: 0, margin: 0, fontSize: '13px', textIndent: '25px', fontFamily: 'Century Gothic', textAlign: 'justify', marginBottom: '15px' }}>
                    Thus, this is to certify that the aforementioned business/project has no potential adverse environmental impact as being exempted based on the lists of projects with potential
                     environmental impact pursuant to <b>SP Resolution 010-2010 </b>. 
                    </p>
                    <p style={{ padding: 0, margin: 0, fontSize: '13px', textIndent: '25px', marginBottom: '15px', fontFamily: 'Century Gothic', textAlign: 'justify' }}>
                        Moreover, the same shall be subject to the compliance of the following conditions within thirty (30) days after issuance hereof.
                    </p>
                    <div style={{ display: 'flex' }}>
                        <div style={{ width: '3%' }}>
                            <p style={{ padding: 0, margin: 0, fontSize: '13px', marginBottom: '15px', fontFamily: 'Century Gothic' }}>
                                1.
                            </p>
                        </div>
                        <div style={{ width: '97%', paddingLeft: '5px' }}>
                            <p style={{ padding: 0, margin: 0, fontSize: '13px', marginBottom: '15px', fontFamily: 'Century Gothic' }}>
                                Compliance to <b>SP Ordinance 5334-2017</b> "An Oridinance regulating the use of plastics by-products in Butuan City, prescribing penalties for violation thereof, repealing for this purpose <b>SP Ordinance 5064-2016</b>,
                                and for other purposes";
                            </p>
                        </div>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <div style={{ width: '3%' }}>
                            <p style={{ padding: 0, margin: 0, fontSize: '13px', fontFamily: 'Century Gothic' }}>
                                2.
                            </p>
                        </div>
                        <div style={{ width: '97%', paddingLeft: '5px' }}>
                            <p style={{ padding: 0, margin: 0, fontSize: '13px', fontFamily: 'Century Gothic' }}>
                                Compliance to <b>E.O. 191;</b>
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <div style={{ width: '5%', display: 'flex', justifyContent: 'flex-end' }}>
                                    <p style={{ padding: 0, margin: 0, fontSize: '13px', fontFamily: 'Century Gothic' }}>
                                        a.
                                    </p>
                                </div>
                                <div style={{ width: '95%', marginLeft: '5px' }}>
                                    <p style={{ padding: 0, margin: 0, fontSize: '13px', fontFamily: 'Century Gothic' }}>
                                        Provision of segregation bins within the establishment for biodegradable, residual special and recyclable wastes.
                                    </p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <div style={{ width: '5%', display: 'flex', justifyContent: 'flex-end' }}>
                                    <p style={{ padding: 0, margin: 0, fontSize: '13px', fontFamily: 'Century Gothic' }}>
                                        b.
                                    </p>
                                </div>
                                <div style={{ width: '95%', marginLeft: '5px' }}>
                                    <p style={{ padding: 0, margin: 0, fontSize: '13px', marginBottom: '15px', fontFamily: 'Century Gothic' }}>
                                        Practice of segregation and reduction at source.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <div style={{ width: '3%' }}>
                            <p style={{ padding: 0, margin: 0, fontSize: '13px', marginBottom: '15px', fontFamily: 'Century Gothic' }}>
                                3.
                            </p>
                        </div>
                        <div style={{ width: '97%', paddingLeft: '5px' }}>
                            <p style={{ padding: 0, margin: 0, fontSize: '13px', marginBottom: '15px', fontFamily: 'Century Gothic' }}>
                                Compliance to <b>SP Ordinance 5445-2017</b> "Anti-illegal Dumping Ordinance".
                            </p>
                        </div>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <div style={{ width: '3%' }}>
                            <p style={{ padding: 0, margin: 0, fontSize: '13px', marginBottom: '15px', fontFamily: 'Century Gothic' }}>
                                4.
                            </p>
                        </div>
                        <div style={{ width: '97%', paddingLeft: '5px' }}>
                            <p style={{ padding: 0, margin: 0, fontSize: '13px', marginBottom: '15px', fontFamily: 'Century Gothic' }}>
                                Avoid open burning of garbage, trash and other solid wastes or any other refused materials including used tires, rubbers, plastics,
                                styrofaom, mattress and the like, as provided in <b>SP Ordinance 3617-2010;</b>
                            </p>
                        </div>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <div style={{ width: '3%' }}>
                            <p style={{ padding: 0, margin: 0, fontSize: '13px', marginBottom: '15px', fontFamily: 'Century Gothic' }}>
                                5.
                            </p>
                        </div>
                        <div style={{ width: '97%', paddingLeft: '5px' }}>
                            <p style={{ padding: 0, margin: 0, fontSize: '13px', marginBottom: '15px', fontFamily: 'Century Gothic' }}>
                                Participation to Environmental Awareness-Raising Seminar on Noise, Air, Water and Land-based Pollutions Mitigation and Prevention.
                            </p>
                        </div>
                    </div>
                    <p style={{ padding: 0, margin: 0, fontSize: '13px', marginBottom: '15px', fontFamily: 'Century Gothic', textAlign: 'justify',textIndent:'25px' }}>
                        This Environmental Clearance is issued upon the request of <u><b>{props.data.firstname.toUpperCase()} {props.data.middlename.toUpperCase()} {props.data.lastname.toUpperCase()}</b></u> in compliance to the standard procedural flow for the issuance of Mayor's Business permit pursuant to <b>SP Resolution 010-2010</b> and <b>SP Ordinance 3617-2010,</b> otherwise known as the "<b>Butuan City Environmental Code</b>".
                    </p>
                    <p style={{ padding: 0, margin: 0, fontSize: '13px', textIndent: '10px', marginBottom: '15px', fontFamily: 'Century Gothic' }}>
                        Done this <u>{doneDate.day}</u><sup>{superS}</sup> day of {doneDate.month}, {moment(props.data.created_at).format('YYYY')} at Butuan City, Philippines.
                    </p>
                    <div style={{ display: 'flex', marginTop: '70px' }}>
                        <div style={{ width: '25%' }}></div>
                        <div style={{ width: '25%' }}></div>
                        <div style={{ width: '50%', position: 'relative' }}>
                            <img src={Esig} alt="esig" width="200" style={{ position: 'absolute', top: '-150px', left: 55, background: 'transparent' }} />
                            <p style={{ padding: 0, margin: 0, fontSize: '13px', textIndent: '10px', textAlign: 'center', fontFamily: 'Century Gothic' }}><b>FOR. ALEXANDER C. ALAAN, DPA</b></p>
                            <p style={{ padding: 0, margin: 0, fontSize: '13px', textIndent: '10px', textAlign: 'center', fontFamily: 'Century Gothic' }}>City Gov't. Dept. Head II</p>
                            <p style={{ padding: 0, margin: 0, fontSize: '13px', textIndent: '10px', textAlign: 'center', fontFamily: 'Century Gothic' }}><b>City ENR Officer</b></p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <p style={{ padding: 0, margin: 0, fontSize: '12px', textIndent: '10px', textAlign: 'left', textDecorationLine: 'overline', width: '100px', marginTop: '10px', marginBottom: '10px', fontFamily: 'Century Gothic' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Conformed&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                        <div style={{ display: 'flex' }}>
                            <div style={{ width: '130px' }}>
                                <p style={{ padding: 0, margin: 0, fontSize: '12px', textIndent: '10px', textAlign: 'left', fontFamily: 'Century Gothic' }}>Paid under OR. No. </p>
                            </div>
                            <div style={{ width: '200px', paddingLeft: '0px' }}>
                                <p style={{ padding: 0, margin: 0, fontSize: '12px', textAlign: 'left', fontFamily: 'Century Gothic' }}>:&nbsp;&nbsp;<u><b>{props.data.or_no}</b></u></p>
                            </div>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <div style={{ width: '130px' }}>
                                <p style={{ padding: 0, margin: 0, fontSize: '12px', textIndent: '10px', textAlign: 'left', fontFamily: 'Century Gothic' }}>Amount </p>
                            </div>
                            <div style={{ width: '200px', paddingLeft: '0px' }}>
                                <p style={{ padding: 0, margin: 0, fontSize: '12px', textAlign: 'left', fontFamily: 'Century Gothic' }}>:&nbsp;&nbsp;<u><b>PHP {props.data.amount}</b></u></p>
                            </div>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <div style={{ width: '130px' }}>
                                <p style={{ padding: 0, margin: 0, fontSize: '12px', textIndent: '10px', textAlign: 'left', fontFamily: 'Century Gothic' }}>Date </p>
                            </div>
                            <div style={{ width: '200px', paddingLeft: '0px' }}>
                                <p style={{ padding: 0, margin: 0, fontSize: '12px', textAlign: 'left', fontFamily: 'Century Gothic' }}>:&nbsp;&nbsp;<u><b>{props.data.date}</b></u></p>
                            </div>
                        </div>
                    </div>
                    <div style={{ position: 'absolute', bottom: '0', left: '250px' }}>
                        <img src={Bt} alt="bt" width="500" style={{ opacity: '.5' }} />
                    </div>
                </div>
            </div>
        </Box>
    );
})

export default PrintWidthout;
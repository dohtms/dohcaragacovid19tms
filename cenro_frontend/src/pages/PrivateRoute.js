import React, {useEffect,useState} from 'react'
import { Navigate,useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
const PrivateRoute = ({children}) => {
    const Navigator = useNavigate()
    const [isAuth,setIsAuth] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(()=> {
        axios.get(`/api/checkAuth`)
        .then(res => {
            if(res.data.status === 200){
                setIsAuth(true)
            }
            else {
                setIsAuth(false)
            }
            setLoading(false)
        })
        .catch(err => {
            if(err.response.status === 401){
                Navigator('/cenro/')
                Swal.fire({
                    title:'Unauthenticated',
                    icon:'warning'
                })
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    if(loading){
        return <h1></h1>
    }
    return isAuth ? children : <Navigate to="/" />
}
 
export default PrivateRoute;
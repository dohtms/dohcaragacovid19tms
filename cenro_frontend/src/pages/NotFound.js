import Img from '../assets/img/404.svg'
const NotFound = () => {
    return ( 
        <div style={{display:'flex',flexGrow:1,justifyContent:'center', alignItems:'center',flexDirection:'column',height:'100vh'}}>
            <h1>Page Not Found!</h1>
            <img src={Img} alt="" width="800" />
        </div>
     );
}
 
export default NotFound;
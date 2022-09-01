import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
// import DropdownItem from 'react-bootstrap/esm/DropdownItem';
// import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import { Link } from 'react-router-dom';
import "./AfterLoginHeader.css" 
const styles = {
    title: {
        fontFamily:'Courier New',
        fontSize: '1.1em',
        fontWeight: 'bold',
        color: 'white',
        marginLeft:'25px',
        marginRight:'30px',
        padding:'0',
    },
    login: {
        fontFamily:'Courier New',
        marginLeft:'0',
        marginRight:'-5',
        color:'white', 
        fontWeight:'bold',
        fontSize:'1.1em'
    },
    logout: {
        fontFamily:'Courier New',
        marginLeft:'0',
        marginRight:'-5',
        color:'white', 
        fontWeight:'bold',
        fontSize:'1.1em',
        backgroundColor:'#5C0632'
    },
    signup: {
        fontFamily:'Courier New',
        margin:'0',
        marginRight:'55px',
        color:'white', 
        fontWeight:'bold',
        fontSize:'1.1em',
    },
    logo: {
      marginLeft: '5px',
      width:'200px',
      height:'50px',
    },
    userlogo: {
        marginLeft: '0px',
        width:'30px',
        height:'30px',
        marginTop:'7px'
      },
    navbar: {
    backgroundColor:'#800000',
    position:'top',
    },

  }



const AfterLoginHeader=()=> {
    const navigate =useNavigate()
    const Logout = () => {
      
    sessionStorage.clear();

    toast.success('Logged Out Successfully')
       navigate('/')
    }

  const { firstName, lastName }=sessionStorage
    return (

    <header>
    <nav class="navbar navbar-expand-md navbar-light " style={styles.navbar}>
        <div class="container-fluid topcolor">
            <a href="/" class="navbar-brand">
           
            </a>
            <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse" >
                <div class="navbar-nav" >
                    <a  href="/" class="nav-item nav-link active"style={styles.title}>Home</a>
                    <a href="/about" class="nav-item nav-link"style={styles.title}>About</a>
                    <a href="/resources" class="nav-item nav-link"style={styles.title}>Resources</a>
                    <a href="/downloads" class="nav-item nav-link"style={styles.title}>Downloads</a>
                    <a href="/FAQs" class="nav-item nav-link"style={styles.title}>FAQs</a>
                                     
                </div>
                <div class="navbar-nav ms-auto">
                <a href="/">
            </a>           
            <div className="float-end">
            
              <div className="btn-group " role="group">
                <button
                  id="btnGroupDrop1"
                  type="button"
                  className="btn btn-primary border-0 dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{backgroundColor:'#5C0632', fontFamily:'Courier New', fontWeight:'bold', fontSize:"1.1em",marginTop:'4.5px'}}
                  >Welcome {firstName}
                </button>
                <ul className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                    <li>
                    <button onClick={Logout} className="dropdown-item">
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            </div>
            </div>
        </div>
    </nav>
    
</header>
    );
  }
  export default AfterLoginHeader;
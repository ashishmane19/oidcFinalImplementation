import axios from 'axios'
import React from 'react'
import AfterLoginHeader from '../Components/AfterLoginHeader'
import {URL} from '../config';
import useParams, { Link } from "react-router-dom";


export const LoginSuccessful = () => {
 
  
  const authCode = window.location.query.code;
  const stateId = window.location.query.state;
  console.log("in loginSuccessful api");
  console.log("authCode => " + authCode);
  console.log("stateId => " + stateId);

// let link = URL+"/loginSuccessful";
// axios.post(link).then((response) => {
//   const link = response.data;
//   console.log("Link => " +link);
//  // setLink(link);
// })

// let {code, state} = useParams();

//Code to consume response of the redirected uri

// fetch(url, { method: 'POST', redirect: 'follow'})
//     .then(response => {
//         // HTTP 301 response
//     })
//     .catch(function(err) {
//         console.info(err + " url: " + url);
//     });

const login = () => {

  // fetch(Link, { method: 'POST', redirect: 'follow'})
  //   .then(response => {
  //       // HTTP 301 response
  //       console.log(response.headers)
  //   })
  //   .catch(function(err) {
  //       console.info(err + " url: " + link);
  //   });


}




  return (

    <div>
        <AfterLoginHeader/>
        <div style={{ backgroundColor: '#E5E4E2' }} >
                <br />
                <h1
                    style={{ textAlign: "center", fontWeight: 'bolder' }}>
                    Logged in Successfully!
                </h1>
                {/* <div> Auth Code : {code}</div>
                <div> State : {state}</div> */}

                {/* <div>Code = {JSON.stringify(code)}</div> */}
                {/* <div>State = {JSON.stringify(state)}</div> */}

            </div>
    </div>
  )
}

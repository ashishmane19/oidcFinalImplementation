import AfterLoginHeader from "./AfterLoginHeader"
import Header from "./Header"


const HeaderSelector = () =>{
    const loginStatus = sessionStorage['loginStatus']
	if(loginStatus=='1')
    return <AfterLoginHeader />
	else
    return <Header />
  }

  export default HeaderSelector
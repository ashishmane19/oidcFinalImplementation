import HeaderSelector from "../Components/HeaderSelector";



const styles = {
    heading: {
        fontWeight: "bold",
        fontSize: '20px',
        padding: '10px',
        marginLeft: '15px'

    },

    content: {
        fontSize: '15px',
        marginLeft: '20px'
    }


}


const AnyPage = () => {

console.log(' href => ' + window.location.href);
console.log(' host => ' + window.location.host);
console.log(' hostname => ' + window.location.hostname);
console.log(' port => ' + window.location.port);
console.log(' protocol => ' + window.location.protocol);
console.log(' pathname => ' + window.location.pathname);
console.log(' hashpathname => ' + window.location.hash);
console.log(' search=> ' + window.location.search)


    return (
        <div>
            <HeaderSelector />


            <div style={{ backgroundColor: '#E5E4E2' }} >
                <br />
                <h1
                    style={{ textAlign: "center", fontWeight: 'bolder' }}>
                    Any Page
                </h1>
            </div>
        </div>


    );
}

export default AnyPage
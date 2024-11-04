import Maps from "./Maps.jsx";
import SearchBox from "./SearchBox.jsx";

function Distance_Page(){
    return (
        <>
            <div style={{
                display: "flex",
                flexDirection: "row",
                width: "100vw",
                height: "100vh",
            }}>
                <div style={ { width:"50vw", height:"100%"}}>
                    <Maps/>
                </div>
                <div style={ {width:"50vw", marginLeft:"20px"}}>
                    <SearchBox/>
                </div>
            </div>
        </>
    )
 }
 export default Distance_Page;
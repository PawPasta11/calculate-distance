import { useState } from "react";
import Maps from "./Maps.jsx";
import SearchBox from "./SearchBox.jsx";

function Distance_Page() {
    const [selectPosition, setSelectPosition] = useState(null);
    console.log(selectPosition);
    return (
        <>
            <div style={{
                display: "flex",
                flexDirection: "row",
                width: "100vw",
                height: "100vh",
            }}>
                <div style={{ width: "50vw", height: "100%" }}>
                    <Maps selectPosition={selectPosition} />
                </div>
                <div style={{ width: "50vw", marginLeft: "20px", marginTop: "20px" }}>
                    <SearchBox selectPosition={selectPosition} setSelectPosition={setSelectPosition} />
                </div>
            </div>
        </>
    );
}

export default Distance_Page;
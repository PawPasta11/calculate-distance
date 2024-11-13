
import OutlinedInput from '@mui/material/OutlinedInput';
import {Button, Divider, ListItemIcon, ListItemText} from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { IoLocationSharp } from "react-icons/io5";
import {useState} from "react";

const NONIMATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

export default function SearchBox(props) {
    const {selectPosition, setSelectPosition } = props// eslint-disable-line
    const [searchText, setSearchText] = useState("");
    const [listPlace, setListPlace] = useState([]);
    console.log(searchText);
    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex' }}>
                    <div style={{ flex: 1 }}>
                        <OutlinedInput 
                        style={{ width: '100%' }} 
                        value={searchText} 
                        onChange={(event) => {
                            setSearchText(event.target.value);
                        }}
                         />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', padding: "0px 20px" }}>
                        <Button variant="contained" color="primary" onClick={() =>{
                            //Search
                            const params = {
                                q: searchText,
                                format: 'json',
                                addressdetails: 1,
                                polygon_geojson: 0,
                                
                            };
                            const queryString = new URLSearchParams(params).toString();
                            const requestOption = {
                                method: "GET",
                                redirect: "follow"
                            };
                            fetch(`${NONIMATIM_BASE_URL}${queryString}`, requestOption)
                            .then((response) => response.text())
                            .then((result) => {
                                console.log(JSON.parse(result));
                                setListPlace(JSON.parse(result));
                                console.log(`${NONIMATIM_BASE_URL}${queryString}`)
                            })
                            .catch((err) => console.log("err: ", err))
                        }}>
                            Search
                        </Button>
                    </div>
                </div>
                <List component="nav" aria-label="main mailbox folders">
                    {
                        listPlace.map((item) => {
                            return (
                                <div key={item?.osm_id}>
                                    <ListItem 
                                    button 
                                    onClick={() =>{
                                       setSelectPosition(item);
                                    }}>
                                        <ListItemIcon>
                                            <IoLocationSharp size={30} color="Blue" />
                                        </ListItemIcon>
                                        <ListItemText primary={item?.display_name} />
                                    </ListItem>
                                    <Divider/>
                                </div>
                            );
                        })
                    }

                </List>
            </div>
        </>
    );
}




import OutlinedInput from '@mui/material/OutlinedInput';
import {Button, Divider, ListItemIcon, ListItemText} from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { IoLocationSharp } from "react-icons/io5";
import {useState} from "react";

function SearchBox() {
    const [searchText, setSearchText] = useState("");

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex' }}>
                    <div style={{ flex: 1 }}>
                        <OutlinedInput style={{ width: '100%' }} value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', padding: "0px 20px" }}>
                        <Button variant="contained" href="#contained-buttons">
                            Search
                        </Button>
                    </div>
                </div>
                <List component="nav" aria-label="main mailbox folders">
                    {
                        [1,2,3,4,5].map((item) => {
                            return (
                                <div key={item}>
                                    <ListItem button>
                                        <ListItemIcon>
                                            <IoLocationSharp size={30} color="Blue" />
                                        </ListItemIcon>
                                        <ListItemText primary="Inbox" />
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

export default SearchBox;

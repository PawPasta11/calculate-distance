import { useState } from "react";
import OutlinedInput from '@mui/material/OutlinedInput';
import { Button, Divider, ListItemIcon, ListItemText } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { IoLocationSharp } from "react-icons/io5";
import './Distance_Page.css';  // Import file CSS
import { getDistance } from 'geolib';  // Import geolib for distance calculation

const NONIMATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

export default function SearchBox(props) {
    const { selectPosition, setSelectPosition } = props; // eslint-disable-line
    const [searchText, setSearchText] = useState("");
    const [listPlace, setListPlace] = useState([]);
    const [distance, setDistance] = useState(null); // To store calculated distance
    const [isListVisible, setIsListVisible] = useState(true); // Trạng thái hiển thị danh sách

    // Giả sử vị trí cố định là [10.7763897, 106.7011391] (Ví dụ: TP.HCM, Việt Nam)
    const position = [10.7763897, 106.7011391];

    // Hàm xử lý tìm kiếm
    const handleSearch = () => {
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
                const parsedResult = JSON.parse(result);
                console.log(parsedResult);
                setListPlace(parsedResult);  // Cập nhật danh sách địa điểm tìm thấy
                setIsListVisible(true); // Hiển thị lại danh sách sau khi tìm kiếm
            })
            .catch((err) => {
                console.error("Error: ", err);
            });
    };

    // Hàm tính khoảng cách
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const distanceInMeters = getDistance(
            { latitude: lat1, longitude: lon1 },
            { latitude: lat2, longitude: lon2 }
        );
        return distanceInMeters;
    };

    // Hàm xử lý khi chọn vị trí
    const handleSelectPosition = (item) => {
        setSelectPosition(item);

        // Lấy tọa độ của địa điểm được chọn
        const selectedLat = parseFloat(item.lat);
        const selectedLon = parseFloat(item.lon);

        // Tính khoảng cách từ vị trí cố định (position) đến địa điểm đã chọn
        const calculatedDistance = calculateDistance(position[0], position[1], selectedLat, selectedLon);
        setDistance(calculatedDistance); // Cập nhật khoảng cách

        // Ẩn danh sách sau khi chọn địa chỉ
        setIsListVisible(false);
    };

    return (
        <>
            <div className="search-box-container">
                <div className="search-box-input-container">
                    <div style={{ flex: 1 }}>
                        <OutlinedInput
                            className="search-box-input"
                            style={{ width: '100%' }}
                            value={searchText}
                            onChange={(event) => {
                                setSearchText(event.target.value);
                            }}
                        />
                    </div>
                    <div className="search-box-button-container">
                        <Button variant="contained" color="primary" onClick={handleSearch}>
                            Search
                        </Button>
                    </div>
                </div>
                {isListVisible && (
                    <List component="nav" aria-label="main mailbox folders" className="search-box-list">
                        {
                            listPlace.map((item) => {
                                return (
                                    <div key={item?.osm_id}>
                                        <ListItem
                                            button
                                            onClick={() => handleSelectPosition(item)}>
                                            <ListItemIcon>
                                                <IoLocationSharp size={30} color="Blue" />
                                            </ListItemIcon>
                                            <ListItemText primary={item?.display_name} />
                                        </ListItem>
                                        <Divider />
                                    </div>
                                );
                            })
                        }
                    </List>
                )}
                {distance !== null && (
                    <div className="distance-result">
                        <h3>Khoảng cách địa điểm từ nơi bạn nhập đến Trung Tâm Thành Phố Hồ Chí Minh Là: {distance} meters</h3>
                    </div>
                )}
            </div>
        </>
    );
}

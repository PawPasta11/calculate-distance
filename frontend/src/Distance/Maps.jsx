import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { IoLocationSharp } from "react-icons/io5";
import L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";

// Cái nàydungfg để biến các icon trong thư viện react thành các icon trong leaflet cho phần giao diện địa chỉ trên map
function CustomIcon() {
    const svg = renderToStaticMarkup(<IoLocationSharp size={30} color="Blue" />);
    return L.divIcon({
        className: 'custom-icon',
        html: svg,
        iconSize: [30, 30], // Kích thước icon
        iconAnchor: [15, 30], // Mũi tên chỉ xuống dưới
    });
}

function Maps() {
    const position = [51.505, -0.09];

    return (
        <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ width: "100%", height: "100%" }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=nFwD4CnCSazo8jfDPWDw"
            />
            <Marker position={position} icon={CustomIcon()}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    );
}

export default Maps;

import styled from "styled-components";
import Popup from "reactjs-popup";
import CloseIcon from "@mui/icons-material/Close";
import {useState} from "react";
import Loader from "../Loader/loader";
import style from "./imagepopup.module.css";
import PlaceIcon from "@mui/icons-material/Place";

const StyledImagePopup = styled(Popup)`
    &-overlay {
        width: calc(100vw - 80px);
        background-color: rgba(0, 0, 0, 0.85);
        left: 80px !important;
    },
    
    &-content {
        background-color: transparent;
        border: none;
        -webkit-animation: anvil 0.3s cubic-bezier(0.38, 0.1, 0.36, 0.9) forwards;
        width: fit-content;
    }
`;


const ImagePopup = ({trigger, src, loadLocation = false, category, imageId}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [location, setLocation] = useState("");
    const [coordinates, setCoordinates] = useState("");

    // Function used to fetch the location of the photo
    const fetchLocation = async () => {
        // Fetch the location and coordinates of the photo
        const response = await fetch(`https://cdn.tlima.photos/api/${category}/${imageId}/details`);

        // If the response wasn't OK, don't show the data
        if (!response.ok) return;

        const data = await response.json();
        setLocation(data.location);
        setCoordinates(data.coordinates);
    }

    return (
        <StyledImagePopup
            modal
            trigger={trigger}
            onOpen={() => {
                if (loadLocation) fetchLocation();
            }}
        >
            {close => (
                <div style={{
                    position: "relative",
                    backgroundColor: "transparent",
                    width: "fit-content",
                    height: "fit-content"
                }}>
                    {isLoading && <Loader/>}

                    <CloseIcon onClick={close} style={{
                        position: "absolute",
                        right: "2%",
                        top: "2%",
                        color: "white",
                        cursor: "pointer",
                        border: "1px solid white",
                        borderRadius: "100px",
                        backgroundColor: "#00000087"
                    }}/>
                    <img style={{objectFit: "cover", height: "80vh"}}
                         src={src}
                         alt={""}
                         loading={"lazy"}
                         onLoad={() => setIsLoading(false)}
                    />

                    <div className={style.photolocation} style={{display: loadLocation ? "block": "none"}}>
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <PlaceIcon
                                sx={{
                                    position: "absolute",
                                    bottom: "25px",
                                    left: "-20px",
                                    transform: "rotate(-35deg)",
                                    color: "#F68338",
                                }}
                            />
                        </div>
                        <a target={"_blank"}
                           href={coordinates}
                           rel="noreferrer">{location}</a>
                    </div>
                </div>
            )}
        </StyledImagePopup>

    );
}

export default ImagePopup;
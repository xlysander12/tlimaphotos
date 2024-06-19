import styled from "styled-components";
import Popup from "reactjs-popup";
import CloseIcon from "@mui/icons-material/Close";
import {useState} from "react";
import Loader from "../Loader/loader";

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


const ImagePopup = ({trigger, src}) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <StyledImagePopup
            modal
            trigger={trigger}
            onOpen={() => setIsLoading(true)}
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
                </div>
            )}
        </StyledImagePopup>

    );
}

export default ImagePopup;
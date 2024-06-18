import {Component} from "react";
import style from "./eventpage.module.css";
import Popup from "reactjs-popup";
import styled from "styled-components";
import CloseIcon from '@mui/icons-material/Close';
import Loader from "../../components/Loader/loader";

const ImagePopup = styled(Popup)`
    &-overlay {
        background-color: rgba(0, 0, 0, 0.85);
    },
    
    &-content {
        background-color: transparent;
        border: none;
        -webkit-animation: anvil 0.3s cubic-bezier(0.38, 0.1, 0.36, 0.9) forwards;
        width: fit-content;
    }
`;


const DisplayedImage = ({src, onLoadCallback}) => {
    return (
        <ImagePopup
            modal
            trigger={
            <figure>
                <img
                    src={src}
                    alt={""}
                    loading={"lazy"}
                />
            </figure>}
        >
            {close => (
                <div style={{position: "relative", backgroundColor: "transparent", width: "fit-content", height: "fit-content"}}>
                    <CloseIcon onClick={close} style={{position: "absolute", right: "2%", top: "2%", color: "white", cursor: "pointer", border: "1px solid white", borderRadius: "100px", backgroundColor: "#00000087"}}/>
                    <img style={{objectFit: "cover", height: "80vh"}}
                         src={src}
                         alt={""}
                         loading={"lazy"}
                    />
                </div>
            )}
        </ImagePopup>

    );
}

class EventPage extends Component {
    constructor(props) {
        super(props);

        if (!this.props.category || !this.props.event)
            window.location = "/";

        this.state = {
            loading: true,
            event_display_name: "",
            number_of_photos: 0
        }

        this.updateLoadedPhotos = this.updateLoadedPhotos.bind(this);
    }

    // Deprecated shit
    updateLoadedPhotos() {
        this.setState({loaded_images: this.state.loaded_images + 1});
        console.log("Image loaded. Total loaded: " + this.state.loaded_images + 1);
    }

    async componentDidMount() {
        // Get the display name of the event and number of photos
        let response = await fetch(`https://cdn.tlima.photos/api/${this.props.category}/${this.props.event}`);

        response = await response.json();

        this.setState({
            loading: false,
            event_display_name: response.display,
            number_of_photos: response.quantity
        });

    }

    render() {
        if (this.state.loading)
            return <Loader />

        let images = [];
        for (let i = 1; i <= this.state.number_of_photos; i++) {
            images.push(<DisplayedImage key={`image${i}`} src={`https://cdn.tlima.photos/${this.props.category}/${this.props.event}/${i}.jpg`} />);
        }

        return (
            <div style={{display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px"}}>
                <p style={{color: "white", fontSize: "40px", fontWeight: "bold", fontFamily: "acme, serif"}}>{this.state.event_display_name}</p>

                <div className={style.gallery}>
                    {images.map((image) => (
                        image
                    ))}
                </div>
            </div>
        );
    }
}

export default EventPage;
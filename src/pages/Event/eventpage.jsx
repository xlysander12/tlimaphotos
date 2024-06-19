import {Component} from "react";
import style from "./eventpage.module.css";
import Loader from "../../components/Loader/loader";
import ImagePopup from "../../components/ImagePopup/image-popup";

class EventPage extends Component {
    constructor(props) {
        super(props);

        if (!this.props.category || !this.props.event)
            window.location = "/";

        this.state = {
            loading: true,
            event_display_name: "",
            number_of_photos: 0,
            loaded_photos: 0
        }

        this.handlePhotoLoaded = this.handlePhotoLoaded.bind(this);
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

    handlePhotoLoaded(event) {
        console.log("A photo has been loaded");

        this.setState((prevState) => {
            return {
                loaded_photos: prevState.loaded_photos + 1
            }
        });
        console.log("State has been updated");
    }

    render() {
        let images = [];
        for (let i = 1; i <= this.state.number_of_photos; i++) {
            const src = `https://cdn.tlima.photos/${this.props.category}/${this.props.event}/${i}.jpg`;

            images.push(
                <ImagePopup
                    key={`image${i}`}
                    trigger={
                        <figure>
                            <img
                                onLoad={this.handlePhotoLoaded}
                                src={src}
                                alt={""}
                                loading={"lazy"}
                            />
                        </figure>
                    }
                    src={src}
                />
            );
        }

        console.log("Loaded photos: ", this.state.loaded_photos);
        console.log("Number of photos: ", this.state.number_of_photos);

        // const shouldLoaderDisplay = (this.state.loading || this.state.loaded_photos < 10);
        const shouldLoaderDisplay = this.state.loading;

        return (
            <div style={{display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px"}}>
                <p style={{color: "white", fontSize: "40px", fontWeight: "bold", fontFamily: "acme, serif"}}>{this.state.event_display_name}</p>

                <div className={style.loaderDiv} style={{display: `${shouldLoaderDisplay ? "flex": "none"}`}}>
                    <Loader />
                </div>

                <div className={style.gallery} style={{display: `${shouldLoaderDisplay ? "none": "flex"}`}}>
                    {images.map((image) => (
                        image
                    ))}
                </div>
            </div>
        );
    }
}

export default EventPage;
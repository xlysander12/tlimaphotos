import {Component, useEffect, useState} from "react";
import style from "./main.module.css";
import PlaceIcon from '@mui/icons-material/Place';

function DisplayPhoto({displayId, src}) {
    const [location, setLocation] = useState("");
    const [coordinates, setCoordinates] = useState("");

    useEffect(() => {
        // Fetch the location and coordinates of the photo
        fetch(`https://cdn.tlima.photos/api/main/${displayId}/details`)
            .then(response => response.json())
            .then(data => {
                setLocation(data.location);
                setCoordinates(data.coordinates);
            });
    });


    return (
        <label className={style.Slide} htmlFor={`Slide${displayId}`} id={`Slide${displayId}`}>
            <div className={style.content}>
                <img src={src} alt={""} loading={"lazy"}
                     style={{maxWidth: "100%", maxHeight: "100%", objectFit: "contain"}}/>
            </div>

            <div className={style.photolocation}>
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
        </label>
    );
}

class MainPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            number_of_photos: 2
        }
    }


    render() {

        // Create the same number of radio buttons as the number of photos
        let radioButtons = [];
        for (let i = 1; i <= this.state.number_of_photos; i++) {
            radioButtons.push(<input key={`radioInput${i}`} type="radio" name={"slider"} id={`Slide${i}`} defaultChecked={i === 1} autoFocus={i === 1}/>);
        }

        // Make the same, but for the photos
        let photos = [];
        for (let i = 1; i <= this.state.number_of_photos; i++) {
            photos.push(<DisplayPhoto key={`mainDisplayPhoto${i}`} displayId={i} src={`https://cdn.crunchypi.xyz/main/${i}.jpg`}/>);
        }

        return (
            <div className={style.contenedor}>
                <form>
                    {radioButtons}

                    <div className={style.labels}>
                        {photos}
                    </div>
                </form>
            </div>
        );
    }
}

export default MainPage;
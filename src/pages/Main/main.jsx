import {Component} from "react";
import style from "./main.module.css";
import PlaceIcon from '@mui/icons-material/Place';

function DisplayPhoto(props) {
    return (
        <label className={style.Slide} htmlFor={`Slide${props.displayId}`} id={`Slide${props.displayId}`}>
            <div className={style.content}>
                <img src={props.src} alt={props.alt}
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
                   href={props.coordinates}
                   rel="noreferrer">{props.location}</a>
            </div>
        </label>
    );
}

class MainPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            numOfPhotos: 2
        }
    }


    render() {

        // Create the same number of radio buttons as the number of photos
        let radioButtons = [];
        for (let i = 1; i <= this.state.numOfPhotos; i++) {
            radioButtons.push(<input key={`radioInput${i}`} type="radio" name={"slider"} id={`Slide${i}`} defaultChecked={i === 1} autoFocus={i === 1}/>);
        }

        // Make the same, but for the photos
        let photos = [];
        // for (let i = 1; i <= this.state.numOfPhotos; i++) {
        //     photos.push(<DisplayPhoto displayId={i} src={`background2.jpg`} location={"Zona balnear dos Biscoitos"} coordinates={"https://www.google.com/maps/@38.8032538,-27.2571321,230m/data=!3m1!1e3?entry=ttu"}/>);
        // }
        photos.push(<DisplayPhoto key={`mainDisplayPhoto${1}`} displayId={1} src={`background2.png`} location={"Zona balnear dos Biscoitos"} coordinates={"https://www.google.com/maps/@38.8032538,-27.2571321,230m/data=!3m1!1e3?entry=ttu"}/>);
        photos.push(<DisplayPhoto key={`mainDisplayPhoto${2}`} displayId={2} src={`background.png`} location={"Serra do Cume"} coordinates={"https://maps.app.goo.gl/sKNnoz2hvuyRd2DP8"}/>);


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
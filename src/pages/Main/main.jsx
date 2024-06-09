import {Component} from "react";
import style from "./main.module.css";

class MainPage extends Component {
    render() {
        return (
            <div>
                <div className={style.textDiv}>
                    <h1>BEM VINDO <br/> À PUTA QUE TE PARIU</h1>
                </div>

                <img src={"background.jpeg"} className={style.centerImage} alt={"A tua prima"}/>

                {/*Corners*/}
                <div className={style.corner}></div>
                <div className={style.corner2}></div>
                <div className={style.corner3}></div>
                <div className={style.corner4}></div>
            </div>
        );
    }
}

export default MainPage;
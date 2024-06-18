import style from "./loader.module.css";

export default function Loader() {
    return (
        <div className={style.loaderDiv}>
            <img src={"logotipoloader.png"} alt={"Loading..."} className={style.loader}/>
        </div>
    );
}
import style from './App.module.css';
import {useState} from "react";
import MainPage from "./pages/Main/main";
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import LandscapeIcon from '@mui/icons-material/Landscape';
import SportsIcon from '@mui/icons-material/Sports';
import {Tooltip, Zoom} from "@mui/material";

const IconsSlotProps = {
    arrow: {
        sx: {
            "&:before": {
                backgroundColor: "#383838"
            }
        }
    },

    tooltip: {
        sx: {
            backgroundColor: "#383838",
            fontSize: "0.9rem"
        }
    }
}

function nameToPage(name) {
    switch (name) {
        case "main":
            return <MainPage />;
        default:
            return <MainPage />;
    }
}

function App() {
    const [page, setPage] = useState("main");

    return (
        <div>
            <div className={style.navbar}>
                <div className={style.navbarPages}>
                    <Tooltip
                        title={"Portofólio"}
                        arrow
                        placement={"right"}
                        TransitionComponent={Zoom}
                        slotProps={IconsSlotProps}
                    >
                        <p onClick={() => setPage("main")}>
                            <PhotoLibraryIcon className={style.navbarPagesIcon}/>
                        </p>
                    </Tooltip>

                    <Tooltip
                        title={"Ralis"}
                        arrow
                        placement={"right"}
                        TransitionComponent={Zoom}
                        slotProps={IconsSlotProps}
                    >
                        <p onClick={() => setPage("about")}>
                            <DriveEtaIcon className={style.navbarPagesIcon}/>
                        </p>
                    </Tooltip>

                    <Tooltip
                        title={"Natureza"}
                        arrow
                        placement={"right"}
                        TransitionComponent={Zoom}
                        slotProps={IconsSlotProps}
                    >
                        <p onClick={() => setPage("portfolio")}>
                            <LandscapeIcon className={style.navbarPagesIcon}/>
                        </p>
                    </Tooltip>

                    <Tooltip
                        title={"Desporto"}
                        arrow
                        placement={"right"}
                        TransitionComponent={Zoom}
                        slotProps={IconsSlotProps}
                    >
                        <p onClick={() => setPage("contact")}>
                            <SportsIcon className={style.navbarPagesIcon}/>
                        </p>
                    </Tooltip>
                </div>

                <div className={style.navbarSocials}>
                    <a href="https://www.facebook.com/profile.php?id=100093810021256" target="_blank" rel="noreferrer">
                        <i className={"fab fa-facebook-f"}></i>
                    </a>
                    <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                        <i className={"fab fa-instagram"}></i>
                    </a>
                    <a href="mailto:geral@tlima.photos" target="_blank" rel="noreferrer">
                        <i className={"fa fa-mail-bulk"}></i>
                    </a>
                </div>
            </div>

            <div className={style.content}>
                {nameToPage(page)}
            </div>
        </div>
    );
}

export default App;

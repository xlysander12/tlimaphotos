import style from './App.module.css';
import {useEffect, useState} from "react";
import MainPage from "./pages/Main/main";
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import LandscapeIcon from '@mui/icons-material/Landscape';
import SportsIcon from '@mui/icons-material/Sports';
import {Tooltip, Zoom} from "@mui/material";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import styled from "styled-components";
import EventPage from "./pages/Event/eventpage";
import Portfolio from "./pages/Portfolio/portfolio";

const CopyRightModal = styled(Popup)`
    &-overlay {
        background-color: rgba(0, 0, 0, 0.85);
    },
    
    &-content {
        background-color: transparent;
        border: none;
        -webkit-animation: anvil .5s cubic-bezier(0.38, 0.1, 0.36, 0.9) forwards;
    }
`

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
        case "rali":
            return <EventPage category={"rali"} event={"porto2023"}/>;
        case "portfolio":
            return <Portfolio />;
        default:
            return <MainPage />;
    }
}

function App() {
    const [page, setPage] = useState("main");
    const [copyRightModalOpen, setCopyRightModalOpen] = useState(false);

    useEffect(() => {
        const handleContextMenu = e => {
            e.preventDefault();
            setCopyRightModalOpen(true);
        }

        document.addEventListener("contextmenu", handleContextMenu);
        return function cleanup() {
            document.removeEventListener("contextmenu", handleContextMenu);
        }
    }, []);

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
                        <p onClick={() => setPage("portfolio")}>
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
                        <p onClick={() => setPage("rali")}>
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
                        <p onClick={() => setPage("natureza")}>
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
                        <p onClick={() => setPage("desporto")}>
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

            <CopyRightModal open={copyRightModalOpen} onClose={() => setCopyRightModalOpen(false)}>
                <div style={{display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center"}}>
                    <p style={{color: "white", fontSize: "23px", fontFamily: "acme, sans", fontWeight: "bold"}}>O conteúdo desta página é protegido. Por esse motivo, o Right-Click está desativado.<br/>Caso queira alguma foto contacte-nos nas redes sociais.</p>
                </div>
            </CopyRightModal>
        </div>
    );
}

export default App;

import style from './App.module.css';
import {useEffect, useState} from "react";
import MainPage from "./pages/Main/main";
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import LandscapeIcon from '@mui/icons-material/Landscape';
import SportsIcon from '@mui/icons-material/Sports';
import HomeIcon from '@mui/icons-material/Home';
import {Menu, MenuItem, Tooltip, Zoom} from "@mui/material";
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

const MenusSlotProps = {
    paper: {
        sx: {
            backgroundColor: "#292929",
            color: "white"
        }
    }
}

function App() {
    // Pages state
    const [activeCategory, setActiveCategory] = useState("main");
    const [activeEvent, setActiveEvent] = useState(null);

    // CopyRight modal state
    const [copyRightModalOpen, setCopyRightModalOpen] = useState(false);

    // Events state
    const [raliEvents, setRaliEvents] = useState([]);
    const [naturezaEvents, setNaturezaEvents] = useState([]);
    const [desportoEvents, setDesportoEvents] = useState([]);

    // Menus state
    //// Rali
    const [raliMenuOpen, setRaliMenuOpen] = useState(false);
    const [raliMenuAnchor, setRaliMenuAnchor] = useState(null);

    //// Natureza
    const [naturezaMenuOpen, setNaturezaMenuOpen] = useState(false);
    const [naturezaMenuAnchor, setNaturezaMenuAnchor] = useState(null);

    //// Desporto
    const [desportoMenuOpen, setDesportoMenuOpen] = useState(false);
    const [desportoMenuAnchor, setDesportoMenuAnchor] = useState(null);

    // Render correct page handler
    function renderPage() {
        switch (activeCategory) {
            case "main":
                return <MainPage />;
            case "portfolio":
                return <Portfolio />;
            default:
                return <EventPage category={activeCategory} event={activeEvent}/>;
        }
    }

    // ComponentDidMount
    useEffect(() => {
        // Disable right-click
        const handleContextMenu = e => {
            e.preventDefault();
            setCopyRightModalOpen(true);
        }
        document.addEventListener("contextmenu", handleContextMenu);

        // Check how many events for each category there are
        const checkEvents = async () => {
            // Rali
            const raliResponse = await fetch("https://cdn.tlima.photos/api/rali/events");
            const raliData = await raliResponse.json();
            setRaliEvents(raliData);

            // Natureza
            const naturezaResponse = await fetch("https://cdn.tlima.photos/api/natureza/events");
            const naturezaData = await naturezaResponse.json();
            setNaturezaEvents(naturezaData);

            // Desporto
            const desportoResponse = await fetch("https://cdn.tlima.photos/api/desporto/events");
            const desportoData = await desportoResponse.json();
            setDesportoEvents(desportoData);
        }

        checkEvents().then(() => {});
    }, []);

    // Debug stuff
    console.log(raliEvents);
    console.log(naturezaEvents);
    console.log(desportoEvents);


    return (
        <div>
            <div className={style.navbar}>
                <div className={style.navbarPages}>
                    <Tooltip
                        title={"Página Inicial"}
                        arrow
                        placement={"right"}
                        TransitionComponent={Zoom}
                        slotProps={IconsSlotProps}
                    >
                        <p onClick={() => {
                            setActiveCategory("main");
                            setActiveEvent(null);
                        }}>
                            <HomeIcon className={style.navbarPagesIcon}/>
                        </p>
                    </Tooltip>

                    <Tooltip
                        title={"Portofólio"}
                        arrow
                        placement={"right"}
                        TransitionComponent={Zoom}
                        slotProps={IconsSlotProps}
                    >
                        <p onClick={() => {
                            setActiveCategory("portfolio");
                            setActiveEvent(null);
                        }}>
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
                        <p onClick={(event) => {
                            // Check the number of events
                            //// If there are no events, ignore this click as there's nothing to show
                            if (raliEvents.length === 0) {
                                return;
                            }

                            //// If there's just 1 event, show it directly on click
                            if (raliEvents.length === 1) {
                                setActiveCategory("rali");
                                setActiveEvent(raliEvents[0].name);
                            } else { // If there's more, open the menu that will show the events
                                // Set the anchor to this button
                                setRaliMenuAnchor(event.currentTarget);

                                // Open the menu
                                setRaliMenuOpen(true);
                            }
                        }}>
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
                        <p onClick={(event) => {
                            // Check the number of events
                            //// If there are no events, ignore this click as there's nothing to show
                            if (naturezaEvents.length === 0) {
                                return;
                            }

                            //// If there's just 1 event, show it directly on click
                            if (naturezaEvents.length === 1) {
                                setActiveCategory("natureza");
                                setActiveEvent(naturezaEvents[0].name);
                            } else { // If there's more, open the menu that will show the events
                                // Set the anchor to this button
                                setDesportoMenuAnchor(event.currentTarget);

                                // Open the menu
                                setNaturezaMenuOpen(true);
                            }
                        }}>
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
                        <p onClick={(event) => {
                            // Check the number of events
                            //// If there are no events, ignore this click as there's nothing to show
                            if (desportoEvents.length === 0) {
                                return;
                            }

                            //// If there's just 1 event, show it directly on click
                            if (desportoEvents.length === 1) {
                                setActiveCategory("desporto");
                                setActiveEvent(desportoEvents[0].name);
                            } else { // If there's more, open the menu that will show the events
                                // Set the anchor to this button
                                setDesportoMenuAnchor(event.currentTarget);

                                // Open the menu
                                setDesportoMenuOpen(true);
                            }
                        }}>
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
                {renderPage()}
            </div>

            <CopyRightModal open={copyRightModalOpen} onClose={() => setCopyRightModalOpen(false)}>
                <div style={{display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center"}}>
                    <p style={{color: "white", fontSize: "23px", fontFamily: "acme, sans", fontWeight: "bold"}}>O conteúdo desta página é protegido. Por esse motivo, o Right-Click está desativado.<br/>Caso queira alguma foto contacte-nos nas redes sociais.</p>
                </div>
            </CopyRightModal>


            {/*TODO: This is all a repeated mess. Fix it!*/}
            {/*Rali Menu*/}
            <Menu
                open={raliMenuOpen}
                anchorEl={raliMenuAnchor}
                onClose={() => setRaliMenuOpen(false)}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                }}
                transformOrigin={{
                    vertical: "center",
                    horizontal: "left"
                }}
                slotProps={MenusSlotProps}
            >
                {raliEvents.map((event, index) => {
                    return (
                        <MenuItem
                            key={`raliEvent${index}`}
                            onClick={() => {
                                // Change the active category and event
                                setActiveCategory("rali");
                                setActiveEvent(event.name);

                                // Close the menu
                                setRaliMenuOpen(false);
                            }}
                            sx={{
                                "&:hover": {
                                    backgroundColor: "#383838"
                                }

                            }}
                        >
                            {event.display}
                        </MenuItem>
                    )
                })}
            </Menu>

            {/*Natureza Menu*/}
            <Menu
                open={naturezaMenuOpen}
                anchorEl={naturezaMenuAnchor}
                onClose={() => setNaturezaMenuOpen(false)}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                }}
                transformOrigin={{
                    vertical: "center",
                    horizontal: "left"
                }}
                slotProps={MenusSlotProps}
            >
                {naturezaEvents.map((event, index) => {
                    return (
                        <MenuItem
                            key={`naturezaEvent${index}`}
                            onClick={() => {
                                // Change the active category and event
                                setActiveCategory("natureza");
                                setActiveEvent(event.name);

                                // Close the menu
                                setNaturezaMenuOpen(false);
                            }}
                            sx={{
                                "&:hover": {
                                    backgroundColor: "#383838"
                                }

                            }}
                        >
                            {event.display}
                        </MenuItem>
                    )
                })}
            </Menu>

            {/*Desporto Menu*/}
            <Menu
                open={desportoMenuOpen}
                anchorEl={desportoMenuAnchor}
                onClose={() => setDesportoMenuOpen(false)}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                }}
                transformOrigin={{
                    vertical: "center",
                    horizontal: "left"
                }}
                slotProps={MenusSlotProps}
            >
                {desportoEvents.map((event, index) => {
                    return (
                        <MenuItem
                            key={`desportoEvent${index}`}
                            onClick={() => {
                                // Change the active category and event
                                setActiveCategory("desporto");
                                setActiveEvent(event.name);

                                // Close the menu
                                setDesportoMenuOpen(false);
                            }}
                            sx={{
                                "&:hover": {
                                    backgroundColor: "#383838"
                                }

                            }}
                        >
                            {event.display}
                        </MenuItem>
                    )
                })}
            </Menu>
        </div>
    );
}

export default App;

import React, {Component} from "react";
import style from "./portfolio.module.css";
import Loader from "../../components/Loader/loader";
import ImagePopup from "../../components/ImagePopup/image-popup";


export default class Portfolio extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            numberOfImages: 0,
            tiltValue: 0
        }

        this.hero = React.createRef();
        this.heroGrid = React.createRef();
        this.tiltDegree = 7;


        this.updateScrollPos = this.updateScrollPos.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }

    async componentDidMount() {
        // Get the number of images from the CDN
        const response = await fetch("https://cdn.tlima.photos/api/portofolio");
        const data = await response.json();

        this.setState({
            isLoading: false,
            numberOfImages: data.quantity,
        });


        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    isElementInViewport(element) {
        const rect = element.current.getBoundingClientRect();
        return (
            rect.bottom > 0 &&
            rect.right > 0 &&
            rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
            rect.top < (window.innerHeight || document.documentElement.clientHeight)
        );
    }

    mapRange(value, inMin, inMax, outMin, outMax) {
        return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
    }

    updateScrollPos() {
        const scrollPos = window.scrollY;
        const rect = this.heroGrid.current.getBoundingClientRect();
        const scrollPercent = (scrollPos * 100) / rect.height;

        let mappedValue = this.mapRange(scrollPercent, 0, 100, this.tiltDegree * -1, this.tiltDegree);

        // Tilt the grid relative to the scroll
        this.heroGrid.current.style.setProperty("--scroll-tilt", `${mappedValue}`);

        // Blur the header text relative to the scroll
        let heroOpacity = this.mapRange(scrollPercent, 0, 10, 1, 0);
        let heroTransformY = this.mapRange(scrollPercent, 0, 10, 0, -100);
        let heroBlur = this.mapRange(scrollPercent, 0, 10, 0, 20);
        this.hero.current.style.opacity = heroOpacity;
        this.hero.current.style.filter = `blur(${heroBlur}px)`;
        this.hero.current.style.transform = `translateY(${heroTransformY}px)`;
    }

    handleScroll() {
        if (this.heroGrid && this.isElementInViewport(this.heroGrid)) {
            this.updateScrollPos();
        }
    }

    render() {
        if (this.state.isLoading)
        return <Loader />

        return (
            <div>
                <section ref={this.hero} className={`${style.hero} ${style.pX}`}>
                    <div className={style.container}>
                        <h1>O meu Portofólio</h1>
                        <p>Caso deseje algum serviço, poderá contactar em qualquer uma das redes sociais</p>
                    </div>
                </section>

                <section ref={this.heroGrid} className={style.tiltgrid}>
                    <div className={style.tiltgrid__container}>
                        {/*Iterate for the number of photos and display them*/}
                        {[...Array(this.state.numberOfImages).keys()].map(i => {
                            const photoID = i + 1;
                            const src = `https://cdn.tlima.photos/portofolio/${photoID}.jpg`;

                            return (
                                <ImagePopup
                                    key={`portfolioImage${i}`}
                                    src={src}
                                    trigger={
                                        <div>
                                            <img loading="lazy" src={src} alt=""/>
                                        </div>
                                    }
                                    loadLocation
                                    category={"portofolio"}
                                    imageId={photoID}
                                />
                            );
                        })}
                    </div>
                </section>

                <section className={`${style.bottom} ${style.pX}`}>
                </section>
            </div>
        );
  }
}
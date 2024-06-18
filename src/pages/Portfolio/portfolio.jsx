import {Component} from "react";
import style from "./portfolio.module.css";
import Loader from "../../components/Loader/loader";

export default class Portfolio extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true
        }
    }

  render() {
    if (this.state.loading)
        return <Loader />


    return (
      <div>
          <section className={`${style.hero} ${style.pX}`}>
              <div className={style.container}>
                  <h1>O meu Portofólio</h1>
                  <p>Caso deseje algum serviço, poderá contactar em qualquer uma das redes sociais</p>
              </div>
          </section>
          <section className={style.tiltgrid}>
              <div className={style.tiltgrid__container}>
                  <div><img loading="lazy" src="https://picsum.photos/id/11/1280/720" alt="" /></div>
                  <div><img loading="lazy" src="https://picsum.photos/id/33/1280/720" alt="" /></div>
                  <div><img loading="lazy" src="https://picsum.photos/id/22/1280/720" alt="" /></div>
                  <div><img loading="lazy" src="https://picsum.photos/id/4/1280/720" alt="" /></div>

              </div>
          </section>
      </div>
    );
  }
}
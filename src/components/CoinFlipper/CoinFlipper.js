import React, { Component } from "react";
import Coin from "../Coin/Coin";
import "./CoinFlipper.css";

class CoinFlipper extends Component {
    constructor(props) {
        super(props);
        // State üzerinde paranın başlangıçtaki durumunu veriyoruz, başlangıçta "tura" olsun.
        // Daha sonra şu anda paranın dönüp dönmeme durumunu da veriyoruz, başlangıçta para atılmamış olduğundan "false" olarak verdik.
        this.state = {
            side: "tura",
            flipping: false,
            flipCount: 0,
            turaCount: 0,
            yaziCount: 0,
            buttonDisabled: false,
        };
    }
    handleClick = () => {
        /**
         * "At!" butonuna tıkladığımızda paranın dönmesini istiyoruz, bu yüzden "flipping" durumunu "true" yapıyoruz.
         *  "At!" butonunu sürekli tıklayarak oluşacak spam'i engellemek için disable ediyoruz. (Ek özellik)
         *  Atılma sayısını tutan state'i update ediyoruz.
         */
        this.setState({
            flipping: true,
            buttonDisabled: !this.state.buttonDisabled,
            flipCount: this.state.flipCount + 1,
        });

        /**
         *  1 saniye kadar dönmesi yeterli, bu yüzden 1 saniye sonra "flipping" durmunu tekrar "false" yapıyoruz.
         *  Butonu aktif ediyoruz
         */
        setTimeout(
            () => this.setState({ flipping: false, buttonDisabled: false }),
            1000
        );
        /**
         * "side" state update ediliyor ve duruma göre yazı ve tura sayıları güncelleniyor.
         * "this.setState" 2. paremetre olarak callback function alır.
         * Yazı | Tura Count stateini "callback function" da güncelliyoruz.
         */

        this.setState({ side: this.getRandomCoinSide() }, () => {
            this.incrementYaziTuraState();
        });
    };
    //Incrementing Yazı | Tura state depends on side
    incrementYaziTuraState = () => {
        this.state.side === "tura"
            ? this.setState({ turaCount: this.state.turaCount + 1 })
            : this.setState({ yaziCount: this.state.yaziCount + 1 });
    };
    // Returns random coin side
    getRandomCoinSide = () =>
        Math.round(Math.random()) === 0 ? "tura" : "yazi";

    render() {
        return (
            <div className="CoinFlipper">
                <h1>Yazı mı Tura mı?</h1>
                <Coin side={this.state.side} flipping={this.state.flipping} />
                <button
                    disabled={this.state.buttonDisabled}
                    onClick={this.handleClick}
                >
                    At!
                </button>
                <p>
                    Toplam
                    <strong> {this.state.flipCount} </strong>
                    atıştan
                    <strong> {this.state.turaCount} </strong> adet tura ve
                    <strong> {this.state.yaziCount} </strong>
                    adet yazı geldi.
                </p>
            </div>
        );
    }
}

export default CoinFlipper;

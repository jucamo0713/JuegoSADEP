import React from 'react';
import '../styles/Home.css';
import { preguntas } from '../Utiles/mocks/preguntas';
import { Redirect } from 'react-router-dom';
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            preguntas: [],
            cant: 0,
            checks: [
                false,
                false,
                false,
                false,
                false
            ],
            cantp: 0,
            bool: false
        }
    }
    check = async (x) => {
        let auxiliar = this.state.checks;
        auxiliar[x] = !this.state.checks[x];
        let auxiliar2 = [];
        let auxiliar3 = [];
        let auxiliar4 = [];
        let auxiliar5 = [];
        let auxiliar6 = [];
        if (auxiliar[0]) {
            auxiliar2 = preguntas.filter(filtro => filtro.categoria == 0);
        }
        if (auxiliar[1]) {
            auxiliar3 = preguntas.filter(filtro => filtro.categoria == 1);
        }
        if (auxiliar[2]) {
            auxiliar4 = preguntas.filter(filtro => filtro.categoria == 2);
        }
        if (auxiliar[3]) {
            auxiliar5 = preguntas.filter(filtro => filtro.categoria == 3);
        }
        if (auxiliar[4]) {
            auxiliar6 = preguntas.filter(filtro => filtro.categoria == 4);
        }
        let final = [];
        for (let i = 0; i < auxiliar6.length; i++) {
            if (auxiliar[4]) {
                final.push(auxiliar6[i]);
            }
        }
        for (let i = 0; i < auxiliar5.length; i++) {
            if (auxiliar[3]) {
                final.push(auxiliar5[i]);
            }
        }
        for (let i = 0; i < auxiliar4.length; i++) {
            if (auxiliar[2]) {
                final.push(auxiliar4[i]);
            }
        }
        for (let i = 0; i < auxiliar3.length; i++) {
            if (auxiliar[1]) {
                final.push(auxiliar3[i]);
            }
        }
        for (let i = 0; i < auxiliar2.length; i++) {
            if (auxiliar[0]) {
                final.push(auxiliar2[i]);
            }
        }
        this.setState({
            checks: auxiliar,
            preguntas: final,
            cant: final.length
        });
    }
    min = () => {
        if (this.state.cant == 0) {
            return "0";
        } else {
            return "1";
        }
    }
    valid = () => {
        if (document.getElementById("cantidad").value < this.min() - 1) {
            document.getElementById("cantidad").value = this.min();
        } else if (document.getElementById("cantidad").value > this.state.cant) {
            document.getElementById("cantidad").value = this.state.cant;
        }
    }
    valid2 = () => {
        if (this.state.cantp == 0) {
            document.getElementById("cantidad").style.border = "2px red solid";
            setTimeout(() => {
                document.getElementById("cantidad").style.border = "1px black solid";
            }, 1500);
        } else {
            this.setState({
                bool: true
            });
        }
    }
    render() {
        return (
            <>
                <div>
                    <div className="homeF">
                        <h1 className="homeT">Trivia San Antonio de Prado</h1>
                        <div className="all">
                            <div className="categorias">
                                <h3>CATEGORIAS</h3>
                                <div className="contB">
                                    <p className="opciones"><input type="checkbox" className="checking" onChange={() => { this.check(0) }} /> Generalidades del corregimiento</p>
                                    <p className="opciones"><input type="checkbox" className="checking" onChange={() => { this.check(1) }} /> Aspectos historicos</p>
                                    <p className="opciones"><input type="checkbox" className="checking" onChange={() => { this.check(2) }} /> Aspectos culturales y educativos</p>
                                    <p className="opciones"><input type="checkbox" className="checking" onChange={() => { this.check(3) }} /> Memoria Oral, Tradiciones, Folclor y Patrimonio</p>
                                    <p className="opciones"><input type="checkbox" className="checking" onChange={() => { this.check(4) }} /> Instituciones y Organizacion Social</p>
                                </div>
                            </div>
                            <div className="inpus">
                                <div>
                                    <h3 className="opciones1">
                                        Inserte la cantidad de preguntas
                                </h3>
                                    <input type="number" placeholder="Escriba aqui" id="cantidad" min={this.min()} max={this.state.cant} onInput={
                                        this.valid
                                    } onChange={
                                        () => {
                                            this.valid();
                                            this.setState({
                                                cantp: document.getElementById("cantidad").value
                                            });
                                        }
                                    } />
                                </div>
                                <input type="button" className="boton" value="Siguiente" onClick={this.valid2} />
                                {this.state.bool && <Redirect to={{
                                    pathname: "/juego", state: {
                                        preguntas: this.state.preguntas,
                                        cantidad: this.state.cantp
                                    }
                                }} />}
                            </div>
                        </div>
                    </div>
                    <footer className="footer">
                        Trivia San Antonio de Prado-Juan Camilo Montoya
                    </footer>
                </div>

            </>
        );
    }
}

export default Home;
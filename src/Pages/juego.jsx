import React from 'react';
import '../styles/Home.css';
import {Link, withRouter} from 'react-router-dom';
class Juego extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            preguntas:this.props.location.state.preguntas,
            cant:this.props.location.state.cantidad,
            preguntaact:{}, 
            puntaje:0, 
            orden: [], 
            cont:0
         }
    }
    componentWillMount=()=>{     
        console.log(this.props.location.state.preguntas);     
        this.randome();
    }
    componentDidUpdate=()=>{
        console.log(this.props.location.state.preguntas);
        this.randome();
    }
    randome=()=>{
        let pos= Math.floor( Math.random() * this.props.location.state.preguntas.length);
        let esom=this.props.location.state.preguntas;        
        console.log(esom);
        this.state.preguntaact=this.state.preguntas[pos];
        console.log(this.state.preguntas);
        this.props.location.state.preguntas.splice(pos,pos+1);
        console.log(this.props.location.state.preguntas);
    }
    opciones=()=>{
        let opciones=[false,
            false,
            false,
            false];
        let orden=[];
        while(!opciones[0]||!opciones[1]||!opciones[2]||!opciones[3]){
            let pregunta= Math.floor( Math.random() * 4);
                if(pregunta==0&&!opciones[0]){
                    orden.push(pregunta);
                } else if(pregunta==1&&!opciones[1]){
                    orden.push(pregunta);
                }else if(pregunta==2&&!opciones[2]){
                    orden.push(pregunta);
                }else if(pregunta==3&&!opciones[3]){
                    orden.push(pregunta);
                }
            opciones[pregunta]=true;
        }
        this.state.orden=orden;

    }
    evaluar=(x)=>{
        let puny=this.state.puntaje;
        let cont=this.state.cont;
        let elemento=document.getElementById("boton"+x).value;
        if(elemento == this.state.preguntaact.respuesta){
            puny++;
        }
        cont++;
        this.setState({
            puntaje:puny,
            cont:cont
        });
    }
    finalizar=()=>{
        if(this.state.cont < this.state.cant){
            return (
                <>
                    <input type="button" value={this.state.puntaje}/>
                    <p>{this.state.preguntaact.pregunta}</p>
                    {this.opciones()}
                    {this.state.orden.map((Esito, Index)=>{
                        if(Esito==0){
                            return(
                                <>
                                    <input type="button" id={"boton"+Index} onClick={()=>{this.evaluar(Index)}} value={this.state.preguntaact.respuesta}/>
                                </>);
                        } else if(Esito==1){
                            return(
                                <>
                                    <input type="button" id={"boton"+Index} onClick={()=>{this.evaluar(Index)}} value={this.state.preguntaact.opcion1}/>
                                </>);
                        }else if(Esito==2){
                            return(
                                <>
                                    <input type="button" id={"boton"+Index} onClick={()=>{this.evaluar(Index)}} value={this.state.preguntaact.opcion2}/>
                                </>);
                        }else if(Esito==3){
                            return(
                                <>
                                    <input type="button" id={"boton"+Index} onClick={()=>{this.evaluar(Index)}} value={this.state.preguntaact.opcion3}/>
                                </>);
                        }
                    })}
                </>
            );
        }
    }
    render() { 
        return ( 
            <>                
                <div className="juegoF">
                    {this.finalizar()}                    
                </div>
            </>
         );
    }
}
 
export default withRouter(Juego);
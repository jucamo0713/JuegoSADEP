
import React from 'react';
import '../styles/Home.css';
import {preguntas} from '../Utiles/mocks/preguntas';
import {Link} from 'react-router-dom';
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            preguntas:[],
            cant:0,
            checks:[
                false,
                false,
                false,
                false,
                false
            ],
            cantp:0
         }
    }
    componentDidUpdate(){
        console.log(this.state.preguntas);
    }
    check=async(x)=>{
        let auxiliar=this.state.checks;
        auxiliar[x]=!this.state.checks[x];
        let auxiliar2=[];
        let auxiliar3=[];
        let auxiliar4=[];
        let auxiliar5=[];
        let auxiliar6=[];
        if(auxiliar[0]){            
            auxiliar2=preguntas.filter(filtro=>filtro.categoria==0);
        }
        if(auxiliar[1]){            
            auxiliar3=preguntas.filter(filtro=>filtro.categoria==1);
        } 
        if(auxiliar[2]){            
            auxiliar4=preguntas.filter(filtro=>filtro.categoria==2);
        } 
        if(auxiliar[3]){            
            auxiliar5=preguntas.filter(filtro=>filtro.categoria==3);
        } 
        if(auxiliar[4]){            
            auxiliar6=preguntas.filter(filtro=>filtro.categoria==4);
        }
        let final=[];
        for(let i=0;i<auxiliar6.length;i++){
            if(auxiliar[4]){         
                final.push(auxiliar6[i]);
            }
        }
        for(let i=0;i<auxiliar5.length;i++){
            if(auxiliar[3]){         
                final.push(auxiliar5[i]);
            }
        }
        for(let i=0;i<auxiliar4.length;i++){
            if(auxiliar[2]){         
                final.push(auxiliar4[i]);
            }
        }
        for(let i=0;i<auxiliar3.length;i++){
            if(auxiliar[1]){         
                final.push(auxiliar3[i]);
            }
        }
        for(let i=0;i<auxiliar2.length;i++){
            if(auxiliar[0]){         
                final.push(auxiliar2[i]);
            }
        }
        this.setState({
            checks:auxiliar,
            preguntas:final,
            cant:final.length
        });
    }
    min=()=>{
        if(this.state.cant==0){
            return "0";
        }else{
            return "1";
        }
    }
    
    render() { 
        return ( 
            <>
                <div className="homeF">
                    <h1 className="homeT">Trivia San Antonio de Prado</h1>
                    <p><input type="checkbox" onChange={()=>{this.check(0)}}/> Generalidades del corregimiento</p>
                    <p><input type="checkbox" onChange={()=>{this.check(1)}}/> Aspectos historicos</p>
                    <p><input type="checkbox" onChange={()=>{this.check(2)}}/> Aspectos culturales y educativos</p>
                    <p><input type="checkbox" onChange={()=>{this.check(3)}}/> Memoria Oral, Tradiciones, Folclor y Patrimonio</p>
                    <p><input type="checkbox" onChange={()=>{this.check(4)}}/> Instituciones y Organizacion Social</p>
                    <input type="number" id="cantidad" min={this.min()} max={this.state.cant} onChange={
                        ()=>{
                            this.setState({
                                cantp:document.getElementById("cantidad").value
                            });
                        }
                    }/>
                    <Link to={{pathname:"/juego",state:{
                            cantidad:this.state.cantp,
                            preguntas:this.state.preguntas
                    }}}><input type="button" value="Siguiente"/></Link>
                </div>
            </>
         );
    }
}
 
export default Home;
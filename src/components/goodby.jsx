import React from 'react';

export default class Goodbye extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: this.props.name,
            color: 'black'
        }
    }

    setColor=()=>{
        this.setState(
            {color:'red'}
        )
    };

    revertColor=()=>{
        this.setState(
            {color:"blue"}
        )
    };

    render(){
        return (
        <h1 onMouseEnter={this.setColor} onMouseLeave={this.revertColor} style={{color:this.state.color}}> Goodbye {this.props.name}</h1>
        )
    }
}
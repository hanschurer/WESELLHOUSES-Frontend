import React from 'react';

export default class hello extends React.Component{
   
    render(){
        const greeting = 'hellofucking world'+ this.props.name;
        return (
        <h1> { greeting }</h1>
        )
    }

}
import React from 'react';
import { useParams } from 'react-router-dom';

function Item(props) {
let { id } = useParams(); return (
<div>
<h1>Item ID: {id}</h1>
<p>This is where individual article posts can be displayed</p>
</div> );
}
export default Item;
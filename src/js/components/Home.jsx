 import React from 'react';
 export class Home extends React.Component{
 	render(){
 		let content="";
 		 if (true) {
 		 	content = <p>Hello!</p>;
 		 }
 		return(
 			<div>
				<p>In a new Component 29</p>
				{content}
 			</div>
 		);
 	}
 }

import React from 'react'
export class Header extends React.Component{
	render(){
		return(
			<div className="navbar navbar-default">
				<div className="container">
					<div className="navbar-header">
						<ul className="nav navbar-nav">
							<li className="active">
								<a href="#">Homes</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}
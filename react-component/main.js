// import React from 'react';
const {Component} = React;

class MyTodoComponent extends Component {
	constructor(props){
		super(props);
		this.displayName = 'MyTodoComponent';
	}
	componentWillMount(){
		console.log(this.displayName, 'componentWillMount', this);
	}
	componentDidMount(){
		console.log(this.displayName, 'componentDidMount', this);
	}
	componentWillUnmount(){
		console.log(this.displayName, 'componentWillUnmount', this);
	}
	render(){
		const { children, name } = this.props;
		return (



			<div className='MyTodoComponent'>
				<header>
					Welcome <span>{name}</span>
				</header>

				{children}








				<style>{`
					.MyTodoComponent {
						display: block;
					}
					.MyTodoComponent span{
						color: blue;
					}
				`}</style>
			</div>
		);
	}
}

import * as React from 'react';

export class TextareaComponent extends React.Component {
	public ghost;

	constructor(public props: {
		height: any;
		value: any;
		valueHandler: any;
		getHeight: any;
	}){
		super(props);
	}

	public componentDidMount(){
		this.setFilledTextAreaHeight(this.ghost);
	}

	public setFilledTextAreaHeight(ghost){
			const element = ghost;
			console.log('ghost height', element.clientHeight);
			this.props.getHeight(element.clientHeight);
	}

	private getExpandableField(){
		const {height, value} = this.props;
		return (
			<textarea
				className={'textarea'}
				name={'textarea'}
				value={value}
				style={{
					height
				}}
				onChange={(event) => {this.props.valueHandler(event.target.value)}}
				onKeyUp={() => this.setFilledTextAreaHeight(this.ghost)}
			/>
		);
	}

	private getGhostField(){
		return(
			<div
				className={'textarea textarea--ghost'}
				ref={(eleRef) => this.ghost = eleRef}
				aria-hidden='true'
			>
				{this.props.value}
			</div>
		);
	}

	render(){
		return(
			<div
				className={'textarea-container'}>
				{this.getExpandableField()}
				{this.getGhostField()}
			</div>
		)
	}
}

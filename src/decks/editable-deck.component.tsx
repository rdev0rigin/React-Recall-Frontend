import * as React from 'react';
import {TextareaComponent} from '../forms/textarea.component';

export class EditableDeckComponent extends React.Component {
	public state: {
		descriptionHeight: number;
	};
	constructor(public props: {
		deckHandler: (value) => any;
		title: string;
		description: string;
	}) {
		super(props);
		this.state = {
			descriptionHeight: 39
		};
		this.descriptionHeightHandler = this.descriptionHeightHandler.bind(this);
		this.descriptionValueHandler = this.descriptionValueHandler.bind(this);
	}
	private setDeckValue(value){
		this.props.deckHandler(value);
	}

	private descriptionValueHandler(value){
		this.setDeckValue({title: this.props.title, description: value});
	}

	private titleValueHandler(value){
		this.setDeckValue({title: value, description: this.props.description});
	}

	private descriptionHeightHandler(value){
		if(value !== this.state.descriptionHeight){
			this.setState({descriptionHeight: value});
			console.log('height', value)
		}
	}

	render() {
		return (
			<div className={'create-deck-form'}>
				<div className={'title-input'}>
					<h2>Title</h2>
					<input className={'deck-title-input'}
					       onChange={(event) => this.titleValueHandler(event.target.value)}
					       value={this.props.title}
					/>
				</div>
				<h2>Description</h2>
				<div
					className={'description-textarea'}
				>
					<TextareaComponent
						height={this.state.descriptionHeight}
						getHeight={this.descriptionHeightHandler}
						valueHandler={this.descriptionValueHandler}
						value={this.props.description}
					/>
				</div>
			</div>
		);
	}
}

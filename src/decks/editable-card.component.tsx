import * as React from 'react';
import {TextareaComponent} from '../forms/textarea.component';
import {FlashCard} from '../models/decks.model';

export class EditableCardComponent extends React.Component {
	public state: {
		height: number;
		questionHeight: number;
		answerHeight: number;
		answerValue: string;
		questionValue: string;
	};

	constructor(public props: {
		card: FlashCard;
		cardValueHandler: (card) => any;

	}){
		super(props);
		this.state = {
			height: 39,
			answerHeight: 39,
			questionHeight: 39,
			questionValue: this.props.card.question,
			answerValue: this.props.card.answer
		};
		this.questionHandler = this.questionHandler.bind(this);
		this.answerHandler = this.answerHandler.bind(this);
		this.questionHeight = this.questionHeight.bind(this);
		this.answerHeight = this.answerHeight.bind(this);
	}
	public componentDidMount(){
		console.log('editable did mount')
	}

	private questionHeight(value) {
		console.log('question', value);
		if (value !== this.state.questionHeight && value > this.state.answerHeight) {
			this.setState({height: value, questionHeight: value});
		} else if (value !== this.state.questionHeight){
			this.setState({questionHeight: value});
		}
	}


	private answerHeight(value) {
		console.log('answer', value);
		if(value !== this.state.answerHeight && value > this.state.questionHeight){
			this.setState({height: value, answerHeight: value});
		} else if (value !== this.state.answerHeight) {
			this.setState({answerHeight: value});
		}
	}

	private handleValueChange(card){
		this.props.cardValueHandler(card);
	}

	private answerHandler(value){
		this.handleValueChange({...this.props.card, answer: value});
		this.setState({answerValue: value});
	}

	private questionHandler(value){
		this.handleValueChange({...this.props.card, question: value});
		this.setState({questionValue: value});
	}

	public render(){
		return (
			<div className={'card-details'}>
				<div className={'question'}>
					<TextareaComponent
						height={this.state.height}
						value={this.props.card.question}
						valueHandler={this.questionHandler}
						getHeight={this.questionHeight}
					/>
				</div>
				<div className={'answer'}>
					<TextareaComponent
						height={this.state.height}
						value={this.props.card.answer}
						valueHandler={this.answerHandler}
						getHeight={this.answerHeight}
					/>
				</div>
			</div>
		)
	}
}
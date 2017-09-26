import * as React from 'react';
import * as Moment from 'moment';
// import {EditableCardComponent} from './editable-card.component';
import {FlashCardDeck} from '../models/decks.model';

export class CardsEditableList extends React.Component {
	public keyCounter = -1; //serves as index

	constructor(public props: {
		deck: FlashCardDeck;
		questionHandler: any;
		answerHandler: any;
	}){
		super(props);
	}


	public render(){
		return <div className={'cards-list'}>
			{this.props.deck.cards.map(card => {
				this.keyCounter++;
				return (
					<div
						className={'card-item'}
						key={this.keyCounter.toString()}>
						{/*<EditableCardComponent {...{*/}
							// question: card.question,
							// answer: card.answer,
							// index: this.keyCounter,
							// questionHandler: this.props.questionHandler,
							// answerHandler: this.props.answerHandler
						// }} />
					</div>
				);
			})}
		</div>
	}
}

export const CardsList = (props): any => {
	let keyCounter = -1;
	return <div className={'cards-list'}>
		{ props.cards.map(card => {
			keyCounter++;
			return (
				<div
					className={'card-item'}
					key={keyCounter.toString()}>
					{CardDetails({
						...card,
						id: keyCounter,
						questionHandler: props.questionHandler,
						answerHandler: props.answerHandler
					})}
				</div>
			)
		})}
	</div>
};


// export class EditableCardComponent extends React.Component {
// 	public state: {
// 		height: number;
// 		questionHeight: number;
// 		answerHeight: number;
// 		answerValue: string;
// 		questionValue: string;
// 	};
//
// 	constructor(public props: {
// 		id: string;
// 		question: string;
// 		answer: string;
// 		questionHandler: (value, id) => any;
// 		answerHandler: (value, id) => any;
// 	}){
// 		super(props);
// 		this.state = {
// 			height: 20,
// 			answerHeight: 20,
// 			questionHeight: 20,
// 			questionValue: 'Default question',
// 			answerValue: 'Default answer'
// 		};
// 		this.questionHandler = this.questionHandler.bind(this);
// 		this.answerHandler = this.answerHandler.bind(this);
// 		this.questionHeight = this.questionHeight.bind(this);
// 		this.answerHeight = this.answerHeight.bind(this);
// 	}
//
// 	public componentDidMount(): void {
// 		this.setState(
// 			{
// 				questionValue: this.props.question,
// 				answerValue: this.props.answer
// 			}
// 		);
// 	}
//
// 	private questionHeight(value) {
// 		console.log('question', value);
// 		if (value !== this.state.questionHeight && value > this.state.answerHeight) {
// 			this.setState({height: value, questionHeight: value});
// 		} else if (value !== this.state.questionHeight){
// 			this.setState({questionHeight: value});
// 		}
// 	}
//
// 	private answerHeight(value) {
// 		console.log('answer', value);
// 		if(value !== this.state.answerHeight && value > this.state.questionHeight){
// 			this.setState({height: value, answerHeight: value});
// 		} else if (value !== this.state.answerHeight) {
// 			this.setState({answerHeight: value});
// 		}
// 	}
//
// 	private answerHandler(value, id){
// 		this.props.answerHandler(value, id);
// 		this.setState({answerValue: value});
// 	}
//
// 	private questionHandler(value, id){
// 		this.props.questionHandler(value, id);
// 		this.setState({questionValue: value});
// 	}
//
// 	public render(){
// 		return (
// 			<div className={'card-details'}>
// 				<div className={'question'}>
// 					<TextareaComponent
// 						id={this.props.id}
// 						height={this.state.height}
// 						value={this.state.questionValue}
// 						valueHandler={this.questionHandler}
// 						getHeight={this.questionHeight}
// 					/>
// 				</div>
// 				<div className={'answer'}>
// 					<TextareaComponent
// 						id={this.props.id}
// 						height={this.state.height}
// 						value={this.state.answerValue}
// 						valueHandler={this.answerHandler}
// 						getHeight={this.answerHeight}
// 					/>
// 				</div>
// 			</div>
// 		)
// 	}
// }

export const CardDetails = (props): any => {
	return (
		<div className={'card-details'}>
			<div className={'question'}>
				{props.question}
			</div>
			<div className={'answer'}>
				{props.answer}
			</div>
		</div>
	)
};

export const DecksList = (props) => {
	const decks = props.decks;
	const deckItems = decks.map(deck =>
		<li
			onClick={() => {
				props.handler(deck.id);
			}}
			className={'deck-item'}
			id={deck.id.toString()}
			key={deck.id.toString()}
		>
			<div className={'deck-title'}>
				{deck.title}
			</div>
			<p className={'deck-description'}>
				{deck.description}
			</p>
			<div className={'deck-footer'}>
				<div className={'deck-footer-author'}>
					by: {deck.authorName}
				</div>
				<div className={'deck-footer-date'}>
					on: {Moment(deck.createdAt).format('LL')}
				</div>
			</div>
		</li>
	);

	return (
		<ul className={'deck-list'}>
			{deckItems}
		</ul>
	)
};

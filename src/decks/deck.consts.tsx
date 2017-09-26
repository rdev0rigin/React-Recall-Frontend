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
		<div
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
		</div>
	);

	return (
		<div className={'deck-list'}>
			{deckItems}
		</div>
	)
};

import * as React from 'react';
import {nextIcon, prevIcon} from '../assets/icons';
import {RecallStore} from '../services/store.redux';
import {FlashCard} from '../models/decks.model';

export class FlashCardComponent extends React.Component {
	public state: {
		deckSelected: boolean;
		dataReady: boolean;
		displayText: string;
		showQuestion: boolean;
		currentCard: FlashCard;
		cards: FlashCard[];
	};
	constructor(public props){
		super(props);
		this.state = {
			deckSelected: false,
			dataReady: false,
			showQuestion: true,
			currentCard: {} as FlashCard,
			displayText: 'Please Select A Deck',
			cards: []
		};
		this.flipCardHandler = this.flipCardHandler.bind(this);
		this.nextHandler = this.nextHandler.bind(this);
		this.prevHandler = this.prevHandler.bind(this);

	};

	public componentDidMount(): void {
		const state = RecallStore.getState();
		if(state.deckSelected){
			this.setState({
				cards: state.currentDeck.cards,
				currentCard: state.currentDeck.cards[0],
				displayText: state.currentDeck.cards[0].question,
				dataReady: true
			})
		} else {
			this.setState({dataReady: true});
		}
	}

	private flipCardHandler(): void {
		if(this.state.showQuestion){
			this.setState(
				{
					showQuestion: false,
					displayText: this.state.currentCard.answer
				}
			);
		} else {
			this.setState(
				{
					showQuestion: true,
					displayText: this.state.currentCard.question
				}
			);
		}
	}

	private prevHandler(e): void {
		e.stopPropagation();
		const currentIndex = this.state.cards.findIndex(card => card.id === this.state.currentCard.id);
		if(currentIndex < 1){
			this.setState(
				{
					currentCard: this.state.cards[this.state.cards.length - 1],
					displayText: this.state.cards[this.state.cards.length - 1].question,
					showQuestion: true
				}
			);
		} else {
			this.setState(
				{
					currentCard: this.state.cards[currentIndex - 1],
					displayText: this.state.cards[currentIndex - 1].question,
					showQuestion: true
				}
			);
		}

	}

	private nextHandler(e): void {
		e.stopPropagation();
		const currentIndex = this.state.cards.findIndex(card => card.id === this.state.currentCard.id);
		const nextIndex = (currentIndex + 1) % (this.state.cards.length);
		this.setState(
			{
				currentCard: this.state.cards[nextIndex],
				displayText: this.state.cards[nextIndex].question,
				showQuestion: true
			}
		);
	}

	public render(){
		return this.state.dataReady
			?
				(
					<div
						className={'flash-card-component'}
					>
						<FlashCard
							text={this.state.displayText}
							prevHandler={this.prevHandler}
							nextHandler={this.nextHandler}
							flipCardHandler={this.flipCardHandler}
						/>
					</div>
				)
			:
				(
					<div>
						Data Loading . . . . . . .
					</div>
				)
	}
}

const FlashCard = (props: {
	text: string;
	prevHandler: (e) => void;
	nextHandler: (e) => void;
	flipCardHandler: () => void;
}) =>
	<div
		className={'flash-card'}
		onClick={props.flipCardHandler}
	>
		<div
			className={'text'}
		>
			{props.text}
		</div>
		<div
			className={'prev'}
			onClick={props.prevHandler}>
			{prevIcon()}
		</div>
		<div
			className={'next'}
			onClick={props.nextHandler}
		>
			{nextIcon()}
		</div>
	</div>;
import * as React from 'react';
import * as Moment from 'moment';

export const CardsEditableList = (props): any => {
	let keyCounter = -1;
	return <ul className={'cards-list'}>
		{ props.cards.map(card => {
			keyCounter++;
			return (
				<li
					className={'card-item'}
					key={keyCounter.toString()}>
					{CardEditableDetails({
						...card,
						id: keyCounter,
						questionHandler: props.questionHandler,
						answerHandler: props.answerHandler
					})}
				</li>
			)
		})}
	</ul>
};

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


export const CardEditableDetails = (props): any => {
	return (
		<div className={'card-details'}>
			<div className={'question'}>
				<textarea className={'card-question'} value={props.question} onChange={(e) => props.questionHandler(e, props.id)} />
			</div>
			<div className={'answer'}>
				<textarea className={'card-answer'} value={props.answer} onChange={(e) => props.answerHandler(e, props.id)}/>
			</div>
		</div>
	)
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

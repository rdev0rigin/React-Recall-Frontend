import * as React from 'react';

export const CardsList = (props): any => {
	let keyCounter = -1;
	return <ul>
		{ props.cards.map(card => {
			keyCounter++;
			return (
				<li key={keyCounter.toString()}>
					{CardDetails({
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

export const CardDetails = (props): any => {
	return (
		<div className={'card-details'}>
			<textarea className={'card-question'} value={props.question} onChange={(e) => props.questionHandler(e, props.id)} />
			<textarea className={'card-answer'} value={props.answer} onChange={(e) => props.answerHandler(e, props.id)}/>
		</div>
	)
};

export function decksList(props){
	const decks = props.decks;
	const deckItems = decks.map(deck =>
		<li
			onClick={() => {
				props.handler(deck.id);
			}}
			className={'deck-item'}
			key={deck.id.toString()}
		>
			<div className={'deck-title'}>
				Title: {deck.title}
			</div>
			<p className={'deck-description'}>
				{deck.description}
			</p>
			<div className={'deck-footer'}>
				<div className={'deck-footer-author'}>
					made by: {deck.authorName}
				</div>
				<div className={'deck-footer-date'}>
					made on: {deck.createdOn}
				</div>
			</div>
		</li>
	);

	return (
		<ul className={'deck-list'}>
			{deckItems}
		</ul>
	)
}

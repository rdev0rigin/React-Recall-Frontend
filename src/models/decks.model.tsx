export interface FlashCard {
	id: string;
	deckId?: string;
	question?: string;
	answer?: string;
	altAnswers?: string[];
}

export interface FlashCardDeck {
	cards: FlashCard[];
	id?: string;
	createdOn?: string;
	title: string;
	description: string;
	authorName: string;
	authorId: string;
}

export const DECKS = (deckName: string): any => {
	switch (deckName) {
		case'demo_array':
			return [{
				id: '9712d902-daed-41fc-a5b4-7515fe02a7aa',
				authorName: 'Rob Dev',
				authorId: 'Rdev',
				description: 'Demo Deck',
				createdOn: '9-20-2017',
				title: 'Coding Trivia',
				cards:[
					{
						// id: '6',
						question: '& & and | | are examples of ..',
						answer: 'short circuit operators',
					},
					{
						// id: '0',
						question: 'What is functional programming?',
						answer: 'Functional programming is a paradigm that use functions to represent values.',
						// altAnswers: ['Functional programming is a paradigm that use functions to represent values.', 'using functions', 'functions provide information', 'a coding paradigm using functions', 'functions provide', 'functions relate', 'functions represent values', 'functions that represent values'],
					},
					{
						// id: '1',
						question: 'What does CQRS stand for?',
						answer: 'Command Query Responsibility Segregation',
						// altAnswers: ['Command Query Responsibility Segregation', 'Command, Query, Responsibility, Segregation']

					},
					{
						// id: '3',
						question: 'What is the formula for Amortized Cost',
						answer: 'Cost(n Operations) / n',
						// altAnswers: ['Cost(n Operations) / n', 'The sum of n actual costs divided by n']
					},
				]
			}];
		default:
			return {message: 'No deck by that name.'} as any;
	}
};
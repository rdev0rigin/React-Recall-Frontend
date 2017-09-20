export interface FlashCard {
	cardId: string;
	deckId?: string;
	mode?: string;
	question?: string;
	answers?: string[];
	onSubmit: () => any;
	title: string;
	points?: number;
}

export interface FlashCardDeck {
	cards: FlashCard[];
	meta:{
		id: string;
		authorName: string;
		authorId: string;
		description: string;
		createdOn: string;
		title: string;
	}
	[key: number]: FlashCard;
}

export const DECKS = (deckName: string): any => {
	switch (deckName) {
		case'demo':
			return {
				meata: {
					deckId: 'rdev-coding-deck-00',
					deckTitle: 'Coding Trivia'
				},
				0: {
					cardId: '0',
					question: 'What is functional programming?',
					answers: ['Functional programming is a paradigm that use functions to represent values.', 'using functions', 'functions provide information', 'a coding paradigm using functions', 'functions provide', 'functions relate', 'functions represent values', 'functions that represent values'],
				},
				1: {
					cardId: '1',
					question: 'What does CQRS stand for?',
					answers: ['Command Query Responsibility Segregation', 'Command, Query, Responsibility, Segregation']

				},
				2: {
					cardId: '3',
					question: 'What is the formula for Amortized Cost',
					answers: ['Cost(n Operations) / n', 'The sum of n actual costs divided by n']
				},
				3: {
					cardId: '4',
					question: 'React uses <Expr /> which is an example of a ...',
					answers: ['element class type', 'element class']
				}

			};
		case'demo_array':
			return [{
				meta: {
					id: 'rdev-coding-deck-01',
					authorName: 'Rob Dev',
					authorId: 'Rdev',
					description: 'Demo Deck',
					createdOn: '9-20-2017',
					title: 'Coding Trivia',
				},
				cards:[
					{
						cardId: '6',
						title: 'f(null)',
						question: '& & and | | are examples of ..',
						answers: ['short circuit operators'],
					},
					{
						cardId: '3',
						title: 'f(null)',
						question: 'What is functional programming?',
						answers: ['Functional programming is a paradigm that use functions to represent values.', 'usinging functions', 'functions provide information', 'a coding paradigm using functions', 'functions provide', 'functions relate', 'functions represent values', 'functions that represent values'],
					},
					{
						id: '4',
						title: 'Did you mean Cars?',
						question: 'What does CQRS stand for?',
						answers: ['Command Query Responsibility Segregation', 'Command, Query, Responsibility, Segregation']

					},
					{
						id: '5',
						question: 'What is the formula for Amortized Cost',
						answers: ['Cost(n Operations) / n', 'The sum of n actual costs divided by n']
					}
				]
			}];
		default:
			return {message: 'No deck by that name.'} as any;
	}
};
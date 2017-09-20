import {RecallReducer} from '../main/app.reducer';
import {createStore, Store} from 'redux';

export interface Action {
	type: string;
	[key: string]: any;
}

export const RecallStore: Store<any> = createStore(RecallReducer);

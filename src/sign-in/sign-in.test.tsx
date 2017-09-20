import * as React from 'react';
import {mount, shallow} from 'enzyme';
import {SignInComponent} from './sign-in.component';

describe('Sign In Component Tests', () => {
	it('should render', () => {
		const component = shallow(<SignInComponent/>);
		expect(component).toMatchSnapshot();
	});

	it('should initialize with state, gapiReady to be false', () => {
		const component = shallow(<SignInComponent/>);
		expect(component.state().gapiReady).toBe(false);
	});

	it('should call loadGapi() on componentDidMount', () => {
		const component = mount(<SignInComponent/>);
		console.log(component.props);
	})

});
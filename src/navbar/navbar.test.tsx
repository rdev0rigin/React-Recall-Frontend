/* eslint-disable no-unused-vars */

import * as React from 'react';
import { NavbarComponent } from './navbar.component';
import { shallow } from 'enzyme';

describe('Navbar Tests', () => {

	it('should render correctly', () => {
		const tree = shallow(<NavbarComponent signedIn={false}/>);
		expect(tree).toMatchSnapshot();
	});

	it('should have 4 buttons', () => {
		const tree = shallow(<NavbarComponent signedIn={false}/>);
		expect(tree).toMatchSnapshot();

		expect(tree.find('button').length).toEqual(4);
	});
});

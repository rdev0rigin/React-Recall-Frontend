import * as React from 'react';

const initialState  = {
	active: true,
	model: ''
};

export interface TextInputState {
		active: boolean;
		model: string;
}

export class TextInputComponent extends React.Component {
	public state: TextInputState;
	constructor(
		public props: {
			initialValue: string;
			valueHandler: (e) => any;
		}
	) {
		super(props);
		this.state = initialState;
		this.visibilityToggle = this.visibilityToggle.bind(this);
		this.onValueChange = this.onValueChange.bind(this);
		this.onCancel = this.onCancel.bind(this);
	}

	public componentDidMount(): void {
		this.setState({model: this.props.initialValue});
		console.log('input state', this.state);
	}

	public onValueChange(e): void {
		this.setState({model: e.target.value});
		console.log('onValueChange', e.target.value, this.state.model);
		this.props.valueHandler(e.target.value);
	}

	public onCancel(): void {
		this.setState({model: this.props.initialValue});
		this.visibilityToggle();
	}

	public visibilityToggle(): void {
		this.setState({active: !this.state.active})
	}

	render(): any {
		return(
			<div className={'text-input-component'}>
				{/*<strong*/}
			        {/*onClick={this.visibilityToggle}*/}
			        {/*className={this.state.active ? 'hidden' : 'label'}*/}
				{/*>*/}
					{/*{this.state.model}*/}
				{/*</strong>*/}
				<div
					className={this.state.active ? 'input-container' : 'hidden'}
				>
					<input
						value={this.state.model}
						onChange={this.onValueChange}
					/>
					{/*<div onClick={this.visibilityToggle}>Save</div>*/}
					{/*/*/}
					{/*<div onClick={this.onCancel}>Cancel</div>*/}
				</div>
			</div>
		)
	}

}
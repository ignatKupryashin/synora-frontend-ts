import React, {ChangeEventHandler, FC} from 'react';

interface inputTextProps {
	id: string,
	name: string,
	value: string,
	label: string,
	styleName: string,
	onChange?: ChangeEventHandler,
}

const InputText:FC<inputTextProps> = (props: inputTextProps) => {
    return (
				<div className={`${props.styleName}__input`}>
					<label htmlFor={props.id} className={`${props.styleName}__input_label`}>{props.label}</label>
					<input
						type="text"
						id={props.id}
						name={props.name}
						value={props.value}
						onChange={props.onChange}
						className={`${props.styleName}__input_field`}
					/>
				</div>
			)
};

export default InputText;
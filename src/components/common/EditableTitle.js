import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import { noop } from '../../utils/utils';

const baseStyle = { height: '34px', width: '100%', cursor: 'pointer', fontWeight: 'bold' };
const useStyles = makeStyles(() => ({
	root: {
		...baseStyle,
		padding: 0,
		'& input': {
			padding: '5px 10px',
			textAlign: 'center',
			fontSize: '14px',
			fontWeight: 'bold',
		},
	},
}));

const EditableTitle = ({
	title: titleProp,
	isEditing = false,
	isTitleValid = () => true,
	onTitleEdit = noop,
	onTitleSave = noop,
	onEditCancel = noop,
	...props
}) => {
	const classes = useStyles();
	const [title, setTitle] = useState(titleProp);
	const handleChange = ({ target: { value } }) => {
		if (isTitleValid(value)) {
			setTitle(value);
		}
	};
	const handleOnBlur = () => {
		if (titleProp === title) return onEditCancel();
		return onTitleSave(title);
	};

	return (
		isEditing
			? (
				<TextField
					classes={classes}
					defaultValue={title}
					variant='outlined'
					size='small'
					{...props}
					margin='none'
					autoFocus
					onChange={handleChange}
					onBlur={handleOnBlur}
				/>
			)
			: (
// eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
				<div
					style={{ ...baseStyle, paddingTop: '3px', textAlign: 'center' }}
					onClick={onTitleEdit}
				>
					{title}
				</div>
			)
	);
};

EditableTitle.defaultProps = {
	title: '',
	isEditing: false,
	isTitleValid: () => true,
	onTitleEdit: noop,
	onTitleSave: noop,
	onEditCancel: noop,
};
EditableTitle.propTypes = {
	title: PropTypes.string,
	isEditing: PropTypes.bool,
	isTitleValid: PropTypes.func,
	onTitleEdit: PropTypes.func,
	onTitleSave: PropTypes.func,
	onEditCancel: PropTypes.func,
};

export default EditableTitle;

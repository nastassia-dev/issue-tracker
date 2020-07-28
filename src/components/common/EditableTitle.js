import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const noop = () => null;
const baseStyle = {height: '34px', width: '100%', cursor: 'pointer', fontWeight: 'bold'};
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
		onTitleSave(title);
	};

	return (
		isEditing
			?
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
			:
			<div
				style={{...baseStyle, paddingTop: '3px', textAlign: 'center'}}
				onClick={onTitleEdit}
			>
				{title}
			</div>
	);
};

export default EditableTitle;

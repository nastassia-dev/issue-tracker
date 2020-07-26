import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const baseStyle = {height: '34px', width: '100%', cursor: 'pointer'};
const useStyles = makeStyles(() => ({
	root: {
		...baseStyle,
		padding: 0,
		'& input': {
			padding: '5px 10px',
			textAlign: 'center',
			fontSize: '14px',
		},
	},
}));

const EditableTitle = ({
	                       title: titleProp,
	                       isEditingProp = false,
	                       isTitleValid = () => true,
	                       onTitleSave = () => null,
	                       onEditCancel = () => null,
	                       ...props
                       }) => {
	const classes = useStyles();
	const [title, setTitle] = useState(titleProp);
	const [isEditing, setIsEditing] = useState(isEditingProp);
	useEffect(() => {
		setIsEditing(isEditingProp);
	}, [isEditingProp]);

	const handleChange = ({ target: { value } }) => {
		if (isTitleValid(value)) {
			setTitle(value);
		}
	};
	const handleClick = (e) => {
		e.preventDefault();
		setIsEditing(true);
	};
	const handleOnBlur = () => {
		setIsEditing(false);
		onEditCancel();
		if (titleProp === title) return;
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
				onClick={handleClick}
			>
				{title}
			</div>
	);
};

export default EditableTitle;

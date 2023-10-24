import React from 'react';
import {ISVGProps} from "./ISVGProps";

const DeleteIcon = (props: ISVGProps) => {
    return (
        <svg fill={props.color} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fillRule="evenodd" clipRule="evenodd" d="M8.5 5.7C8.5 4.20883 9.67525 3 11.125 3H12.875C14.3247 3 15.5 4.20883 15.5 5.7H19V7.5H5V5.7H8.5ZM10.25 5.7C10.25 5.20294 10.6418 4.8 11.125 4.8H12.875C13.3582 4.8 13.75 5.20294 13.75 5.7H10.25Z" fill={props.color} fillOpacity="0.16"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M8.5 5.7C8.5 4.20883 9.67525 3 11.125 3H12.875C14.3247 3 15.5 4.20883 15.5 5.7H19V7.5H5V5.7H8.5ZM10.25 5.7C10.25 5.20294 10.6418 4.8 11.125 4.8H12.875C13.3582 4.8 13.75 5.20294 13.75 5.7H10.25Z" fill={props.color}/>
            <path d="M5.875 18.3V9.3H7.625V18.3C7.625 18.7971 8.01675 19.2 8.5 19.2H15.5C15.9832 19.2 16.375 18.7971 16.375 18.3V9.3H18.125V18.3C18.125 19.7912 16.9497 21 15.5 21H8.5C7.05025 21 5.875 19.7912 5.875 18.3Z" fill={props.color} fillOpacity="0.16"/>
            <path d="M5.875 18.3V9.3H7.625V18.3C7.625 18.7971 8.01675 19.2 8.5 19.2H15.5C15.9832 19.2 16.375 18.7971 16.375 18.3V9.3H18.125V18.3C18.125 19.7912 16.9497 21 15.5 21H8.5C7.05025 21 5.875 19.7912 5.875 18.3Z" fill={props.color}/>
            <path d="M9.375 17.4V9.3H11.125V17.4H9.375Z" fill={props.color} fillOpacity="0.16"/>
            <path d="M9.375 17.4V9.3H11.125V17.4H9.375Z" fill={props.color}/>
            <path d="M12.875 9.3V17.4H14.625V9.3H12.875Z" fill={props.color} fillOpacity="0.16"/>
            <path d="M12.875 9.3V17.4H14.625V9.3H12.875Z" fill={props.color}/>
        </svg>

    );
};

export default DeleteIcon;
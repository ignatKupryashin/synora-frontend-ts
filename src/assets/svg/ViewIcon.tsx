import React from 'react';
import {ISVGProps} from "./ISVGProps";


const ViewIcon = (props: ISVGProps) => {
    return (
        <svg viewBox="0 0 22 20" fill={props.color} xmlns="http://www.w3.org/2000/svg">
            <path d="M3 2H6L8 0H3C1.34315 0 0 1.34315 0 3V17C0 18.6569 1.34315 20 3 20H13C14.6569 20 16 18.6569 16 17V14H14V17C14 17.5523 13.5523 18 13 18H3C2.44772 18 2 17.5523 2 17V3C2 2.44772 2.44772 2 3 2Z" fill={props.color} fillOpacity="0.16"/>
            <path d="M3 2H6L8 0H3C1.34315 0 0 1.34315 0 3V17C0 18.6569 1.34315 20 3 20H13C14.6569 20 16 18.6569 16 17V14H14V17C14 17.5523 13.5523 18 13 18H3C2.44772 18 2 17.5523 2 17V3C2 2.44772 2.44772 2 3 2Z" fill={props.color}/>
            <path fillRule="evenodd" clipRule="evenodd" d="M16.7133 10.7133C15.6918 11.5191 14.4021 12 13 12C9.68629 12 7 9.31371 7 6C7 2.68629 9.68629 0 13 0C16.3137 0 19 2.68629 19 6C19 7.18889 18.6542 8.29702 18.0577 9.2293L21.4142 12.5858L20 14L16.7133 10.7133ZM17 6C17 8.20914 15.2091 10 13 10C10.7909 10 9 8.20914 9 6C9 3.79086 10.7909 2 13 2C15.2091 2 17 3.79086 17 6Z" fill={props.color} fillOpacity="0.16"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M16.7133 10.7133C15.6918 11.5191 14.4021 12 13 12C9.68629 12 7 9.31371 7 6C7 2.68629 9.68629 0 13 0C16.3137 0 19 2.68629 19 6C19 7.18889 18.6542 8.29702 18.0577 9.2293L21.4142 12.5858L20 14L16.7133 10.7133ZM17 6C17 8.20914 15.2091 10 13 10C10.7909 10 9 8.20914 9 6C9 3.79086 10.7909 2 13 2C15.2091 2 17 3.79086 17 6Z" fill={props.color}/>
            <path d="M4 10V12H8L6 10H4Z" fill={props.color} fillOpacity="0.16"/>
            <path d="M4 10V12H8L6 10H4Z" fill={props.color}/>
            <path d="M12 14V16H4V14H12Z" fill={props.color} fillOpacity="0.16"/>
            <path d="M12 14V16H4V14H12Z" fill={props.color}/>
        </svg>

    );
};

export default ViewIcon;
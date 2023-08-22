import React, {ReactNode} from 'react';
import {Link, useMatch} from "react-router-dom";
import styles from "./NavElement.module.scss"


interface ICustomLink {
	children: ReactNode,
	to: string,
	props?: any
}



const NavElement = ({children, to, ...props}: ICustomLink) => {
		const match = useMatch(to);
		return (
			<li className={`${styles.navbar_elem} ${match && styles.navbar_elem_active}`}>
				<Link
					to={to}
					{...props}
					className={`${styles.link} ${match && styles.link_active}`}
				>
					{children}
				</Link>
			</li>

		)
};

export default NavElement;
import React from 'react';
import styles from "./UserPic.module.scss"

interface IUserPicProps {
    user: string;
}


const UserPic = (props: IUserPicProps) => {
    return (
        <div className={styles.userPic}>
            {props.user.split("")[0]}
        </div>
    );
};

export default UserPic;
import React, {MouseEventHandler} from 'react';
import styles from "./DeleteButton.module.scss"
import DeleteIcon from "../../../../assets/svg/DeleteIcon";


interface DeleteButtonProps {
    onDelete: MouseEventHandler;
}

const DeleteButton = (props: DeleteButtonProps) => {
    return (
        <div className={styles.deleteButton} onClick={(e) =>
        {
            e.stopPropagation();
            props.onDelete(e)}
        }>
            <DeleteIcon width={25} height={25} color=""/>
        </div>
    );
};

export default DeleteButton;
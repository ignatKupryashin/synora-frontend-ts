import React, {MouseEventHandler} from "react";
import styles from "./ViewButton.module.scss"
import ViewIcon from "../../../../assets/svg/ViewIcon";

interface ViewButtonProps {
    onClick: MouseEventHandler;
}

const ViewButton = (props: ViewButtonProps) => {
    return (
        <div className={styles.viewButton} onClick={(e) =>
        {
            e.stopPropagation();
            props.onClick(e)}
        }>
            <ViewIcon width={25} height={25} color=""/>
        </div>
    );
};

export default ViewButton;
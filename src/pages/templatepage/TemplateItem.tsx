import React, {MouseEventHandler} from 'react';
import {ITemplate} from "../../models/Template/ITemplate";
import styles from "../transferspage/TransferPage.module.scss";
import deleteIcon from "../../assets/svg/delete-icon.svg";

interface templateItemProps {
    template: ITemplate;
    onDelete: MouseEventHandler;
    onEdit?: MouseEventHandler;
}

const TemplateItem = (props: templateItemProps) => {
    return (
        <div className={styles.transferItem}>
            <div className={styles.transferItem__wrapper}>
                <div className={styles.transferItem__title}>{props.template.template_name}</div>
                <div className={styles.transferItem__text}>
                    {props.template.protocol_name}
                </div>
            </div>
            <button className={styles.transferItem__deleteButton} onClick={(e) => props.onDelete(e)}><img
                src={deleteIcon} alt='удалить'/></button>
        </div>
    );
};

export default TemplateItem;
import React, {MouseEventHandler} from 'react';
import {ITemplate} from "../../models/Template/ITemplate";
import styles from "../TransportPage/TransportPage.module.scss";
import DeleteButton from "../../components/UI/FunctionalButtons/DeleteButton/DeleteButton";

interface templateItemProps {
    template: ITemplate;
    onDelete: MouseEventHandler;
    onView?: MouseEventHandler;
    onEdit?: MouseEventHandler;
}

const TemplateItem = (props: templateItemProps) => {
    return (
        <div className={styles.transferItem} onClick={props.onView}>
            <div className={styles.transferItem__wrapper} >
                <div className={styles.transferItem__title}>{props.template.template_name}</div>
                <div className={styles.transferItem__text}>
                    {props.template.protocol_name}
                </div>
            </div>
            <DeleteButton onDelete={props.onDelete}/>
        </div>
    );
};

export default TemplateItem;
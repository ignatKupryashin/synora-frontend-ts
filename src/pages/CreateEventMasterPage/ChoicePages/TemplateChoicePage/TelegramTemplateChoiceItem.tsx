import {MouseEventHandler} from 'react';
import {TelegramTemplate} from "@/models/Template/TelegramTemplate.ts";
import styles from "../../CreateEventMasterPage.module.scss";
import ViewButton from "../../../../components/UI/FunctionalButtons/VuewButton/ViewButton";

interface TelegramTemplateItemProps {
    template: TelegramTemplate;
    chosen: boolean;
    protocolIsChosen: boolean;
    onClick: MouseEventHandler;
    onView: MouseEventHandler;
}

const TelegramTemplateChoiceItem = (props: TelegramTemplateItemProps) => {

    const stringLength = 50;

    return (
        <div className={`${styles.choiceItem} ${props.chosen ? styles.choiceItem__chosen : styles.choiceItem__notChosen}`} onClick={props.onClick}>
            <div>
                <h2 className={`${styles.choiceItem__heading} ${(props.protocolIsChosen && !props.chosen) ? styles.choiceItem__protocolIsChosen : styles.choiceItem__notProtocolIsChosen}`}>
                    {props.template.template_name}
                </h2>
                <p className={`${styles.choiceItem__discription} ${(props.protocolIsChosen && !props.chosen) ? styles.choiceItem__protocolIsChosen : styles.choiceItem__notProtocolIsChosen}`}>
                    {props.template.body.body.length > stringLength ? (props.template.body.body.slice(0, stringLength).concat("...")) : props.template.body.body}
                </p>
            </div>
            <ViewButton onClick={props.onView}/>
        </div>
    );
};

export default TelegramTemplateChoiceItem;
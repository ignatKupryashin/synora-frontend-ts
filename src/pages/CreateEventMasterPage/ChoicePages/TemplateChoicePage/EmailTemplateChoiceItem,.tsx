import {MouseEventHandler} from 'react';
import EmailTemplate from "models/Template/EmailTemplate";
import styles from "../../CreateEventMasterPage.module.scss";
import ViewButton from "../../../../components/UI/FunctionalButtons/VuewButton/ViewButton";

interface EmailTemplateItemProps {
    template: EmailTemplate;
    chosen: boolean;
    protocolIsChosen: boolean;
    onClick: MouseEventHandler;
    onView: MouseEventHandler;
}

const EmailTemplateChoiceItem = (props: EmailTemplateItemProps) => {

    const stringLength = 30;

    return (
        <div className={`${styles.choiceItem} ${props.chosen ? styles.choiceItem__chosen : styles.choiceItem__notChosen}`} onClick={props.onClick}>
            <div>
                <h2 className={`${styles.choiceItem__heading} ${(props.protocolIsChosen && !props.chosen) ? styles.choiceItem__protocolIsChosen : styles.choiceItem__notProtocolIsChosen}`}>
                    {props.template.template_name}
                </h2>
                <p className={`${styles.choiceItem__discription} ${(props.protocolIsChosen && !props.chosen) ? styles.choiceItem__protocolIsChosen : styles.choiceItem__notProtocolIsChosen}`}>
                    Тема: {props.template.letter_topic.length > stringLength ? (props.template.body.body.slice(0, stringLength).concat("...")) : props.template.letter_topic}
                </p>
            </div>
            <ViewButton onClick={props.onView}/>
        </div>
    );
};

export default EmailTemplateChoiceItem;
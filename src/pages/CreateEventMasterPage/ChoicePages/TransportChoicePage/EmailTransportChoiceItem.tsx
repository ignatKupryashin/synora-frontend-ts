import React, {MouseEventHandler} from 'react';
import EmailTransport from "../../../../models/Transport/IEmailTransport";
import styles from "../../CreateEventMasterPage.module.scss";
import ViewButton from "../../../../components/UI/FunctionalButtons/VuewButton/ViewButton";

interface EmailTransportChoiceItemProps {
    transport: EmailTransport;
    chosen: boolean;
    protocolIsChosen: boolean;
    onClick: MouseEventHandler;
    onView: MouseEventHandler;
}


const EmailTransportChoiceItem = (props: EmailTransportChoiceItemProps) => {
    return (
        <div className={`${styles.choiceItem} ${props.chosen ? styles.choiceItem__chosen : styles.choiceItem__notChosen}`} onClick={props.onClick}>
            <div>
                <h2 className={`${styles.choiceItem__heading} ${(props.protocolIsChosen && !props.chosen) ? styles.choiceItem__protocolIsChosen : styles.choiceItem__notProtocolIsChosen}`}>
                    {props.transport.transport_name}
                </h2>
                <p className={`${styles.choiceItem__discription} ${(props.protocolIsChosen && !props.chosen) ? styles.choiceItem__protocolIsChosen : styles.choiceItem__notProtocolIsChosen}`}>
                    {props.transport.transport_configs.EMAIL_FROM}
                </p>
            </div>
            <ViewButton onClick={props.onView}/>
        </div>
    );
};

export default EmailTransportChoiceItem;
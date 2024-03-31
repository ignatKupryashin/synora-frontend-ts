import React, {useEffect, useState} from 'react';
import TabBar from "../../../components/TabBar/TabBar";
import styles from "./TemplateViewPage.module.scss";
import {ITemplate} from "../../../models/Template/ITemplate";
import {TabBarItem} from "../../../components/TabBar/TabBarItem";

interface TemplateViewPageProps {
    viewItem: ITemplate | undefined;
}

/**
 * @param props.viewItem Просматриваемый шаблон
 * @constructor
 */
function TemplateViewPage (props: TemplateViewPageProps) {
    //Список вкладок
    const [tabsArray, setTabsArray] = useState<TabBarItem[]>([]);
    useEffect(() => {
        if (props.viewItem) {
                setTabsArray(
                    [{
                        title: props.viewItem.protocol_name,
                        content: (
                            <div className={styles.tabContent} key={props.viewItem.protocol_name}>
                                <h1 className={styles.tabContent__heading}>{props.viewItem.template_name}</h1>
                                {props.viewItem.letter_topic &&
                                    <p className={styles.tabContent__title}>{props.viewItem.letter_topic}</p>}
                                <p className={styles.tabContent__title}>Тело письма (HTML-код):</p>
                                <p className={styles.tabContent__paragrah}>{props.viewItem.body.body}</p>
                            </div>
                        )
                    }
                    ]
                )
            }
        else {
            setTabsArray([]);
        }
    }, [props.viewItem]);

    return (
        <div>
            <TabBar barArray={tabsArray}/>
        </div>
    );
}

export default TemplateViewPage;
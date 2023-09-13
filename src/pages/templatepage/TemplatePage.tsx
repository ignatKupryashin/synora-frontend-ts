import React from 'react';
import styles from "../transferspage/TransferPage.module.scss";
import {Link} from "react-router-dom";
import {useTemplateStore} from "../../store/templateStore/useTemplateStore";
import {ITemplate} from "../../models/Template/ITemplate";
import TemplateItem from "./TemplateItem";

const TemplatePage = () => {

    const templateList: ITemplate[] = useTemplateStore(state => state.templates);
    const deleteTemplate = useTemplateStore(state => state.deleteTemplate)
    const removeTemplate = useTemplateStore(state => state.removeTemplate)

    const deleteTemplateHandler = (template: ITemplate) => {
        try {
            deleteTemplate(template).then((response) => {
                    if (response) {
                        removeTemplate(template.id);
                    }
                }
            )
        } catch (e) {
            console.log((e as Error).message);
        }
    }

    return (
        <div className={styles.transfers}>
            <h1 className={styles.transfers__title}>Шаблоны</h1>
            <div className={styles.transfers__btn}>
                <Link to='/templates/new_template' className={styles.transfers__btn_link}>Создать шаблон</Link>
            </div>
            <div className={styles.transfers__list}>
                {
                    templateList.length > 0
                        ? templateList.map(template => (
                            <TemplateItem key={template.id} template={template} onDelete={(e) => deleteTemplateHandler(template)}/>
                        ))
                        : <div className={styles.transfers__item_text}>Пока что у Вас нет созданных шаблонов</div>
                }
            </div>
        </div>
    )
};

export default TemplatePage;
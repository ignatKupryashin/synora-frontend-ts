import React, {ReactNode, useState} from 'react';
// import styles from "../TransportPage/TransportPage.module.scss";
import {useNavigate} from "react-router-dom";
import {useTemplateStore} from "../../store/templateStore/useTemplateStore";
import {ITemplate} from "../../models/Template/ITemplate";
import TemplateItem from "./TemplateItem";
import {successful, unsuccessful} from "../../components/UI/Toast/Toast";
import AppButton from "../../components/UI/AppButton/AppButton";
import styles from './TemplatePage.module.scss';
import StandardFade from "../../components/Animations/StandardFade";
import AppDeleteConfirm from "../../components/AppDeleteConfirm/AppDeleteConfirm";

const TemplatePage = () => {




    const templateList: ITemplate[] = useTemplateStore(state => state.templates);
    const deleteTemplate = useTemplateStore(state => state.deleteTemplate)
    const removeTemplate = useTemplateStore(state => state.removeTemplate)
    const [deleteIsVisible, setDeleteIsVisible] = useState(false);
    const [deleteTemplateState, setDeleteTemplateState] = useState<ITemplate | undefined>(undefined)
    const [deleteQuestion, setDeleteQuestion] = useState<ReactNode>(<></>)

    const navigate = useNavigate();

    const deleteTemplateHandler = (template: ITemplate | undefined) => {
        if (template) {
            try {
                deleteTemplate(template).then((response) => {
                        if (response) {
                            removeTemplate(template.id);
                            successful(`Шаблон "${template.template_name}" успешно удален`)
                        }
                    }
                )
            } catch (e) {
                unsuccessful((e as Error).message);
            }
        }
    }

    return (
        <div className={styles.transfers}>
            <h1 className={styles.transfers__title}>Шаблоны</h1>
            <div className={styles.transfers__btn}>
                <AppButton type={'button'} value={'Создать шаблон'}
                           onClick={() => navigate('/templates/new_template')}/>
            </div>
            <div className={styles.transfers__list}>
                {
                    templateList.length > 0
                        ?

                        templateList.map(template => (
                           <StandardFade>
                                <TemplateItem template={template} onDelete={(e) => {
                                    e.stopPropagation()
                                    setDeleteTemplateState(template);
                                    setDeleteIsVisible(true);
                                    setDeleteQuestion(
                                        <p>Вы уверены, что хотите удалить шаблон {template.template_name}?</p>
                                    )
                                }}/>
                           </StandardFade>
                        ))

                        : <div className={styles.transfers__item_text}>Пока что у Вас нет созданных шаблонов</div>
                }
            </div>
            <AppDeleteConfirm
                question={deleteQuestion}
                onConfirm={() => deleteTemplateHandler(deleteTemplateState)}
                isVisible={deleteIsVisible}
                setIsVisible={setDeleteIsVisible}/>
        </div>
    )
};

export default TemplatePage;
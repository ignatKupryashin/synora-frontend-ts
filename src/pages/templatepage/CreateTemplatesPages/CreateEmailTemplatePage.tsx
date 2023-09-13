import React, {useState} from 'react';
import {useUserStore} from "../../../store/userStore/useUserStore";
import {useNavigate} from "react-router-dom";
import styles from "../../transferspage/TransferPage.module.scss";
import AppInput from "../../../components/Input/AppInput";
import {useTemplateStore} from "../../../store/templateStore/useTemplateStore";
import EmailTemplate from "../../../models/Template/EmailTemplate";
import {ITemplate} from "../../../models/Template/ITemplate";
import {useProjectStore} from "../../../store/projectStore/useProjectStore";

const CreateEmailTemplatePage = () => {

    const [templateName, setTemplateName] = useState('');
    const [letterTopic, setLetterTopic] = useState('');
    const [bodyData, setBodyData] = useState('');

    const sendTemplate = useTemplateStore(state => state.sendTemplate);
    const addTemplate = useTemplateStore(state => state.addTemplate);
    const userId = useUserStore(state => state.user?.id) || '';
    const projectId = useProjectStore(state => state.currentProject?.id) || '';
    const navigate = useNavigate();

    //middlewares

    const changeTemplateNameMiddleware = (e: React.FormEvent<HTMLInputElement>) => {
        setTemplateName(e.currentTarget.value);
    }

    const changeLetterTopicMiddleware = (e: React.FormEvent<HTMLInputElement>) => {
        setLetterTopic(e.currentTarget.value);
    }

    const changeBodyDataMiddleware = (e: React.FormEvent<HTMLInputElement>) => {
        setBodyData(e.currentTarget.value);
    }




    const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newEmailTemplate: EmailTemplate = new EmailTemplate(
            templateName,
            letterTopic,
            bodyData,
            projectId,
            userId
        );
        try {
            sendTemplate(newEmailTemplate).then((response: ITemplate) => addTemplate(response));
        } catch (e) {
            console.log((e as Error).message)
        } finally {
            navigate('/templates')
        }
    }



    return (
            <form onSubmit={formSubmit} className={styles.transfer__create}>
                <AppInput
                    id={'templateName'}
                    label={'Название шаблона:'}
                    type={'text'}
                    name={'templateName'}
                    placeholder={'Придумайте название шаблона'}
                    onChange={changeTemplateNameMiddleware}
                    maxLength={40}
                />

                <AppInput
                    id={'letterTopic'}
                    label={'Тема письма'}
                    type={'text'}
                    name={'letterTopic'}
                    placeholder={'Придумайте Тему письма'}
                    onChange={changeLetterTopicMiddleware}
                    maxLength={80}
                />

                <AppInput
                    id={'bodyData'}
                    label={'Текст шаблона:'}
                    type={'textarea'}
                    name={'bodyData'}
                    placeholder={'Текст шаблона'}
                    onChange={changeBodyDataMiddleware}
                />
                <div className={styles.transfer__create_btn}>
                    <button type="submit" className={styles.transfer__create_btn_link}>Создать</button>
                </div>

            </form>
    );
};

export default CreateEmailTemplatePage;
import React, {useState} from 'react';
import {useUserStore} from "../../../store/userStore/useUserStore";
import {useNavigate} from "react-router-dom";
import styles from "../../transferspage/TransferPage.module.scss";
import AppInput from "../../../components/Input/AppInput";
import {useTemplateStore} from "../../../store/templateStore/useTemplateStore";
import {TelegramTemplate} from "../../../models/Template/TelegramTemplate";
import {useProjectStore} from "../../../store/projectStore/useProjectStore";
import AppTextArea from "../../../components/UI/AppTextArea/AppTextArea";
import {unsuccessful} from "../../../components/UI/Toast/Toast";

const CreateTelegramTemplatePage = () => {
    const [templateName, setTemplateName] = useState('');
    const [templateBody, setTemplateBody] = useState('');
    const sendTemplate = useTemplateStore(state => state.sendTemplate);
    const addTemplate = useTemplateStore(state => state.addTemplate);
    const userId = useUserStore(state => state.user?.id) || '';
    const projectId = useProjectStore(state => state.currentProject?.id) || '';
    const navigate = useNavigate();

    const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newTelegramTransport = new TelegramTemplate(
            templateBody,
            templateName,
            projectId,
            userId
        );
        try {
            sendTemplate(newTelegramTransport).then((response) => addTemplate(response))
        }
        catch (error) {
            unsuccessful((error as Error).message)
        }
        finally {
            navigate('/templates')
        }
    }


    //middleware
    const changeTemplatetName = (e: React.FormEvent<HTMLInputElement>) => {
        setTemplateName(e.currentTarget.value);
    }

    const changeTemplateBody = (e: React.FormEvent<HTMLTextAreaElement>) => {
        setTemplateBody(e.currentTarget.value);
    }


    return (
        <div>
            <form onSubmit={formSubmit} className={styles.transfer__create}>
                <AppInput
                    id={'templateName'}
                    label={'Наименование шаблона:'}
                    type={'text'}
                    name={'templateName'}
                    placeholder={'Введите наименование шаблона'}
                    onChange={changeTemplatetName}
                    maxLength={40}
                />
                <AppTextArea
                    id={'templateBody'}
                    label={'Текст шаблона'}
                    name={'templateBody'}
                    placeholder={'Введите текст шаблона'}
                    onChange={changeTemplateBody}
                    className={styles.createTransfer__textInput}
                />
                <div className={styles.transfer__create_btn}>
                    <button type="submit" className={styles.transfer__create_btn_link}>Создать</button>
                </div>
            </form>
        </div>
    );
};

export default CreateTelegramTemplatePage;
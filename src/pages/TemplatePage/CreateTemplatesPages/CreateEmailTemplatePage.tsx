import React, {useState} from 'react';
import {useUserStore} from "../../../store/userStore/useUserStore";
import {useNavigate} from "react-router-dom";
import styles from "../../TransportPage/TransportPage.module.scss";
import AppInput from "../../../components/Input/AppInput";
import {useTemplateStore} from "../../../store/templateStore/useTemplateStore";
import EmailTemplate from "../../../models/Template/EmailTemplate";
import {ITemplate} from "../../../models/Template/ITemplate";
import {useProjectStore} from "../../../store/projectStore/useProjectStore";
import AppTextArea from "../../../components/UI/AppTextArea/AppTextArea";
import {successful, unsuccessful} from "../../../components/UI/Toast/Toast";
import AppButton from "../../../components/UI/AppButton/AppButton";
import AppRadio from "../../../components/UI/AppRadio/AppRadio";
import {ReturnsProp} from "../../../models/ServiceInterfaces/ReturnsProp";

const CreateEmailTemplatePage = (props: ReturnsProp) => {

    const [templateName, setTemplateName] = useState('');
    const [letterTopic, setLetterTopic] = useState('');
    const [bodyData, setBodyData] = useState('');
    const [emailTextType, setEmailTextType] = useState<"html" | "text">("text");


    const sendTemplate = useTemplateStore(state => state.createTemplate);
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

    const changeBodyDataMiddleware = (e: React.FormEvent<HTMLTextAreaElement>) => {
        setBodyData(e.currentTarget.value);
    }


    const wrapText = (inputText: string) => {
        switch (emailTextType) {
            case "html":
                return inputText;
            case "text":
                return "<p>" + inputText.replace(/(?:\r\n|\r|\n)/g, '<br>') + "</p>";
        }
    }


    const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newEmailTemplate: EmailTemplate = new EmailTemplate(
            templateName,
            letterTopic,
            wrapText(bodyData),
            projectId,
            userId
        );
        try {
            sendTemplate(newEmailTemplate).then((response: ITemplate) => addTemplate(response)).then(() => successful('Шаблон успешно создан'));
        } catch (e) {
            unsuccessful((e as Error).message)
        } finally {
            !!props.backAction ? props.backAction() : navigate('/templates');
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

            <AppRadio id={"templateTextType"} parameter={emailTextType} setParameter={setEmailTextType} data={
                [{
                    label: "text",
                    value: "text"
                },
                    {
                        label: "html",
                        value: "html"
                    }]
            }/>

            {/*<AppInput id={"templateTextType"} type={"radio"} name={"templateTextType"} label={"text"} value={"text"}*/}
            {/*          onChange={(e) => setEmailTextType("text")}/>*/}
            {/*<AppInput id={"templateTextType"} type={"radio"} name={"templateTextType"} label={"html"} value={"html"}*/}
            {/*          onChange={(e) => setEmailTextType("html")}/>*/}

            <AppTextArea
                id={'bodyData'}
                label={'Текст шаблона:'}
                name={'bodyData'}
                placeholder={'Текст шаблона'}
                onChange={changeBodyDataMiddleware}
                className={styles.createTransfer__textInput}
            />
            <div className={styles.transfer__create_btn}>
                <AppButton type={'submit'} value={'Создать'}/>
            </div>

        </form>
    );
};

export default CreateEmailTemplatePage;
import React, {useEffect, useState} from 'react';
import {TelegramTemplate} from "../../models/Template/TelegramTemplate";
import EmailTemplate from "../../models/Template/EmailTemplate";
import TelegramTransport from "../../models/Transport/TelegramTransport";
import EmailTransport from "../../models/Transport/IEmailTransport";
import {useTemplateStore} from "../../store/templateStore/useTemplateStore";
import {useTransportStore} from "../../store/transportStore/useTransportStore";
import {ICreateEventStep} from "./ICreateEventStep";
import CreateEventMasterStepper from "./CreateEventMasterStepper";
import AppButton from "../../components/UI/AppButton/AppButton";
import TemplateChoicePage from "./ChoicePages/TemplateChoicePage/TemplateChoicePage";
import styles from "./CreateEventMasterPage.module.scss";
import {ITemplate} from "../../models/Template/ITemplate";
import {ITransport} from "../../models/Transport/ITransport";
import TemplateViewPage from "../TemplatePage/TemplateViewPage/TemplateViewPage";
import AppModal from "../../components/UI/AppModal/AppModal";
import TransportViewPage from "../TransportPage/TransportViewPage/TransportViewPage";
import TransportChoicePage from "./ChoicePages/TransportChoicePage/TransportChoicePage";
import CreateSynoraEventPage from "../eventpage/CreateSynoraEventPage/CreateSynoraEventPage";
import CreateTemplatePage from "../TemplatePage/CreateTemplatesPages/CreateTemplatePage";
import CreateTransportPage from "../TransportPage/CreateTransportPages/CreateTransportPage";

const CreateEventMasterPage = () => {

    const [chosenTelegramTemplate, setChosenTelegramTemplate] = useState<TelegramTemplate | undefined>(undefined);
    const [chosenEmailTemplate, setChosenEmailTemplate] = useState<EmailTemplate | undefined>(undefined);
    const [chosenTelegramTransport, setChosenTelegramTransport] = useState<TelegramTransport | undefined>(undefined);
    const [chosenEmailTransport, setChosenEmailTransport] = useState<EmailTransport | undefined>(undefined);
    const [newEventName, setNewEventName] = useState<string>('');

    const [viewItemIsVisible, setViewItemIsVisible] = useState(false);
    const [viewItem, setViewItem] = useState<ITemplate | ITransport | undefined>(undefined);
    const [viewItemNode, setViewItemNode] = useState(<></>);

    //Заголовки стэппера
    const [templateHeading, setTemplateHeading] = useState("Выбор шаблона");
    const [transportHeading, setTransportHeading] = useState("Выбор транспорта");

    useEffect(() => {
        checkTemplateHeading()
    }, [chosenEmailTemplate, chosenTelegramTemplate]);


    useEffect(() => {
        checkTransportHeading()
    }, [chosenEmailTransport, chosenTelegramTransport]);

    const templates = useTemplateStore.getState().templates;
    const transports = useTransportStore.getState().transports;
    const [activeStep, setActiveStep] = React.useState(0);
    const [possibleSecondStep, setPossibleSecondStep] = useState(false);
    const [possibleThirdStep, setPossibleThirdStep] = useState(false);
    const [validEmailPair, setValidEmailPair] = useState(false);
    const [validTelegramPair, setValidTelegramPair] = useState(false);
    const [createTemplateView, setCreateTemplateView] = useState(false);
    const [createTransportView, setCreateTransportView] = useState(false);


    const createTemplateBack = () => {
        setCreateTemplateView(false);
    }

    const createTransportBack = () => {
        setCreateTransportView(false);
    }


    useEffect(() => {
        setValidEmailPair((!!chosenEmailTemplate && !!chosenEmailTransport) || (!chosenEmailTemplate && !chosenEmailTransport))
    }, [chosenEmailTemplate, chosenEmailTransport]);

    useEffect(() => {
        setValidTelegramPair((!!chosenTelegramTemplate && !!chosenTelegramTransport) || (!chosenTelegramTemplate && !chosenTelegramTransport))
    }, [chosenTelegramTemplate, chosenTelegramTransport]);


    useEffect(() => {
        !chosenTelegramTemplate && setChosenTelegramTransport(undefined);
        !chosenEmailTemplate && setChosenEmailTransport(undefined);
        setPossibleSecondStep(!!chosenTelegramTemplate || !!chosenEmailTemplate);
    }, [chosenEmailTemplate, chosenTelegramTemplate]);

    useEffect(() => {
        setPossibleThirdStep(validEmailPair && validTelegramPair)
    }, [validEmailPair, validTelegramPair]);


    const checkTemplateHeading = () => {
        if (!!chosenEmailTemplate && !!chosenTelegramTemplate) {
            return setTemplateHeading(`${chosenEmailTemplate.template_name} / ${chosenTelegramTemplate.template_name}`);
        } else if (!!chosenEmailTemplate) {
            return setTemplateHeading(`${chosenEmailTemplate.template_name}`);
        } else if (!!chosenTelegramTemplate) {
            return setTemplateHeading(`${chosenTelegramTemplate.template_name}`);
        } else return setTemplateHeading("Выбор шаблона");
    }

    const checkTransportHeading = () => {
        if (!!chosenEmailTransport && !!chosenTelegramTransport) {
            return setTransportHeading(`${chosenEmailTransport.transport_name} / ${chosenTelegramTransport.transport_name}`);
        } else if (!!chosenEmailTransport) {
            return setTransportHeading(`${chosenEmailTransport.transport_name}`);
        } else if (!!chosenTelegramTransport) {
            return setTransportHeading(`${chosenTelegramTransport.transport_name}`);
        } else return setTransportHeading("Выбор транспорта");
    }

    const isTransport = (object: any): object is ITransport => {
        return (object as ITransport).transport_name !== undefined;
    }

    const isTemplate = (object: any): object is ITemplate => {
        return (object as ITemplate).template_name !== undefined;
    }

    useEffect(() => {
        if (viewItem !== undefined) {
            if (isTransport(viewItem)) {
                setViewItemNode(<TransportViewPage viewItem={viewItem}/>)
            } else if (isTemplate(viewItem)) {
                setViewItemNode(<TemplateViewPage viewItem={viewItem}/>)
            }
        } else setViewItemNode(<></>);
    }, [viewItem]);


    const handleNext = () => {
        activeStep !== steps.length - 1 &&
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        activeStep !== 0 &&
        setActiveStep(activeStep - 1);
    };

    const steps: ICreateEventStep[] = [
        {
            label: templateHeading,
            body: <TemplateChoicePage
                chosenTelegramTemplate={chosenTelegramTemplate}
                setChosenTelegramTemplate={setChosenTelegramTemplate}
                chosenEmailTemplate={chosenEmailTemplate}
                setChosenEmailTemplate={setChosenEmailTemplate}
                setViewItem={setViewItem}
                setViewItemIsVisible={setViewItemIsVisible}
                createTemplate={setCreateTemplateView}
            />
        },
        {
            label: transportHeading,
            body: <TransportChoicePage
                chosenTelegramTransport={chosenTelegramTransport}
                setChosenTelegramTransport={setChosenTelegramTransport}
                chosenEmailTransport={chosenEmailTransport}
                setChosenEmailTransport={setChosenEmailTransport}
                setViewItem={setViewItem}
                setViewItemIsVisible={setViewItemIsVisible}
                chosenEmailTemplate={!!chosenEmailTemplate}
                chosenTelegramTemplate={!!chosenTelegramTemplate}
                createTransport={setCreateTransportView}
            />
        },
        {
            label: "Создать",
            body: <CreateSynoraEventPage
                synoraEventName={newEventName}
                setSynoraEventName={setNewEventName}
                chosenTelegramTemplate={chosenTelegramTemplate}
                chosenEmailTemplate={chosenEmailTemplate}
                chosenEmailTransport={chosenEmailTransport}
                chosenTelegramTransport={chosenTelegramTransport}
                stepBack={handleBack}
            />
        }
    ]

    return (
        <div className={styles.createEventMasterPage}>
            <>
                {createTemplateView && <CreateTemplatePage backAction={createTemplateBack}/>}
                {createTransportView && <CreateTransportPage backAction={createTransportBack}/>}
                {!createTemplateView && !createTransportView && (
                <>
                    <div className={styles.createEventMasterPage__stepperBlock}>
                        <CreateEventMasterStepper activeStep={activeStep} steps={steps}/>
                    </div>
                    <div className={styles.content}>
                        {steps[activeStep].body || <></>}
                    </div>
                    <div className={styles.navigationButtonBlock}>
                        {
                            activeStep === 0 && (<>
                                <AppButton disabled={!possibleSecondStep} onClick={() => handleNext()} type={"button"}
                                           value={"Далее"}/>
                            </>)}
                        {activeStep === 1 && <>
                            <AppButton appStyle={"white"} onClick={() => handleBack()} type={"button"} value={"Назад"}/>
                            <AppButton disabled={!possibleThirdStep} onClick={() => handleNext()} type={"button"}
                                       value={"Далее"}/>
                        </>
                        }

                    </div>
                </>)}
            </>
            <AppModal visible={viewItemIsVisible} setVisible={setViewItemIsVisible}>
                {viewItemNode}
            </AppModal>
        </div>
    );
};

export default CreateEventMasterPage;
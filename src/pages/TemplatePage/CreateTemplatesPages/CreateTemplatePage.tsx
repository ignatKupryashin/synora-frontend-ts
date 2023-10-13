import React, {FC, useState} from 'react';
import {Link} from "react-router-dom";
import styles from "../../TransportPage/TransportPage.module.scss";
import CreateTelegramTemplatePage from "./CreateTelegramTemplatePage";
import CreateEmailTemplatePage from "./CreateEmailTemplatePage";

const CreateTemplatePage:FC = () => {

    const [template, setTemplate] = useState('');

    const templateChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
        setTemplate(e.currentTarget.value);
    }


    return (
        <div>
            <Link to='/templates' className={styles.transfer_back}>Назад</Link>
            <h1 className={styles.transfer__title}>Создать шаблон</h1>
            <div className={styles.transfer__form_radio}>
                <div className={styles.transfer__form_radio_btn}>
                    <label htmlFor="email" className={styles.transfer__form_radio_label}>
                        <input
                            type="radio"
                            id="email"
                            name="transfer"
                            value="email"
                            checked={template === "email"}
                            onChange={templateChangeHandler}
                            className={styles.transfer__form_radio_input}
                        />
                        E-mail
                    </label>
                </div>
                <div className={styles.transfer__form_radio_btn}>
                    <label htmlFor="telegram" className={styles.transfer__form_radio_label}>
                        <input
                            type="radio"
                            id="telegram"
                            name="transfer"
                            value="telegram"
                            checked={template === "telegram"}
                            onChange={templateChangeHandler}
                            className={styles.transfer__form_radio_input}
                        />
                        Telegram
                    </label>
                </div>
            </div>
            {template === 'email' && (
                <CreateEmailTemplatePage/>)
            }
            {template === 'telegram' && (
                <CreateTelegramTemplatePage/>
            )
            }
        </div>
    );
};

export default CreateTemplatePage;
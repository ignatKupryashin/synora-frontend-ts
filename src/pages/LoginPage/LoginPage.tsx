import styles from "./LoginPage.module.scss";
import LoginForm from "../../components/LoginForm/LoginForm";
import logo from '@/assets/svg/logo_grey.svg'
import TranslucentWrapper from "../../components/UI/TranslucentWrapper/TranslucentWrapper";

const LoginPage = () => {
    return (
        <div className={styles.loginPage}>
            <TranslucentWrapper>
                <img src={logo} alt="logo" className={styles.loginPage__image}/>
                 <LoginForm/>
            </TranslucentWrapper>
        </div>
    );
};

export default LoginPage;
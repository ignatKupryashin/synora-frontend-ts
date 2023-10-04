import {toast, ToastOptions} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const TOAST_PARAMS: ToastOptions = {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'light',
};

export const unsuccessful = (text: string) => toast.error(text, TOAST_PARAMS);
export const successful = (text: string) => toast.success(text, TOAST_PARAMS);
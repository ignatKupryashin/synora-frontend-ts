import {useState} from 'react';

export const useModal = () => {
    const [visible, setVisible] = useState<boolean>(false);
    const toggle = () => setVisible(!visible);
    return {
        visible,
        toggle,
    };
};
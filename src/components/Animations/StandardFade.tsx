import {ReactNode} from 'react';
import {animated, useSpring} from "@react-spring/web";

interface StandardFadeProps {
    children: ReactNode;
}

const StandardFade  = (props: StandardFadeProps) => {

    const [springs, api] = useSpring(() => ({
        from: {opacity: 0, y: -5},
        to: {opacity: 1, y: 0}
    }))

    return (
        <animated.div style={{...springs}} onLoad={() =>
            api.start({
                from: {opacity: 0, y: -50},
                to: {opacity: 1, y: 0}
            })}>
            {props.children}
        </animated.div>
    );
};

export default StandardFade;
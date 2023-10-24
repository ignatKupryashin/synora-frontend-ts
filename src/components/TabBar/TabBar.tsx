import React, {FC, ReactNode, useEffect, useState} from 'react';
import {TabBarItem} from "./TabBarItem";
import styles from "./TapBar.module.scss";

interface TabBarProps {
    barArray: TabBarItem[];
}


const TabBar: FC<TabBarProps> = (props) => {


    const [showedContent, setShowedContent] = useState<ReactNode>(<></>);
    let [currentBar, setCurrentBar] = useState<TabBarItem | undefined>();
    const [isFirstBar, setIsFirstBar] = useState(true)

    useEffect(() => {
        setCurrentBar((props.barArray.length > 0) ? props.barArray[0] : undefined);
    }, [props.barArray]);

    useEffect(() => {
    if (currentBar) {
        setShowedContent(currentBar.content)
        setIsFirstBar(props.barArray[0].title === currentBar.title);
    }
     else {
        setShowedContent(<></>)
    }

    }, [currentBar]);

    return (
        <div className={styles.tabBar}>
            <div className={styles.tabBar__labelBox}>
                {props.barArray.map((item) => (
                        <div className={`${styles.tabBar__label} ${item.title === currentBar?.title ? styles.tabBar__label_active : styles.tabBar__label_disabled}`}
                             onClick={() => setCurrentBar(item)} key={item.title}>
                            {item.title}
                        </div>
                    )
                )
                }
            </div>
            <div className={`${styles.tabBar__contendBox} ${isFirstBar ? styles.tabBar__firstTab : styles.tabBar__secondTab}`}>
                {showedContent}
            </div>

        </div>


    );
};

export default TabBar;
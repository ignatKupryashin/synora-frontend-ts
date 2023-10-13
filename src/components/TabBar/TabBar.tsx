import React, {FC, ReactNode, useState} from 'react';
import {BarItem} from "./BarItem";

interface TabBarProps {
    barArray: BarItem[];

}


const TabBar: FC<TabBarProps> = (props) => {



    const [showedContent, setShowedContent] = useState<ReactNode>();
    const currentBar = props.barArray.length > 0 ? props.barArray[0] : null;

    return (
        <div className="tab-bar">
            <div className="tab-labels">

            </div>
            <div className="tabs-content">

            </div>

        </div>


    );
};

export default TabBar;
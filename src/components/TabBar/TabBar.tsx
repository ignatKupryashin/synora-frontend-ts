import React, {FC} from 'react';

interface TabBoxProps {
    heading: string;
    children: React.ReactNode;
}


const TabBar: FC<TabBoxProps> = (props) => {
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
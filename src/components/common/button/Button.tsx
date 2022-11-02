import React from "react";

interface Props {
    move: any;
    onClick: () => void;
    text?: React.ReactNode;
}
 
const Buttons: React.FC<Props> = ({ move, onClick, text}) => {

    return (
        <>
            <button onClick={onClick}
                type='button'
                style={{ float: move}}
                className="admin-button"
            >
            {text}
            </button>
        </>
    )
}

export default Buttons;
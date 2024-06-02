'use client'
import React, {useState} from 'react';
import ChangePasswordModal from "@/components/User/ChangePasswordModal/ChangePasswordModal";
import classes from "./ChangePasswordButton.module.scss";

const ChangePasswordButton = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    return (
        <>
            <button className={classes.button}
                    onClick={() => setModalIsOpen(true)}>
                    <span className="material-icons">
                        manage_accounts
                    </span>
                Change password
            </button>
            {modalIsOpen && <ChangePasswordModal closeModal={() => setModalIsOpen(false)}/>}
        </>
    );
};

export default ChangePasswordButton;
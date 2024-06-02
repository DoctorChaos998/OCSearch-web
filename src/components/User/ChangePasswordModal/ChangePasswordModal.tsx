'use client'
import React, {useState} from 'react';
import classes from "./ChangePasswordModal.module.scss";
import ModalWindow from "@/ui/modals/ModalWindow/ModalWindow";
import ChangePasswordInput from "@/ui/inputs/ChangePasswordInput/ChangePasswordInput";
import UserService from "@/http/userService";
import {IApiError} from "@/types/api";

interface IChangePasswordModal{
    closeModal: () => void
}
const ChangePasswordModal = ({closeModal}: IChangePasswordModal) => {
    const [currentPasswordValue, setCurrentPasswordValue] = useState('');
    const [newPasswordValue, setNewPasswordValue] = useState('');
    const [repeatNewPasswordValue, setRepeatNewPasswordValue] = useState('');
    const [currentPasswordError, setCurrentPasswordError] = useState('');
    const [newPasswordError, setNewPasswordError] = useState('');
    const [repeatNewPasswordError, setRepeatNewPasswordError] = useState('');

    const submitFormHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(currentPasswordValue === newPasswordValue){
            setNewPasswordError('Old and new passwords are the same');
            return;
        }
        setNewPasswordError('');
        const reg = RegExp(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[,/|@#$_&\-+()\[\]{}*"'`~=:;!?])[0-9a-zA-Z.,/|@#$_&\-+()\[\]{}*"'`~=:;!?]{8,32}/);
        if(newPasswordValue.match(reg) === null){
            setNewPasswordError('Invalid new password format');
            return;
        }
        setCurrentPasswordError('');
        if(repeatNewPasswordValue !== newPasswordValue){
            setRepeatNewPasswordError('Password not match')
            return;
        }
        UserService.changePassword(currentPasswordValue, newPasswordValue).then(() => {
            closeModal();
        }).catch((reason: IApiError) => {
            setCurrentPasswordError(reason.error);
            setCurrentPasswordValue('');
        });
    }
    return (
        <ModalWindow onModalWindowClickHandler={closeModal}>
            <div className={classes.changePasswordModalContainer} onClick={(event) => event.stopPropagation()}>
                <form onSubmit={submitFormHandler} className={classes.changePasswordModalForm}>
                    <h2>Change password</h2>
                    <p className={classes.changePasswordModalFormText}>Security system powered by Dmitry Latyshenok and BlowFish func in postgres.</p>
                    <ChangePasswordInput value={currentPasswordValue} onChange={(event) => setCurrentPasswordValue(event.target.value)} placeholder={'Current password'} passwordInputError={currentPasswordError}/>
                    <ChangePasswordInput value={newPasswordValue} onChange={(event) => setNewPasswordValue(event.target.value)} placeholder={'New password'}  passwordInputError={newPasswordError}/>
                    <ChangePasswordInput value={repeatNewPasswordValue} onChange={(event) => setRepeatNewPasswordValue(event.target.value)} placeholder={'Repeat new password'}  passwordInputError={repeatNewPasswordError} onPaste={(event) => event.preventDefault()}/>
                    <button type='submit' disabled={!(currentPasswordValue&&newPasswordValue&&repeatNewPasswordValue)} className={currentPasswordValue&&newPasswordValue&&repeatNewPasswordValue?classes.changePasswordModalFormButtonActive:classes.changePasswordModalFormButtonInactive}>Change password</button>
                </form>
            </div>
        </ModalWindow>
    );
};

export default ChangePasswordModal;
import React, {FC, useState} from 'react';

const ChangePasswordForm:FC = () => {
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    return (
        <div>
            <form>
                <input type={"password"} onChange={(event) => setCurrentPassword(event.target.value)} value={currentPassword}/>
                <input type={"password"} onChange={(event) => setNewPassword(event.target.value)} value={newPassword}/>
                <button>Поменять пароль</button>
            </form>
        </div>
    );
};

export default ChangePasswordForm;
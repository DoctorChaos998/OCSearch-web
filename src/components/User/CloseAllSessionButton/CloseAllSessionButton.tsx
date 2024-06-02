import React, {useState} from 'react';
import classes from "./CloseAllSessionButton.module.scss"
import {useAppDispatch} from "@/lib/hooks";
import {closeAllSessions} from "@/lib/features/userSlice/userActions";

const CloseAllSessionButton = () => {
    const dispatch = useAppDispatch();
    const [confirmState, setConfirmState] = useState(false);
    return (
        !confirmState?
            <button className={classes.closeAllSessionButton} onClick={() => setConfirmState(true)}>
                Close all sessions
            </button>:
            <div className={classes.confirmButtonsContainer}>
                <button onClick={() => setConfirmState(false)} className={classes.canselButton}>
                                <span className="material-icons">
                                    cancel
                                </span>
                    Cancel</button>
                <button onClick={() => dispatch(closeAllSessions())} className={classes.confirmButton}>
                                <span className="material-icons">
                                    done
                                </span>
                    Confirm
                </button>
            </div>
    );
};

export default CloseAllSessionButton;
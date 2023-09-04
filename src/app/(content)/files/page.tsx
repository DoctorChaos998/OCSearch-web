'use client'
import classes from "./files.module.css";
import FileSelectArea from "@/components/FileSelectArea/FileSelectArea";
import FileCatalog from "@/components/FileCatalog/FileCatalog";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {notificationSlice} from "@/components/Notification/store/NotificationSlice";

const Files = () => {
    const dispatch = useAppDispatch()
    const {notifications} = useAppSelector(state => state.notificationReducer)
    return (
        <div className={classes.contentOnProfilePage}>
            {/*<FileSelectArea></FileSelectArea>*/}
            {/*<FileCatalog></FileCatalog>*/}
            <button onClick={() => {
                dispatch(notificationSlice.actions.createNotificationWithTimer("что то fgjdfgjfdgjfgjfgggggggggggggggggggggggg"))
            }} style={{marginTop: 300}}>sdgdsgsg</button>
            <button onClick={() => {
                dispatch(notificationSlice.actions.triggerNotification(0))
            }}>triger</button>
            <button onClick={() => console.log(10,notifications)}>log</button>
            <button onClick={() => {
                dispatch(notificationSlice.actions.createNotification("что то fgjdfgjfdgjfgjfgggggggggggggggggggggggg"))
            }} style={{marginTop: 300}}>withoutTimer</button>
        </div>
    );
};

export default Files;
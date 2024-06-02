import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import type {INotificationPayload, INotification} from "@/types/notifications";
import {getId} from "@/helpers/notificationsHelper";


interface INotificationState {
    notifications: INotification[];
}
const initialState: INotificationState = {
    notifications: [],
}
const notificationSlice = createSlice({
    name: "notificationSlice",
    initialState,
    reducers: {
        createNotificationWithTimer(state, action: PayloadAction<INotificationPayload>) {
            state.notifications.push({id: getId(), isVisible: true, withTimer:true,
                notificationMessage: action.payload.notificationMessage, notificationType: action.payload.notificationType});
        },
        createNotification(state, action: PayloadAction<INotificationPayload>) {
            state.notifications.push({id: getId(), isVisible: true, withTimer:false,
                notificationMessage: action.payload.notificationMessage, notificationType: action.payload.notificationType});
        },
        deleteNotification(state, action: PayloadAction<number>){
            state.notifications = state.notifications.filter((notification) => notification.id !== action.payload)
        },
    }
})
export const {actions: notificationActions, reducer: notificationReducer } = notificationSlice
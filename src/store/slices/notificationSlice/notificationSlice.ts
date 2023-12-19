import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {notificationPayload, type notificationType} from "@/entities/notification";


let currentNotificationId = 0;
const getId = () => currentNotificationId++;

interface INotification{
    id: number;
    isVisible: boolean;
    notificationMessage: string;
    notificationType: notificationType;
    withTimer: boolean;
}
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
        createNotificationWithTimer(state, action: PayloadAction<notificationPayload>) {
            state.notifications.push({id: getId(), isVisible: true, withTimer:true,
                notificationMessage: action.payload.notificationMessage, notificationType: action.payload.notificationType});
        },
        createNotification(state, action: PayloadAction<notificationPayload>) {
            state.notifications.push({id: getId(), isVisible: true, withTimer:false,
                notificationMessage: action.payload.notificationMessage, notificationType: action.payload.notificationType});
        },
        deleteNotification(state, action: PayloadAction<number>){
            state.notifications = state.notifications.filter((notification) => notification.id !== action.payload)
        },
        triggerNotification(state, action: PayloadAction<number>){
            state.notifications = state.notifications.map((notification) => {
                if(notification.id !== action.payload) return notification
                return {...notification, isVisible: true}
            })
        }
    }
})
export const {actions: notificationActions, reducer: notificationReducer } = notificationSlice
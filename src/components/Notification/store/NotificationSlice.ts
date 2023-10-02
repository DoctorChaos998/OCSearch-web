import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface INotification{
    id: number;
    isVisible: boolean;
    notificationText: string;
    withTimer: boolean;
}
interface INotificationState {
    notifications: INotification[];
    currentNotificationId: number;
}
const initialState: INotificationState = {
    notifications: [],
    currentNotificationId: 0
}
export const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        createNotificationWithTimer(state, action: PayloadAction<string>) {
            state.notifications.push({id: state.currentNotificationId, isVisible: true, withTimer:true, notificationText: action.payload});
            state.currentNotificationId++;
        },
        createNotification(state, action: PayloadAction<string>) {
            state.notifications.push({id: state.currentNotificationId, isVisible: true, withTimer:false, notificationText: action.payload});
            state.currentNotificationId++;
        },
        deleteNotification(state, action: PayloadAction<number>){
            state.notifications = state.notifications.filter((notification) => notification.id !== action.payload)
            state.currentNotificationId--;
        },
        triggerNotification(state, action: PayloadAction<number>){
            state.notifications = state.notifications.map((notification) => {
                if(notification.id !== action.payload) return notification
                return {...notification, isVisible: true}
            })
        }
    }
})
export default notificationSlice.reducer
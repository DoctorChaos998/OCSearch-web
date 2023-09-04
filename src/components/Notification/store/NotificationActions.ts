import {AppDispatch} from "@/store";
import {notificationSlice} from "@/components/Notification/store/NotificationSlice";

// export const createNotifyWithTimer = (notificationText: string) => (dispatch: AppDispatch) => {
//     dispatch(notificationSlice.actions.createNotificationWithTimer(notificationText))
//     setTimeout(() => {
//         console.log(8)
//         dispatch(notificationSlice.actions.deleteNotification())
//     }, 5000)
// }
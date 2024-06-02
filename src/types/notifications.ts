export type notificationType = 'info'|'warning'|'error';
export interface INotificationPayload{
    notificationMessage: string,
    notificationType: notificationType
}

export interface INotification{
    id: number;
    isVisible: boolean;
    notificationMessage: string;
    notificationType: notificationType;
    withTimer: boolean;
}
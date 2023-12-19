export type notificationType = 'info'|'warning'|'error';
export interface notificationPayload{
    notificationMessage: string,
    notificationType: notificationType
}
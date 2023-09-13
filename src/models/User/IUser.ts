export interface IUser {
    id: string,
    object_type: string,
    name: string,
    object_code: string,
    created_date: Date;
    modified_date: Date,
    meta: any, //узнать весь список возможных полей
    data: any, // узнать весь список возможных полей
    "project_id": string,
    "account_id": string,
    "user_id": string,
    "object_item": string,
    }
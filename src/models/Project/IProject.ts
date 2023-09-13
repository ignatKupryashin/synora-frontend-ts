export interface IProject {
    "id": string,
    "object_type": string,
    "name": string,
    "object_code": string,
    "created_date": Date,
    "modified_date": Date,
    "meta"?: any //потом типизировать
    "data"?: any //потом типизировать
    "project_id"?: string,
    "account_id": string,
    "user_id": string,
    "object_item": string
}

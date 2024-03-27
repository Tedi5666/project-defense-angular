export interface User {
    "username": string,
    "email": string,
    "password": string,
    "imageUrl": string,
    "posts": string[],
    "sessionToken": string,
    "objectId": string | undefined
}
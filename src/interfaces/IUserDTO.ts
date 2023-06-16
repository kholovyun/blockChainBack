import IUser from "./IUser"

export default interface IUserDTO {
    username: IUser["username"]
    password: IUser["password"]
}
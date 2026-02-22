export type TRequestStatus = 'inProgress' | 'canceled' | 'active' | 'done'

export interface IRequest {
  userID: string
  fullName: string
  status: TRequestStatus
  sum: number
  telephone: string
  createdAt?: Date
  updatedAt?: Date
  __v?: number
  _id?: string
}

export interface IUser {
  id: string
  email: string
  activationLink: string
  isActivated: boolean
}

export interface IAuthData {
  user: IUser
  accessToken: string
  refreshToken: string
}

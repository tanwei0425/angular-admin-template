export interface UserInfo {
  name?: string,
}
export interface MenuData {
  id: string,
  title: string,
  path?: string,
  icon?: string,
  disabled?: boolean,
  children?: MenuData[]
}
export type MenuList = MenuData[] | []

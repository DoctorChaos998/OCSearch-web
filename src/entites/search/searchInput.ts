export interface ISearchDropdownValue {
    name: string,
    value: searchDropdownValues
}
export enum searchDropdownValues {
    NONE = 'Пусто',
    TELEPHONE = 'Телефон',
    EMAIL = 'Email'
}
export const searchDropdown = Object.values(searchDropdownValues)
export const searchOptions: ISearchDropdownValue[] = Object.keys(searchDropdownValues).map((value, index) => {
    return {name: value, value: searchDropdown[index]}
})
export interface ISearchField {
    id: number
    searchStringValue: string
    searchDropdownValue: searchDropdownValues
}
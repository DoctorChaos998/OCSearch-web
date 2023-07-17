export interface ISearchDropdown {
    isActive: boolean
    currentOption: string
}
export enum searchDropdownValues {
    NONE = 'Пусто',
    TELEPHONE = 'Телефон',
    EMAIL = 'Email'
}
interface ISearchDropDownOption {
    name: searchDropdownValues,
    value: string,
}
const searchDropdown = Object.values(searchDropdownValues)
export const searchOptions: ISearchDropDownOption[] = Object.keys(searchDropdownValues).map((value, index) => {
    return {name: searchDropdown[index], value:value }
})
export interface ISearchField {
    id: number
    searchStringValue: string
    searchDropdown: ISearchDropdown
}
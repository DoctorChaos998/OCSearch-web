import React, {FC} from "react";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {ISearchDropdownValue} from "@/entites/search/searchInput";
import SearchInput from "@/ui/inputs/SearchInput/SearchInput";
import {
    addSearchLine,
    changeSearchDropdown,
    changeSearchString
} from "@/components/SearchFieldsList/Store/Reducers/Search/SearchAction";
import SearchDropdown from "@/ui/dropdowns/SearchDropdown/SearchDropdown";


const SearchFieldsList: FC = () => {
    const dispatch = useAppDispatch()
    const {searchFields} = useAppSelector(state => state.searchReducer)
    return (
        <div>
            <div>
                {searchFields.map((searchField)=>
                    <li key={searchField.id} style={{listStyle: "none"}}>
                        <SearchInput value={searchField.searchStringValue} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {dispatch(changeSearchString({...searchField, searchStringValue: e.target.value}))}}></SearchInput>
                        <SearchDropdown onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {dispatch(changeSearchDropdown({...searchField, searchDropdownValue: e.target.value}))}} value={searchField.searchDropdownValue}></SearchDropdown>
                    </li>
                )}
            </div>
            {/*<AddSearchLine onClick={}></AddSearchLine>*/}
            <button onClick={() => dispatch(addSearchLine())}>Add</button>
            <button onClick={() => console.log(searchFields)}> fgjfgjfgj</button>
        </div>
    );
};

export {SearchFieldsList};
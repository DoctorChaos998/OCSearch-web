import React, {FC} from "react";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import SearchInput from "@/ui/inputs/SearchInput/SearchInput";
import {
    addSearchLine,
    changeSearchDropdown,
    changeSearchString
} from "@/components/SearchFieldsList/Store/Reducers/Search/SearchAction";
import SearchDropdown from "@/ui/dropdowns/SearchDropdown/SearchDropdown";
import classes from "./SearchFieldsList.module.css";


const SearchFieldsList: FC = () => {
    const dispatch = useAppDispatch()
    const {searchFields} = useAppSelector(state => state.searchReducer)
    return (
        <div>
            <div>
                {searchFields.map((searchField)=>
                    <li key={searchField.id} style={{listStyle: "none"}}>
                        <div className={classes.searchFieldContainer}>
                            <SearchInput value={searchField.searchStringValue} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {dispatch(changeSearchString({...searchField, searchStringValue: e.target.value}))}}></SearchInput>
                            <SearchDropdown onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {dispatch(changeSearchDropdown({...searchField, searchDropdown: {...searchField.searchDropdown, currentOption: e.target.value}}))}} value={searchField.searchDropdown.currentOption} isActive={searchField.searchDropdown.isActive}></SearchDropdown>
                        </div>
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
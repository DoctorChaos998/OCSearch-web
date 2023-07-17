import React, {FC} from 'react';

interface ISearchInputProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    value: string
}
const SearchInput: FC<ISearchInputProps> = ({value, onChange}) => {
    return (
        <input value={value} onChange={onChange}/>
    );
};

export default SearchInput;
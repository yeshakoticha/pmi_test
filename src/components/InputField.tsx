import React from 'react';


interface PropTypes {
    filter:string;
    handleFilter:(value: string) => void;
}

const InputField:React.FC<PropTypes> = ({handleFilter, filter}) => {
    return (
        <>
            <input  type="text" value={filter} onChange={(e)=>handleFilter(e.target.value)}/>
        </>
    );
}

export default InputField;
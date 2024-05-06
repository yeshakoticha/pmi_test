import React, { useEffect, useReducer, FC } from "react";
import DisplayGrid from "../components/displayGrid";
import InputField from "../components/InputField";
import { Car } from "../model";


type StateType = {
    data: Car[];
    column: string;
    clear: boolean;
    filter: string;
}

type Action = 
| { type: 'ADD_DATA', payload: Car[]}
| { type: 'SET_FILTER', payload: string}
| { type: 'SET_COLUMN', payload: string}
| { type: 'CLEAR_FILTER' }

const initialState: StateType = {
    data: [],
    column: 'Color',
    clear:false,
    filter: ''
}

const carReducer = (state: StateType, action: Action): StateType => {
    switch(action.type){
        case "ADD_DATA":
            return {...state, data:action.payload, clear: false }
        case "SET_FILTER":
            return {...state, filter:action.payload }
        case "SET_COLUMN":
            return {...state, column:action.payload }
        case "CLEAR_FILTER":
            return {...state, column: 'Color', clear: true, filter:'' }
        default: 
            return state;
    }
}

const Cars: FC = () => {
    const [state, dispatch] = useReducer(carReducer, initialState); 
    
    const gridHeaders = [
        {colKey:'id', headerName: 'ID'},
        {colKey:'name', headerName: 'Name'},
        {colKey:'color', headerName: 'Color'},
    ];

    useEffect(() => {
        fetchAPI();
    },[state.clear]);

    const fetchAPI = async () : Promise<void> => {
        try{
            const apiResult = await fetch('https://mocki.io/v1/f230fea3-87c3-469d-ac2c-e1bfed24d74c');
            const response:Car[] = await apiResult.json();
            dispatch({type: 'ADD_DATA', payload:response});
        }catch(e: unknown){
            if(e instanceof Error){
                throw e.message;
            } 
        }
    }

    const filterRecords = (filterText: string): void => {
        if(filterText===''){
            handleClear()
        }

        let filterColumn = state.column.toLowerCase();
        dispatch({type: 'SET_FILTER', payload: filterText});
        let filteredData = state.data.filter((item: Car) => item[filterColumn]?.toLowerCase().includes(filterText.toLowerCase()));
        if(typeof filteredData==='object'){
            dispatch({type: 'ADD_DATA', payload:filteredData});
        }
    }

    const handleClear = () : void => {
        dispatch({type: 'CLEAR_FILTER'});
    }

    return (
        <>
            <select name="field" onChange={(e) => dispatch({type: 'SET_COLUMN', payload: e.target.value}) } value={state.column}>
                {gridHeaders.map((header) => <option value={header.headerName} key={header.colKey}>{header.headerName}</option>)}
            </select>

            <InputField handleFilter={filterRecords} filter={state.filter} />
            <button onClick={()=>handleClear()}>Clear</button>
            <DisplayGrid data={state.data} headers={gridHeaders}/>
        </>
        
    )
}

export default Cars;
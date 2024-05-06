import React from "react";
import { Car, ColumnHeaders } from "../model";


interface PropTypes{
    data: Car[];
    headers: ColumnHeaders[];
}

const DisplayGrid:React.FC<PropTypes> =  ({data, headers}) => {
    return (
        <>
            <table className="stylzed-table">
                <thead>
                    <tr>
                        {headers.map((header) => <th key={header.colKey}>{header.headerName}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => {
                        return (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.color}</td>
                        </tr>)
                    })}
                </tbody>
            </table>
        </>
    )
}

export default DisplayGrid;
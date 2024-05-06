interface KeyType {
    [key: string | number]: string | undefined 
  }

export interface Car extends KeyType {
    id: string,
    name:string,
    color:string
};

export interface ColumnHeaders {
    colKey: string, 
    headerName: string
}

import { DeleteOutline } from "@material-ui/icons";
import "./userList.css";
import { userRows } from "../../dummyData";

import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import { useState } from "react";


export default function UserList() {
    const[data,setData] = useState(userRows);
    const handleDelete = (id)=>{
        setData(data.filter((item)=>item.id!==id));
    }
    
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'user', headerName: 'User', width: 200, renderCell:(params)=>{
            return(
                <div className="userListUser">
                    <img className="userListImg" src={params.row.avatar} alt=""/>
                    {params.row.username}
                </div>
            )
        } },
        { field: 'email', headerName: 'Email', width: 200 },
        {
          field: 'status',
          headerName: 'Status',
          width: 120,
        },
        {
            field: 'transaction',
            headerName: 'Transaction Volume',
            width: 160,
          },
          {
            field:"action",
            headerName:"Action",
            width: 150,
            renderCell:(params)=>{
                return(
                    <>
                    <Link to={"/user/" + params.row.id}>
                    <button className="userListEdit">Edit</button>
                    </Link>
                    <DeleteOutline className="userListDelete" onClick={()=>handleDelete(params.row.id)}/>
                    </>

                )
            }
          }
       
      ];
 
  return (
    <div className="userList">
        <DataGrid
        rows={data}
        columns={columns}
        disableRowSelectionOnClick
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 6 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  )
}
import './productList.css';
import { DeleteOutline } from "@material-ui/icons";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProducts, getProducts } from '../../redux/apiCalls';

const ProdutList = () => {
   
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products);
    useEffect(()=>{
      getProducts(dispatch)
    },[dispatch]);

    const handleDelete = (id)=>{
        deleteProducts(id ,dispatch)
    };
    const columns: GridColDef[] = [
        { field: '_id', headerName: 'ID', width: 220 },
        { field: 'product', headerName: 'Product', width: 200, renderCell:(params)=>{
            return(
                <div className="productListItem">
                    <img className="productListImg" src={params.row.img} alt=""/>
                    {params.row.title}
                </div>
            )
        } },
        { field: 'inStock', headerName: 'Stock', width: 200 },
        {
          field: 'status',
          headerName: 'Status',
          width: 120,
        },
        {
            field: 'price',
            headerName: 'Price',
            width: 160,
          },
          {
            field:"action",
            headerName:"Action",
            width: 150,
            renderCell:(params)=>{
                return(
                    <>
                    <Link to={"/product/" + params.row._id}>
                    <button className="productListEdit">Edit</button>
                    </Link>
                    <DeleteOutline className="productListDelete" onClick={()=>handleDelete(params.row._id)}/>
                    </>

                )
            }
          }
       
      ];
  return (
    <div className='productList'>
        <DataGrid
        rows={products}
        columns={columns}
        getRowId={row=>row._id}
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

export default ProdutList
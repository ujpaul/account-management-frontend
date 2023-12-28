import {useState,useEffect} from 'react'
import { useFetchData } from "../hooks/useFetchData";
import DataTable  from "react-data-table-component";
import { columns } from "../utils/columns/userColumns";
import { customStyles } from "../utils/data/essential";

const Users = () => {
    const [users, setUsers] = useState([]);
    const url = `users`;
    const { isLoading, data } = useFetchData(["fetch-users"], url);
    useEffect(()=> {
        setUsers(data)
    },[data])
      
    if (isLoading) {
        return (
          <div
            className='d-flex justify-content-center'
            style={{ marginTop: "15%" }}
          >
            <h3>Loading users...</h3>
          </div>
        );
     }
  return (
      <div className='table-responsive datatables dataValidation-Wrap thead-primary pr-3 pl-3 mr-2'>
      <DataTable
        columns={columns}
        data={users}
        responsive={true}
        customStyles={customStyles}
        pagination
        highlightOnHover
        striped
        noHeader
      />
    </div>
  );
}

export default Users
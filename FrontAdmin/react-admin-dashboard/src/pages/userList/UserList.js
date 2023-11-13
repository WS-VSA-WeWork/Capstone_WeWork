import React from "react";
import "./UserList.css";
import { Link } from "react-router-dom";
import { userRows } from "../../dummyData";

import { DataGrid } from "@mui/x-data-grid";

const columns = [
    { field: "id", headerName: "회원 ID", width: 70  },
    { field: "name", headerName: "회원명", width: 90  },
    { field: "phoneNum", headerName: "연락처", width: 150  },
    { field: "reservation", headerName: "예약건수", type: 'number', width: 90  },
    { field: "action", headerName: "상세보기", width: 140, renderCell: (params) => {
        return (
            <>
                <Link to={'/users/' + params.row.id}>
                    <button className="userListDetail">상세보기</button>
                </Link>
            </>
        )
    }},
    { field: "pause", headerName: "이용정지", width: 140, renderCell: (params) => {
        return (
            <>
                <button className="userListPause">정지</button>
            </>
        )
    } }
];


export default function UserList() {
    // const [userType, setUserType] = useState("사용자");
    // const [data, setData] = useState(userRows);

    // const filterdRows = userRows.filter((user) => user.Type === userType);
    return (
        <div className="userList">
            {/* <div className="userListChangeUserType">
                <button onClick={() => setUserType("사용자")}>사용자</button>
                <button onClick={() => setUserType("사장님")}>사장님</button>
            </div>  */}
            <DataGrid
                rows={userRows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
            />
    </div>
    );
}
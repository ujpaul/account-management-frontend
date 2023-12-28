import { Link } from "react-router-dom";

export const columns = [
  {
    name: "Id",
    cell: (row) => row["userId"],
  },
  {
    name: "First name",
    cell: (row) => row["firstName"],
  },
  {
    name: "Last name",
    cell: (row) => row["lastName"],
  },
  {
    name: "Username",
    cell: (row) => row["userName"],
  },
  {
    name: "Email",
    cell: (row) => row["email"],
  },
  {
    name: "Date Of Birth",
    cell: (row) => row["dateOfBirth"],
  },
  {
    name: "Gender",
    cell: (row) => row["gender"],
  },
  {
    name: "Nationality",
    cell: (row) => row["nationality"],
  },
  {
    name: "Status",
    cell: (row) =>
      row["status"] === 0
        ? "Pending"
        : row["status"] === 1
        ? "Verified"
        : "Rejected",
  },
  {
    name: <div className='d-flex justify-content-end'>Action</div>,
    cell: (row) => (
      <div className='d-flex' style={{ gap: 20 }}>
        <Link to={`/loggedin/users/${row.userId}`}>
          <i
            className='fa fa-eye'
            aria-hidden='true'
            style={{
              cursor: "pointer",
              color: "#124db1",
              fontWeight: 700,
            }}
          />
        </Link>
      </div>
    ),
  },
];
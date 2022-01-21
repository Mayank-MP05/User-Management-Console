import React from 'react';
import '../styles/table-view.style.css';
import EditIcon from '../assets/user-edit-solid.svg';
import DeleteIcon from '../assets/user-delete-solid.svg';

const dataFromAPI = [
  {
    id: '1',
    name: 'Aaron Miles',
    email: 'aaron@mailinator.com',
    role: 'member',
  },
  {
    id: '2',
    name: 'Aishwarya Naik',
    email: 'aishwarya@mailinator.com',
    role: 'member',
  },
  {
    id: '3',
    name: 'Arvind Kumar',
    email: 'arvind@mailinator.com',
    role: 'admin',
  },
];

function TableView() {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">
            <input className="form-check-input" type="checkbox" value="" />
          </th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {dataFromAPI.map((dataRow) => (
          <tr key={dataRow.id}>
            <th scope="row">
              <input className="form-check-input" type="checkbox" value="" />
            </th>
            <td>{dataRow.name}</td>
            <td>{dataRow.email}</td>
            <td>{dataRow.role}</td>
            <td className="d-flex">
              <button
                type="button"
                className="btn btn-warning mx-1 icon-button"
              >
                <img src={EditIcon} />
                Edit
              </button>
              <button type="button" className="btn btn-danger mx-1 icon-button">
                <img src={DeleteIcon} />
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableView;

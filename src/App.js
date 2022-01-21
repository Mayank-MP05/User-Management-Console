import axios from 'axios';
import { useEffect, useState } from 'react/cjs/react.development';
import { Spinner } from 'reactstrap';
import ConfirmDelete from './components/confirm-delete';
import EditRecord from './components/edit-record';
import Navbar from './components/navbar';
import Pagination from './components/pagination';
import StatusBar from './components/status-bar';
import TableView from './components/table-view';

// Icon Images Imports
import EditIcon from './assets/user-edit-solid.svg';
import DeleteIcon from './assets/user-delete-solid.svg';

const pagesPerRow = 10;

function App() {
  const [usersListRaw, setusersListRaw] = useState([]);
  const [usersListRender, setusersListRender] = useState([]);
  const [searchQueryStr, setsearchQueryStr] = useState(``);
  const [tableLoader, settableLoader] = useState(false);
  const [maxRowsGenerated, setmaxRowsGenerated] = useState(0);
  const [activeRow, setactiveRow] = useState(0);

  /**
   * Call this useEffect first time Page loads - Fetches Data from API
   */
  useEffect(() => {
    settableLoader(true);
    axios
      .get(
        `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`
      )
      .then((res) => {
        setusersListRaw(res.data);
        setusersListRender(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        settableLoader(false);
      });
  }, []);

  /**
   * Filter out the data based on the Search Query Provided
   * @param {*} usersListRaw - raw user list array as coming from API
   * @returns - Array filtered out based on text search of query
   */
  const getFilteredResults = (usersListRaw) => {
    if (!usersListRaw) return usersListRaw;
    const searchQueryTrimmed = searchQueryStr.trim();
    const filteredData = usersListRaw.filter((record) => {
      return `${record.id}|||${record.name}|||${record.role}|||${record.email}`.includes(
        searchQueryTrimmed
      );
    });
    return filteredData;
  };

  /**
   * Return the sliced array segment of length `pagesPerRow`
   * @param {*} userListFiltered - Input the filtered out array
   * @param {*} activeRow - Row which to render to UI
   * @returns - Sliced array segment of length with Proper indexing
   */
  const buildPagination = (userListFiltered, activeRow) => {
    if (!userListFiltered) return userListFiltered;
    const maxRowsGenerated = Math.floor(userListFiltered.length / pagesPerRow);
    // setmaxRowsGenerated(maxRowsGenerated);
    const startIdx = activeRow * pagesPerRow;
    const endIdx = (activeRow + 1) * pagesPerRow;

    // startIdx to endIdx ranges like 0-10 , 10-20 (endIdx excluded)
    const paginated = userListFiltered.slice(startIdx, endIdx);
    return paginated;
  };

  return (
    <>
      <Navbar
        searchQueryStr={searchQueryStr}
        setsearchQueryStr={setsearchQueryStr}
      />
      <div className="container mt-3">
        <StatusBar />
        {/* <TableView renderData={usersListRender} /> */}
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
            {tableLoader ? (
              <tr>
                <th className="text-center m-4" colSpan="5">
                  <Spinner color="success" />
                </th>
              </tr>
            ) : (
              buildPagination(
                getFilteredResults(usersListRender),
                activeRow
              ).map((dataRow) => (
                <tr key={dataRow.id}>
                  <th scope="row">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                    />
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
                    <button
                      type="button"
                      className="btn btn-danger mx-1 icon-button"
                    >
                      <img src={DeleteIcon} />
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Pagination activeRowController={{ activeRow, setactiveRow }} />
      <ConfirmDelete isOpen={false} />
      <EditRecord isOpen={false} />
      <Spinner color="success" />
    </>
  );
}

export default App;

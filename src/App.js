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
  const [searchQueryStr, setsearchQueryStr] = useState(``);
  const [tableLoader, settableLoader] = useState(false);
  const [activeRow, setactiveRow] = useState(0);
  const [maxRows, setmaxRows] = useState(0);

  // Edit Functionality
  const [editUserModalFlag, seteditUserModalFlag] = useState(false);
  const [editUserObj, seteditUserObj] = useState({});

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

    const startIdx = activeRow * pagesPerRow;
    const endIdx = (activeRow + 1) * pagesPerRow;

    // startIdx to endIdx ranges like 0-10 , 10-20 (endIdx excluded)
    const paginated = userListFiltered.slice(startIdx, endIdx);
    return paginated;
  };

  /**
   * Simple Chaining Function takes raw data as input and return fully processed data
   * @param {*} usersListRaw - Raw Userlist from API
   * @param {*} activeRow - Pagination page index
   * @returns Filtered and then Paginated array
   */
  const filteredAndPaginated = (usersListRaw, activeRow) => {
    const filteredData = getFilteredResults(usersListRaw);
    const maxRowsGenerated = Math.ceil(filteredData.length / pagesPerRow);
    if (maxRows !== maxRowsGenerated) setmaxRows(maxRowsGenerated);

    const paginatedData = buildPagination(filteredData, activeRow);

    return paginatedData;
  };

  const updateUserCallback = (userId, { name, email, role }) => {
    let newUserList = [];
    console.log('updated: ', { userId, name, email, role });
    usersListRaw.forEach((userRecord) => {
      if (userRecord.id === userId) {
        console.log('match');
        newUserList.push({
          id: userId,
          name,
          email,
          role,
        });
      } else {
        newUserList.push(userRecord);
      }
    });
    console.log(newUserList);
    setusersListRaw([...newUserList]);
  };

  const editUserById = (userId) => {
    const searchedObj = usersListRaw.find(
      (userRecord) => userRecord.id === userId
    );
    seteditUserObj(searchedObj);
    seteditUserModalFlag(true);
  };

  return (
    <>
      <Navbar
        searchQueryStr={searchQueryStr}
        setsearchQueryStr={setsearchQueryStr}
      />
      <div className="container mt-3">
        <StatusBar />        <table className="table">
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
              filteredAndPaginated(usersListRaw, activeRow).map(
                (dataRow) => (
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
                        onClick={() => editUserById(dataRow.id)}
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
                )
              )
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        activeRowController={{ activeRow, setactiveRow }}
        maxRows={maxRows}
      />
      <ConfirmDelete isOpen={false} />
      <EditRecord
        isOpen={editUserModalFlag}
        closeDialog={() => seteditUserModalFlag(false)}
        editUserObj={editUserObj}
        updateUserCallback={updateUserCallback}
      />
      <Spinner color="success" />
    </>
  );
}

export default App;

import axios from 'axios';
import { useEffect, useState } from 'react/cjs/react.development';
import { Spinner } from 'reactstrap';
import ConfirmDelete from './components/confirm-delete';
import EditRecord from './components/edit-record';
import Navbar from './components/navbar';
import Pagination from './components/pagination';
import StatusBar from './components/status-bar';

// Icon Images Imports
import EditIcon from './assets/user-edit-solid.svg';
import DeleteIcon from './assets/user-delete-solid.svg';

// table view css
import './styles/table-view.style.css';

// Constants
const PAGES_PER_ROW = 10;
const API_URL = `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`;

function App() {
  const [usersListRaw, setusersListRaw] = useState([]);
  const [searchQueryStr, setsearchQueryStr] = useState(``);
  const [tableLoader, settableLoader] = useState(false);
  const [activeRow, setactiveRow] = useState(0);
  const [maxRows, setmaxRows] = useState(0);

  // Edit Functionality
  const [editUserModalFlag, seteditUserModalFlag] = useState(false);
  const [editUserObj, seteditUserObj] = useState({});

  // Delete Functionality
  const [deleteUserModalFlag, setdeleteUserModalFlag] = useState(false);
  const [deleteUserObj, setdeleteUserObj] = useState({});

  // Bulk Select
  const [bulkSelectFlag, setbulkSelectFlag] = useState(false);
  const [noOfRowsSelected, setnoOfRowsSelected] = useState(0);

  // Bulk Delete Ids list
  const [bulkDeleteIdList, setbulkDeleteIdList] = useState([]);

  /**
   * Call this useEffect first time Page loads - Fetches Data from API
   */
  useEffect(() => {
    settableLoader(true);
    axios
      .get(API_URL)
      .then((res) => {
        setusersListRaw(res.data.map((obj) => ({ ...obj, checked: false })));
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
   * Return the sliced array segment of length `PAGES_PER_ROW`
   * @param {*} userListFiltered - Input the filtered out array
   * @param {*} activeRow - Row which to render to UI
   * @returns - Sliced array segment of length with Proper indexing
   */
  const buildPagination = (userListFiltered, activeRow, bulkSelectFlag) => {
    if (!userListFiltered) return userListFiltered;

    const startIdx = activeRow * PAGES_PER_ROW;
    const endIdx = (activeRow + 1) * PAGES_PER_ROW;

    // startIdx to endIdx ranges like 0-10 , 10-20 (endIdx excluded)
    const paginated = userListFiltered.slice(startIdx, endIdx);
    const checkboxIncl = paginated.map((user) => ({
      ...user,
      checked: bulkSelectFlag || user.checked,
    }));

    let noOfRows = paginated.filter((user) => user.checked).length;
    if (noOfRowsSelected !== noOfRows) setnoOfRowsSelected(noOfRows);
    return checkboxIncl;
  };

  /**
   * Simple Chaining Function takes raw data as input and return fully processed data
   * @param {*} usersListRaw - Raw Userlist from API
   * @param {*} activeRow - Pagination page index
   * @returns Filtered and then Paginated array
   */
  const filteredAndPaginated = (usersListRaw, activeRow, bulkSelectFlag) => {
    const filteredData = getFilteredResults(usersListRaw);
    const maxRowsGenerated = Math.ceil(filteredData.length / PAGES_PER_ROW);
    if (maxRows !== maxRowsGenerated) setmaxRows(maxRowsGenerated);

    const paginatedData = buildPagination(
      filteredData,
      activeRow,
      bulkSelectFlag
    );

    return paginatedData;
  };

  /**
   * Callack to passs to child to udpate master data in parent
   * @param {*} userId
   * @param {*} param1 - Object { name, email, role }
   */
  const updateUserCallback = (userId, { name, email, role }) => {
    let newUserList = [];
    usersListRaw.forEach((userRecord) => {
      if (userRecord.id === userId) {
        newUserList.push({
          id: userId,
          name,
          email,
          role,
          checked: false,
        });
      } else {
        newUserList.push(userRecord);
      }
    });
    setusersListRaw([...newUserList]);
  };

  /**
   * Callback function to called when single or bulk delete operation is done
   * @param {*} userId - String or Array
   * @param {*} bulkDelete - Flag only true for deleting multiples users at once
   * @returns
   */
  const deleteUserCallback = (userId, bulkDelete = false) => {
    if (bulkDelete) {
      setbulkSelectFlag(false);
      if (userId.length !== 0) {
        let newUserList = usersListRaw.filter(
          (userRecord) => !userId.includes(userRecord.id)
        );
        setusersListRaw([...newUserList]);
        return;
      }
      let newUserList = usersListRaw.filter(
        (userRecord) => !userRecord.checked
      );
      setusersListRaw([...newUserList]);
      return;
    }
    let newUserList = usersListRaw.filter(
      (userRecord) => userRecord.id !== userId
    );
    setusersListRaw([...newUserList]);
  };

  /**
   * Button Click handler for Editing user record
   * @param {*} userId
   */
  const editUserById = (userId) => {
    const searchedObj = usersListRaw.find(
      (userRecord) => userRecord.id === userId
    );
    seteditUserObj(searchedObj);
    seteditUserModalFlag(true);
  };

  /**
   * Button Click handler for deleting single user record
   * @param {*} userId
   */
  const deleteUserById = (userId) => {
    const searchedObj = usersListRaw.find(
      (userRecord) => userRecord.id === userId
    );

    setdeleteUserObj(searchedObj);
    setdeleteUserModalFlag(true);
  };

  const handleTickChange = (userId) => () => {
    let newUserList = [];
    usersListRaw.forEach((userRecord) => {
      if (userRecord.id === userId) {
        newUserList.push({
          id: userId,
          name: userRecord.name,
          email: userRecord.email,
          role: userRecord.role,
          checked: !userRecord.checked,
        });
      } else {
        newUserList.push(userRecord);
      }
    });
    setusersListRaw([...newUserList]);
  };

  /**
   * Update the userRawData check flag based on Active Row
   * @param {*} e - Event which hold boolean checker if checkbox is checked
   */
  const bulkSelectHandler = (e) => {
    const checked = e.target.checked;
    setbulkSelectFlag(!bulkSelectFlag);
    const startIdx = activeRow * PAGES_PER_ROW;
    const endIdx = (activeRow + 1) * PAGES_PER_ROW;

    const newUserList = usersListRaw.map((userRecord, idx) => {
      if (idx >= startIdx && idx < endIdx) {
        return { ...userRecord, checked };
      }
      return { ...userRecord, checked: false };
    });
    setusersListRaw([...newUserList]);
  };

  const deleteSelectedButtonHandler = () => {
    setdeleteUserObj('BULK_DELETE');
    setdeleteUserModalFlag(true);
  };

  return (
    <>
      <Navbar
        searchQueryStr={searchQueryStr}
        setsearchQueryStr={setsearchQueryStr}
      />
      <div className="container mt-3">
        <StatusBar
          usersListRaw={usersListRaw}
          noOfRowsSelected={noOfRowsSelected}
          deleteSelectedButtonHandler={deleteSelectedButtonHandler}
        />
        <div class="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={bulkSelectFlag}
                    onChange={bulkSelectHandler}
                  />
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
                filteredAndPaginated(
                  usersListRaw,
                  activeRow,
                  bulkSelectFlag
                ).map((dataRow) => (
                  <tr
                    key={dataRow.id}
                    className={dataRow.checked ? `selected-row` : ''}
                  >
                    <th scope="row">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        checked={dataRow.checked}
                        onChange={handleTickChange(dataRow.id)}
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
                        <img src={EditIcon} alt="edit-icon" />
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger mx-1 icon-button"
                        onClick={() => deleteUserById(dataRow.id)}
                      >
                        <img src={DeleteIcon} alt="delete-icon" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination
        activeRowController={{ activeRow, setactiveRow }}
        maxRows={maxRows}
        resetBulkSelect={() => setbulkSelectFlag(false)}
      />
      <ConfirmDelete
        isOpen={deleteUserModalFlag}
        closeDialog={() => setdeleteUserModalFlag(false)}
        deleteUserCallback={deleteUserCallback}
        deleteUserObj={deleteUserObj}
      />
      <EditRecord
        isOpen={editUserModalFlag}
        closeDialog={() => seteditUserModalFlag(false)}
        editUserObj={editUserObj}
        updateUserCallback={updateUserCallback}
      />
    </>
  );
}

export default App;

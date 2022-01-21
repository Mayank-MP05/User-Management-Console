import axios from 'axios';
import { useEffect, useState } from 'react/cjs/react.development';
import { Spinner } from 'reactstrap';
import ConfirmDelete from './components/confirm-delete';
import EditRecord from './components/edit-record';
import Navbar from './components/navbar';
import Pagination from './components/pagination';
import StatusBar from './components/status-bar';
import TableView from './components/table-view';

function App() {
  const [usersListRaw, setusersListRaw] = useState([]);
  const [usersListRender, setusersListRender] = useState([]);
  const [searchQueryStr, setsearchQueryStr] = useState(``);

  /**
   * Call this useEffect first time Page loads - Fetches Data from API
   */
  useEffect(() => {
    axios
      .get(
        `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`
      )
      .then((res) => {
        setusersListRaw(res.data);
        setusersListRender(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  /**
   * Filter outs the data based on the Search Query Provided
   */
  useEffect(() => {
    const searchQueryTrimmed = searchQueryStr.trim();
    const filteredData = usersListRaw.filter((record) => {
      return `${record.id}|||${record.name}|||${record.role}|||${record.email}`.includes(
        searchQueryTrimmed
      );
    });
    setusersListRender(filteredData);
  }, [searchQueryStr, setsearchQueryStr]);

  return (
    <>
      <Navbar
        searchQueryStr={searchQueryStr}
        setsearchQueryStr={setsearchQueryStr}
      />
      <div className="container mt-3">
        <StatusBar />
        <TableView renderData={usersListRender} />
      </div>
      <Pagination />
      <ConfirmDelete isOpen={false} />
      <EditRecord isOpen={false} />
      <Spinner color="success" />
    </>
  );
}

export default App;

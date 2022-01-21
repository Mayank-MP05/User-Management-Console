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

  useEffect(() => {
    axios
      .get(
        `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`
      )
      .then((res) => {
        setusersListRaw(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mt-3">
        <StatusBar />
        <TableView renderData={usersListRaw}/>
      </div>
      <Pagination />
      <ConfirmDelete isOpen={false} />
      <EditRecord isOpen={false} />
      <Spinner color="success" />
    </>
  );
}

export default App;

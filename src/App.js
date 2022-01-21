import { Spinner } from 'reactstrap';
import ConfirmDelete from './components/confirm-delete';
import EditRecord from './components/edit-record';
import Navbar from './components/navbar';
import Pagination from './components/pagination';
import StatusBar from './components/status-bar';
import TableView from './components/table-view';

function App() {
  return (
    <>
      <Navbar />
      <div className="container mt-3">
        <StatusBar />
        <TableView />
      </div>
      <Pagination />
      <ConfirmDelete isOpen={false} />
      <EditRecord isOpen={false} />
      <Spinner color="success" />
    </>
  );
}

export default App;

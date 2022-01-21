import ConfirmDelete from './components/confirm-delete';
import EditRecord from './components/edit-record';
import Navbar from './components/navbar';
import Pagination from './components/pagination';
import TableView from './components/table-view';

function App() {
  return (
    <>
      <Navbar />
      <div className="container mt-3">
        <TableView />
      </div>
      <Pagination />
      <ConfirmDelete isOpen={false} />
      <EditRecord isOpen={true} />
    </>
  );
}

export default App;

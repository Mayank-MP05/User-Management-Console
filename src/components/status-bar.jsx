import React, { useEffect, useState } from 'react';
/**
 * Use cases of Status Bar
 * - Show how many rows selected
 * - TODO: After Editing show - editing successful
 * - TODO: After Deleting show - deletion successful
 * @returns Status bar which indicate status of recent activity with bulk delete button
 */
function StatusBar({ usersListRaw, noOfRowsSelected }) {
  const [noOfRows, setnoOfRows] = useState(0);

  useEffect(() => {
    let noOfRows = usersListRaw.filter((user) => user.checked).length;
    setnoOfRows(noOfRows);
  }, [usersListRaw]);
  return (
    <div className="w-100 d-flex">
      <div
        className="alert alert-danger p-2 float-start w-75 mx-2"
        role="alert"
      >
        {noOfRows} Rows Selected
      </div>
      <button
        className="btn btn-danger float-end w-25"
        style={{ height: '45px' }}
      >
        Delete Selected
      </button>
    </div>
  );
}

export default StatusBar;

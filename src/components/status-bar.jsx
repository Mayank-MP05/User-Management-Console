import React from 'react';
/**
 * Use cases of Status Bar
 * - Show how many rows selected
 * - After Editing show - editing successful
 * - After Deleting show - deletion successful
 * @returns Status bar which indicate status of recent activity with bulk delete button
 */
function StatusBar() {
  return (
    <div className="w-100">
      <div className="alert alert-danger" role="alert">
        23 Rows deleted
      </div>
      <button className="btn btn-danger float-end">Delete Selected</button>
    </div>
  );
}

export default StatusBar;

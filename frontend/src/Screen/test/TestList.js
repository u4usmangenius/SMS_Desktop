import React, { useEffect } from "react";
import { IoMdTrash } from "react-icons/io";
import { BiEditAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { MdCancelPresentation } from "react-icons/md";
import { observer } from "mobx-react-lite";
import EdittestModal from "./EditTestModel";
import { testStore } from "../../store/TestStore/TestStore";
import "../styles/FormList.css";

const TestList = observer(() => {
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    testStore.fetchDataFromBackend(1);
  }, []);

  const handleEdit = (test) => {
    testStore.handleEdit(test);
  };

  const handleSaveEdit = (editedTest) => {
    testStore.handleSaveEdit(editedTest);
  };

  const handleCancelEdit = () => {
    testStore.handleCancelEdit();
  };

  const handleDelete = (test) => {
    testStore.handleDelete(test);
  };
  const handlePageChange = (page) => {
    testStore.setCurrentPage(page);
    testStore.fetchDataFromBackend();
  };

  const handleSearchTextChange = (text) => {
    testStore.setSearchText(text);
  };

  const handleFilterChange = (filter) => {
    testStore.setSelectedFilter(filter);
  };
  const handleSearch = () => {
    testStore.handleSearch();
  };

  return (
    <div className="Form-list-container">
      <div className="Form-search-bar">
        <select
          className="Form-search-category"
          value={testStore.selectedFilter}
          onChange={(e) => handleFilterChange(e.target.value)}
        >
          <option value="all">All</option>
          <option value="TestName">TestName</option>
          <option value="ClassName">ClassName</option>
          <option value="TotalMarks">TotalMarks</option>
          <option value="SubjectName">SubjectName</option>
        </select>
        <input
          type="text"
          className="FormList-text-input"
          placeholder="Search for a test"
          value={testStore.searchText}
          onChange={(e) => {
            testStore.setSearchText(e.target.value);
            if (e.target.value === "") {
              testStore.fetchDataFromBackend(1);
            } else {
              testStore.handleSearch();
            }
          }}
        />
        <button
          className="Form-List-search-button"
          onClick={() => handleSearchTextChange("")}
        >
          Search
        </button>
      </div>
      <div className="FormList-table">
        <table>
          <thead>
            <tr>
              <th>Test Name</th>
              <th>Subject Name</th>
              <th>Class Name</th>
              <th>Total Marks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {testStore.filteredTests.map((test) => (
              <tr key={test.testId}>
                <td>{test.TestName}</td>
                <td>{test.SubjectName}</td>
                <td>{test.ClassName}</td>
                <td>{test.TotalMarks}</td>
                <td className="FormList-edit-icon">
                  <div
                    onClick={() => handleEdit(test)}
                    className="FormList-edit-icons"
                  >
                    <BiEditAlt className="FormList-edit-icons" />
                  </div>
                  <IoMdTrash
                    onClick={() => handleDelete(test)}
                    className="FormList-delete-icon"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="FormList-pagination-header">
        <button
          onClick={() => handlePageChange(testStore.currentPage - 1)}
          disabled={testStore.currentPage === 1}
          className="FormList-pagination-button"
        >
          Prev
        </button>
        <div className="page-count">{testStore.currentPage}</div>
        <button
          className="FormList-pagination-button"
          onClick={() => handlePageChange(testStore.currentPage + 1)}
          disabled={testStore.currentPage === testStore.totalPages}
        >
          Next
        </button>
      </div>
      {testStore.showEditModal && (
        <EdittestModal
          test={testStore.editingTest}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  );
});

export default TestList;

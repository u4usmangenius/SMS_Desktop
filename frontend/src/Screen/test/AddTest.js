import React, { useEffect } from "react";
import "./AddTest.css";
import { IoMdAddCircle } from "react-icons/io";
import { observer } from "mobx-react"; // Import MobX observer
import { addTestStore } from "../../store/TestStore/AddTestStore";

const AddTest = ({ onClose }) => {
  const store = addTestStore;
  useEffect(() => {
    store.fetchData();
    store.fetchSubjects();
  }, [store]);

  const handleSubmit = async () => {
    try {
      await store.handleSubmit();
      onClose();
    } catch (error) {
      console.error("Error handling submit:", error);
    }
  };

  return (
    <div className="add-form-content">
      <h2 className="add-form-heading">Add Test</h2>
      <div className="add-form-options"></div>
      <form>
        <div className="add-form-row">
          <div className="add-form-group">
            <label className="addForm-input-label">Subject:</label>
            <select
              value={store.formData.SubjectName}
              className="addForm-input-select"
              onChange={(e) =>
                store.setFormData({ SubjectName: e.target.value })
              }
            >
              <option>Select Subject</option>
              {store.subjectOptions.map((subject, index) => (
                <option key={index} value={subject.subjectName}>
                  {subject.subjectName}
                </option>
              ))}
            </select>
          </div>
          <div className="add-form-group">
            <label className="addForm-input-label">Test Name:</label>
            <input
              type="text"
              className="addForm-input-type-text"
              placeholder="Test Name"
              value={store.formData.TestName}
              onChange={(e) => store.setFormData({ TestName: e.target.value })}
            />
          </div>
        </div>
      </form>
      <div className="add-form-row">
        <div className="add-form-group">
          <label className="addForm-input-label">Total Marks:</label>
          <input
            type="text"
            className="addForm-input-type-text"
            placeholder="Total Marks"
            value={store.formData.TotalMarks}
            onChange={(e) => {
              let value = e.target.value;
              if (
                value === "" ||
                (parseInt(value) >= 1 && parseInt(value) <= 1001)
              ) {
                store.setFormData({ TotalMarks: value });
              } else if (
                (value >= "a" && value <= "z") ||
                (value >= "A" && value <= "Z")
              ) {
                store.setFormData({ TotalMarks: "" });
              }
            }}
          />
        </div>

        <div className="add-form-group">
          <label className="addForm-input-label">ClassName:</label>
          <select
            value={store.formData.ClassName}
            className="addForm-input-select"
            onChange={(e) => store.setFormData({ ClassName: e.target.value })}
          >
            <option value="">Select ClassName</option>
            {store.classnameOptions.map((className, index) => (
              <option key={index} value={className}>
                {className}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="addForm-another-btn">
        <button className="add-another-form-text">
          <div className="add-another-text-icon-btn">
            <IoMdAddCircle />
          </div>
          Add Another
        </button>
        <button className="add-form-button" onClick={handleSubmit}>
          {store.editingIndex !== -1 ? "Save Edit" : "Add Subjects"}
        </button>
      </div>
    </div>
  );
};

export default observer(AddTest);

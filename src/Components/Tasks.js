import React, { useEffect, useState } from "react";

export default function Tasks() {
  const localTasks = () => {
    const tasks = localStorage.getItem("tasksList");
    return tasks ? JSON.parse(tasks) : [];
  };
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [tasks, setTasks] = useState(localTasks());
  const [editTasks, setEditTasks] = useState(null);
  const [toggleBtn, setToggleBtn] = useState(false);

  // Add Task

  const addTask = () => {
    if (!taskTitle) {
      alert("Please fill all deatils");
      return;
    } else if (editTasks) {
      setTasks(
        tasks.map((curTask) =>
          curTask.id == editTasks
            ? { ...curTask, title: taskTitle, description: taskDesc }
            : curTask
        )
      );
    } else {
      const newTask = {
        id: new Date().getTime().toString(),
        title: taskTitle,
        description: taskDesc,
      };
      setTasks([...tasks, newTask]);
    }
    setTaskTitle("");
    setTaskDesc("");
  };

  // Remove Task

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((curTask) => {
      return curTask.id !== taskId;
    });
    setTasks(updatedTasks);
  };

  // Store Task
  useEffect(() => {
    localStorage.setItem("tasksList", JSON.stringify(tasks));
  }, [tasks]);

  // Edit Tasks
  const editTask = (taskId) => {
    const taskToEdit = tasks.find((curTask) => {
      return curTask.id === taskId;
    });
    setTaskTitle(taskToEdit.title);
    setTaskDesc(taskToEdit.description);
    setEditTasks(taskId);
    setToggleBtn(true);
  };
  return (
    <div className="container py-5">
      <div className="row gap-3">
        {tasks.map((curTask) => (
          <div className="todoList card col-lg-3" key={curTask.id}>
            <h4>{curTask.title}</h4>
            <p>{curTask.description}</p>
            <div className="task-btns">
              <i
                className="bi bi-pencil edit"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                onClick={() => editTask(curTask.id)}
              ></i>
              <i
                className="bi bi-trash3 trash"
                onClick={() => deleteTask(curTask.id)}
              ></i>
            </div>
          </div>
        ))}
        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Task Title"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                />
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <textarea
                  className="form-control"
                  rows="8"
                  placeholder="Task Description"
                  value={taskDesc}
                  onChange={(e) => setTaskDesc(e.target.value)}
                ></textarea>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={addTask}
                >
                  {toggleBtn ? "Save task" : "Add task"}
                </button>
              </div>
            </div>
          </div>
        </div>
        <button
          className="btn btn-primary btn-lg col-lg-3 custom-card"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          onClick={() => {
            setTaskTitle("");
            setTaskDesc("");
            setEditTasks(null);
            setToggleBtn(false);
          }}
        >
          <h1>
            <i className="bi bi-plus"></i>
          </h1>
        </button>
      </div>
    </div>
  );
}

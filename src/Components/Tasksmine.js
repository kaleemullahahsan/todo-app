import React, { useEffect, useState } from "react";

export default function Tasksmine() {
  const localData = () => {
    const tasks = localStorage.getItem("tasksList");
    return tasks ? JSON.parse(tasks) : [];
  };
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskDueDate, setTaskDueDate] = useState(null);
  const [tasks, setTasks] = useState(localData());
  const [editTasks, setEditTasks] = useState(null);
  const [toggleBtn, setToggleBtn] = useState(false);
  const [sortTask, setSortTask] = useState("asd");

  const addTask = () => {
    if (!taskTitle) {
      alert("Please fill all inputs");
    } else if (editTasks) {
      setTasks(
        tasks.map((curTask) =>
          curTask.id == editTasks
            ? {
                ...curTask,
                title: taskTitle,
                description: taskDesc,
                dueDate: new Date(taskDueDate).toDateString(),
              }
            : curTask
        )
      );
    } else {
      const newTask = {
        id: new Date().getTime().toString(),
        date: new Date().toDateString(),
        title: taskTitle,
        description: taskDesc,
        dueDate: new Date(taskDueDate).toDateString(),
      };
      setTasks([...tasks, newTask]);
    }
  };

  // Delete Task
  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((curTask) => {
      return curTask.id !== taskId;
    });
    setTasks(updatedTasks);
  };
  // Edit Task
  const editTask = (taskId) => {
    const taskToEdit = tasks.find((curTask) => {
      return curTask.id === taskId;
    });
    setTaskTitle(taskToEdit.title);
    setTaskDesc(taskToEdit.description);
    // Assuming taskToEdit.dueDate is a valid Date object or a parseable string
    const formatDateForInput = (date) => {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    setTaskDueDate(formatDateForInput(taskToEdit.dueDate));

    console.log(taskDueDate);
    setEditTasks(taskId);
    setToggleBtn(true);
  };
  // Save Tasks on Local Storage
  useEffect(() => {
    localStorage.setItem("tasksList", JSON.stringify(tasks));
  }, [tasks]);
  const handleSortChange = (value) => {
    setSortTask(value);
    const sortedTasks = [
      ...tasks.filter((task) => task.title === value),
      ...tasks.filter((task) => task.title !== value),
    ];
    setTasks(sortedTasks);
  };
  return (
    <>
      <div className="container py-5">
        <div className="row gap-3 px-2">
          {tasks.map((curTask) => (
            <div className="todoList card col-lg-3" key={curTask.id}>
              <h4>{curTask.title}</h4>
              <p>{curTask.description}</p>
              <div className="taskDates">
                <span>Task Date: {curTask.date}</span>
                <span>Due date: {curTask.dueDate}</span>
              </div>
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
                  <label>Due Date</label>
                  <input
                    type="date"
                    className="form-control my-2"
                    placeholder="Task Title"
                    value={taskDueDate}
                    onChange={(e) => setTaskDueDate(e.target.value)}
                  />
                  <textarea
                    className="form-control mt-3"
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
                    {toggleBtn ? "Save Task" : " Add task"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button
            className="btn btn-primary btn-lg col-lg-3 custom-card addTaskBtn"
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
    </>
  );
}

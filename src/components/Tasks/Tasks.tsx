import { useSelector } from "react-redux";
import { RootState } from "../../interfaces";
import { Pagination, Button, List} from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import useFetch from "../hooks/useFetch";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { updateTask } from "../store/userActions";
import TasksFilter from "./TasksFilter";
import styles from "./Task.module.css";


const Tasks: React.FC = () => {
  const dispatch = useDispatch();
  useFetch("todos", "addTasks");

  const tasks = useSelector((state: RootState) => state.tasks);
  const users = useSelector((state: RootState) => state.users);

  // Filter tasks based on the name and status filters

  const [idFilter, setIdFilter] = useState<number | undefined>();
  const [statusFilter, setStatusFilter] = useState<boolean | undefined>(
    undefined
  );

  const filteredTasks = tasks.filter((task) => {
    const filteredId = idFilter || undefined;
    const idMatch = filteredId === undefined || task.userId === filteredId;

    if (statusFilter === true) {
      return idMatch && task.completed;
    } else if (statusFilter === false) {
      return idMatch && !task.completed;
    } else {
      return idMatch;
    }
  });

  const handleFilterChange = (
    id: number | undefined,
    status: boolean | undefined
  ) => {
    setIdFilter(id);
    setStatusFilter(status);
    setCurrentPage(1); // Reset pagination
  };


  // Pagination
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const tasksForPage = filteredTasks.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const changeStatus = (id: any, completed: any) => {
    dispatch(updateTask({ taskId: id, taskStatus: !completed }));
  };

  return (
    <div className={styles['task-wrapper']}>
      <h1>Tasks</h1>
      <TasksFilter onFilterChange={handleFilterChange} />
      <List
        size="small"
        bordered
        dataSource={tasksForPage}
        renderItem={(item) => (
          <List.Item className={styles['status-list-item']}>
            <div>
              <p className={styles['task-title']}>{item.title}</p>
              <p className={styles['task-user']}>
                {users.find((user) => user.id === item.userId)?.name ||
                  "Unknown User"}
              </p>
            </div>
            <div className={styles['status-wrap']}>
              <p>
                Status:{" "}
                <span>
                  {item.completed ? <CheckOutlined /> : <CloseOutlined />}
                </span>
              </p>
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => changeStatus(item.id, item.completed)}
              >
                {item.completed ? "Mark as undone 😭" : "Mark as done 🥳"}
              </Button>
            </div>
          </List.Item>
        )}
      />
      <Pagination
        defaultCurrent={1}
        current={currentPage}
        total={tasks.length}
        pageSize={itemsPerPage}
        onChange={handlePageChange}
        className={styles['pagination-wrapper']}
      />
    </div>
  );
};

export default Tasks;

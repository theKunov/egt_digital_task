import { Button, Dropdown, Menu } from "antd";
import { useSelector } from "react-redux";
import { RootState, TasksFilterProps } from "../../interfaces";
import { useState } from "react";
import { CloseOutlined } from "@ant-design/icons";

import styles from "./TasksFilter.module.css";

const TasksFilter: React.FC<TasksFilterProps> = ({ onFilterChange }) => {
  const users = useSelector((state: RootState) => state.users);


  const userNames = users.map((user) => ({
    key: user.id,
    name: user.name,
  }));

  const status = [
    {key: 1 , status: "Done", value: true},
    {key: 2 , status: "Not done", value: false}
  ] ;

  // Filtering Status
  const [choosenName, setChoosenName] = useState<string>("");
  const [choosenId, setChoosenId] = useState<number | undefined>();
  const [choosenStatus, setChoosenStatus] = useState<boolean | undefined>(undefined);

  const handleNameFilterChange = (name: string, id: any) => {
    setChoosenName(name);
    setChoosenId(id);
    onFilterChange(id, choosenStatus);
  };

  const handleStatusFilterChange = (status: boolean | undefined) => {  
    setChoosenStatus(status);
    onFilterChange(choosenId, status);
  };
  
  return (
    <div className={styles['filter-wrapper']}>
      <div className={styles['filter-btn-wrapper']}>
        <p >Filter by:</p>
        <Dropdown
        overlay={
          <Menu>
            {status.map((item) => (
              <Menu.Item key={item.key} onClick={() =>handleStatusFilterChange(item.value)}>{item.status}</Menu.Item>
            ))}
          </Menu>
        }
        placement="bottomLeft"
        className={styles['dropdown']}
      >
        <Button>Status</Button>
        </Dropdown>

        <Dropdown
        overlay={
          <Menu>
            {userNames.map((item) => (
              <Menu.Item key={item.key} onClick={() =>handleNameFilterChange(item.name, item.key)}>{item.name}</Menu.Item>
            ))}
          </Menu>
        }
        placement="bottomRight"
        arrow
      >
        <Button>Name</Button>
        </Dropdown>
      </div>

      <div className={styles['choosen-filters']}>
          {choosenName && 
           <div className={styles['choosen-filters-item']}><p>{choosenName}</p><CloseOutlined onClick={() =>handleNameFilterChange("", undefined)} className={styles['remove-filter-btn']}/></div>   
          }
          {choosenStatus !== undefined && (
              <div className={styles['choosen-filters-item']}><p>{choosenStatus ? "Done" : "Not Done"}</p><CloseOutlined onClick={() =>handleStatusFilterChange(undefined)} className={styles['remove-filter-btn']}/></div>
          )}
      </div>
    </div>
  );
};

export default TasksFilter;

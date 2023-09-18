import { useSelector } from "react-redux";
import { RootState } from "../../interfaces";
import { Collapse, Typography } from "antd";
import UserInfo from "./UserInfo";
import styles from "./UserList.module.css";

const UserList: React.FC = () => {
  const users = useSelector((state: RootState) => state.users);

  return (
    <div className={styles['userlist-wrapper']}>
      <h1>Users List</h1>
      <div>
        {users.length <= 0 && (
          <Typography.Text strong type="danger">
            There are currently no users
          </Typography.Text>
        )}

        {users && users.length > 0 && (
          <Collapse >
            {users.map((user) => (
              <Collapse.Panel key={user.id} header={`${user.name}`} showArrow={false} className={styles['ant-collapse-panel']}>
                <UserInfo userInfo={user} />
              </Collapse.Panel>
            ))}
          </Collapse>
        )}
      </div>
    </div>
  );
};

export default UserList;

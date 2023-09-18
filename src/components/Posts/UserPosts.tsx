import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { RootState } from "../../interfaces";
import useFetch from '../hooks/useFetch';
import { Typography, Form } from 'antd';
import PostItem from './PostItem';
import styles from "./UserPosts.module.css";


const UserPosts: React.FC = () => { 
    const username  = useParams<{ username: string }>();
    
    const users = useSelector((state: RootState) => state.users);
    const posts = useSelector((state: RootState) => state.posts);
    
    const user = users.find(o => o.username === username.username);

    useFetch(`posts?userId=${user?.id}`, "addPosts")

    const userPosts = posts.filter(p => p.userId === user?.id)

    if (!userPosts) {
        return <div>{`${user?.username} has no posts.`}</div>;
    }else {
        return (
            <Form
              layout="vertical"
              className={styles['posts-wrapper']}
            >
              <Typography.Title level={1}>{`${user?.username} said: `}</Typography.Title>
              
              {userPosts.map((post) => (
                <PostItem  key={post.id} post={post}/>
            ))}
            </Form>
        );
    }
}

export default UserPosts
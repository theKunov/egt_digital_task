import { Form, Input, Button, Modal } from "antd";
import { Post } from "../../interfaces";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { deletePost, updatePost } from "../store/userActions";
import styles from "./PostItem.module.css";


const PostItem: React.FC<{ post: Post }> = ({ post }) => {
  const dispatch = useDispatch();

  const [initialUserPosts, setInitialUserPosts] = useState(post);
  const [changesMade, setChangesMade] = useState(false);

  const handlePostChange = (postId: number, body: string) => {
    setChangesMade(true);

    setInitialUserPosts({
      ...initialUserPosts,
      body: body,
    });
  };

  const postSubmit = () => {
    dispatch(
      updatePost({ postId: initialUserPosts.id, post: initialUserPosts })
    );
    setChangesMade(false);
  };

  const postDelete = () => {

    dispatch(deletePost({ postIdtoDelete: initialUserPosts.id }));
    fetch("https://jsonplaceholder.typicode.com/posts/" + initialUserPosts.id, {
      method: "DELETE",
    });
    handleOk();
  };


  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  

  return (
    <div className={styles['post']} >
      <Form.Item
        label={`${post.title}`}
        name={`post_${post.id}`}
        initialValue={`${post.body}`}
      >
        <Input onChange={(e) => handlePostChange(post.id, e.target.value)} />
      </Form.Item>
      <Button
        type="primary"
        htmlType="submit"
        disabled={!changesMade}
        onClick={postSubmit}
        className={styles['submit-btn']}
      >
        Submit Change
      </Button>
      <Button danger onClick={showModal}>
        Delete
      </Button>

      <Modal open={isModalOpen} onOk={postDelete} onCancel={handleCancel} okText="Delete">
        <p>Are you sure you want to delete this post?</p>
      </Modal>
    </div>
       
  );
};

export default PostItem;


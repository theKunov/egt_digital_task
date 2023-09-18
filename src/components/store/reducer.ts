import { ADD_USERS, UDPATE_USER, ADD_POSTS, UPDATE_POST, DELETE_POST, ADD_TASKS, UPDATE_TASK } from './userActionTypes';
import { RootState } from '../../interfaces';

const initialState: RootState = {
    users: [],
    posts: [],
    tasks: []
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_USERS :
      return { ...state, users: action.payload };
    case UDPATE_USER:
      const { id, user } = action.payload;

      const userIndex = state.users.findIndex((u) => u.id === id);

      const updatedUsers = [...state.users];
      updatedUsers[userIndex] = user;

      return {
        ...state,
        users: updatedUsers,
      };
    case ADD_POSTS:
      
      return { ...state, posts: action.payload };

    case UPDATE_POST:
      const { postId, post } = action.payload;
      
      const postIndex = state.posts.findIndex((u) => u.id === postId);

      const updatedPosts = [...state.posts];
      updatedPosts[postIndex] = post;
      
      return {
        ...state,
        posts: updatedPosts,
      };

    case DELETE_POST:
      const { postIdtoDelete } = action.payload;
      const updatedPostsList = state.posts.filter((post) => post.id !== postIdtoDelete);

      return {
        ...state,
        posts: updatedPostsList
      }

    case ADD_TASKS:

      return { ...state, tasks: action.payload };

    case UPDATE_TASK:
      const { taskId, taskStatus } = action.payload;
      const taskIndex = state.tasks.findIndex((u) => u.id === taskId);
      
      const updatedTasks = [...state.tasks];
      updatedTasks[taskIndex].completed = taskStatus;
      
      return {
        ...state,
        tasks: updatedTasks,
      };
    default:
      return state;
  }
};
  
export default reducer;
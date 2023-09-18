import { ADD_USERS, UDPATE_USER, ADD_POSTS, UPDATE_POST, DELETE_POST, ADD_TASKS, UPDATE_TASK } from './userActionTypes';

export const addUsers = (users: any[]) => ({
  type: ADD_USERS,
  payload: users,
});

export const updateUser = (updatedUser : any) => ({ 
    type: UDPATE_USER,
    payload: updatedUser,
}); 

export const addPosts = (posts: any[]) => ({
    type: ADD_POSTS,
    payload: posts,
});

export const updatePost = (updatedUser : any) => ({ 
  type: UPDATE_POST,
  payload: updatedUser,
}); 


export const deletePost = (updatedUser : any) => ({ 
  type: DELETE_POST,
  payload: updatedUser,
}); 

export const addtasks = (addtasks : any) => ({ 
  type: ADD_TASKS,
  payload: addtasks,
}); 

export const updateTask = (updatedTask : any) => ({ 
  type: UPDATE_TASK,
  payload: updatedTask,
}); 




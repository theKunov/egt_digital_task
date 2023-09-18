export interface RootState {
  users: User[];
  posts: Post[];
  tasks: Task[];
}

export interface User {
  id: number;
  name: string,
  username: string,
  email: string,
  address: {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
      lat: string,
      lng: string
    }
  },
  phone: string,
  website: string,
  company: {
    name: string,
    catchPhrase: string,
    bs: string
  }
}

export interface Post {
  userId: number;
  id: number,
  body: string,
  title: string
}

export interface Task {
  userId: number;
  id: number,
  title: string,
  completed: string
}

export interface UserInfoProps {
  userInfo: User
}

export interface TasksFilterProps {
  onFilterChange: (id: number | undefined, status: boolean | undefined) => void;
}
import { useEffect, useState } from 'react';
import { addUsers, addPosts, addtasks } from '../store/userActions';
import { useDispatch } from 'react-redux'



const useFetch = (url : string, type: string) => {
  const dispatch = useDispatch();

  const [datalength, setDataLength] = useState(true);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const urlConfigValue : string | undefined = process.env.REACT_APP_API_URL
    
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch(urlConfigValue + url);
        if (!response.ok) {
          setErr("Something went wrong");
          console.error(err);
        }
        const data = await response.json();

        if (!data.length) {
          setDataLength(false)
        }
        
        switch (type) {
          case "addUsers":
            dispatch(addUsers(data));
            break;
          case "addPosts":  
            dispatch(addPosts(data));
          break;
          case "addTasks":
            dispatch(addtasks(data));
          break;
          default:
            break;
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setErr("Something went wrong");
        console.error(error);
      }
    };

    fetchUsers();
  }, [dispatch, url, type, err]);

  return {datalength, loading, err}
};

export default useFetch;

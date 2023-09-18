import { NavLink } from 'react-router-dom';
import styles from "./Header.module.css";

const Header: React.FC = () => {
    return (
        <header className={styles['header']}>
            <span className={styles['item']}><NavLink to="/" className={styles['link']}>Users</NavLink></span>
            <span className={styles['item']}><NavLink to="/tasks" className={styles['link']}>Tasks</NavLink></span>
        </header>
    )
}

export default Header
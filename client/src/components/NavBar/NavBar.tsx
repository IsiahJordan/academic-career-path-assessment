import styles from './NavBar.module.css'
import { Link } from 'react-router-dom'
import { LogIn, UserPlus, LogOut } from 'lucide-react'
import { useLogout } from "@/hooks/useLogout"
import { NavProps } from './types'

function NavBar({ items, isAuth }: { items: NavProps; isAuth: boolean }) {
  const visibleItems = items.filter(item => !item.requireAuth || isAuth);
  const logout = useLogout();

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.left}>
          <h1 className={styles.logo}>ACPA</h1>
        </div>

        <div className={styles.center}>
          <ul className={styles.list}>
            {visibleItems.map(item => (
              <li key={item.path}>
                <Link to={item.path} className={styles.button}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.right}>
          { isAuth ? (
            <button onClick={logout} className={styles.button}>
              <LogOut size={24}/>
            </button>
          ) : (
            <>
              <Link to="/sign?form=in" className={styles.button}>
                <LogIn size={24} />
              </Link>
              <Link to="/sign?form=out" className={styles.button}>
                <UserPlus size={24} />
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar


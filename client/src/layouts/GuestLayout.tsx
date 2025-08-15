import { Outlet } from 'react-router-dom'
import NavBar from '@/components/NavBar'
import { useAuth } from "@/hooks/useAuth";

function GuestLayout() {
  const navItems = [
    { title: 'Home', path: '/' },
    { title: 'Guide', path: '/guide' },
    { title: 'Test', path: '/test' },
    { title: 'Performance', path: '/result' }
  ];

  const { user, loading } = useAuth({ verify: false });

  return (
    <div id="parent">
      <NavBar
        items={navItems}
        isAuth={Boolean(user)}
      />
      { <Outlet/> }
    </div>
  );
}

export default GuestLayout

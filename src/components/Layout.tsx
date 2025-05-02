import { Link, Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div>
      <header>
        <Link to="/">Home</Link>
      </header>
      <Outlet />
    </div>
  );
}

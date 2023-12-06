import {
  BrowserRouter,
  Outlet,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Home, Login, Profile, ResetPassword } from "./pages";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "./actions/users";
import { useState } from "react";

function Layout() {
  const dispatch = useDispatch();
  const location = useLocation();

  //permanently store the user in local storage
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  return user?.token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
function App() {
  const { theme } = useSelector((state) => state.theme);

  return (
    <div data-theme={theme} className="w-full min-h-[100vh]">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile/:id?" element={<Profile />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

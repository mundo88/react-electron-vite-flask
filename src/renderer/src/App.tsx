import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "@renderer/pages/Layout";
import Menu from "@renderer/pages/Menu";
import MarketPlace from "@renderer/pages/MarketPlace";
import TaskList from "@renderer/pages/TaskList";
import TaskDetail from "@renderer/pages/TaskDetail";
import TaskCreate from "@renderer/pages/TaskCreate";
import AuthLayout from "@renderer/pages/AuthLayout";
import Login from "@renderer/pages/Login";
import Register from "@renderer/pages/Register";
import PersistLogin from "@renderer/middleware/PersistLogin";
import  AuthMiddleware, { AnonymousMiddleware } from "@renderer/middleware/Auth";



function App() {
  return (
    <Routes>
      <Route element={<PersistLogin/>}>
        <Route element={<AuthMiddleware/>}>
          <Route path="/" element={<Layout />}>
              <Route index path="/tasks" element={<TaskList />} />
              <Route  path="/tasks/edit/:id" element={<TaskDetail />} />
              <Route  path="/tasks/create" element={<TaskCreate />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/marketplace" element={<MarketPlace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Route>
        <Route element={<AnonymousMiddleware/>}>
            <Route element={<AuthLayout/>}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

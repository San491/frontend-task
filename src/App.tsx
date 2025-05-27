import './App.css'
import Sidebar from './components/Sidebar/Sidebar'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import DashboardPage from './pages/Dashboard/DashboardPage'
import SettingsPage from './pages/Settings/SettingsPage'
import ProductListPage from './pages/ProductList/ProductListPage'

function App() {

  const Layout = () => {
    return (
      <div className="layout">
        <Sidebar />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    )
  }

  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            path: "/",
            element: <DashboardPage />
          },
          {
            path: "/products",
            element: <ProductListPage />
          },
          {
            path: "/settings",
            element: <SettingsPage />
          }
        ]
      },
    ]
  )

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App

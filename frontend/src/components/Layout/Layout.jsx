import { Outlet, NavLink } from 'react-router-dom'
export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow p-4"><nav className="flex gap-4"><NavLink to="/" className="text-blue-600 font-bold">BridgeKE</NavLink><NavLink to="/posts" className="hover:underline">Opportunities</NavLink></nav></header>
      <main className="flex-1 p-4"><Outlet /></main>
      <footer className="p-4 text-center text-gray-500">© 2026 BridgeKE 🇰🇪</footer>
    </div>
  )
}

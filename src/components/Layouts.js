import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Layouts({ children }) {
  return (
    <div className="navbar bg-base-100">
      <a className="btn btn-ghost normal-case text-xl" href="/">
        Home
      </a>
      <a className="btn btn-ghost normal-case text-xl" href="/upload">
        Upload
      </a>
      {children}
    </div>
  )
}

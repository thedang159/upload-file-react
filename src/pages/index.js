import Layouts from '../components/Layouts'

export default function Home() {
  return (
    <div>
      <Layouts></Layouts>
      <div className="flex h-screen">
        <div className="m-auto">
          <h1 className="text-3xl text-center my-4">Laravel Job Batching</h1>
          <h2 className="text-xl text-gray-500">
            Welcome to Upload Million Records
          </h2>
        </div>
      </div>
    </div>
  )
}

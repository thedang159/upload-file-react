import { useEffect } from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import Layouts from '../components/Layouts'

export default function Upload() {
  const fileRef = useRef()
  const API_URL = 'https://localhost/api'

  const [batchId, setBatchId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [batchDetail, setBatchDetail] = useState()

  function handleForm(e) {
    e.preventDefault()
    const inputFile = fileRef.current
    const file = inputFile.files[0]
    if (!file) return

    const formData = new FormData()
    formData.append('mycsv', file)

    setIsLoading(true)
    fetch(`${API_URL}/upload`, { method: 'post', body: formData })
      .then((res) => res.json())
      .then((data) => {
        setBatchId(data.id)
        setBatchDetail(data)
        setIsLoading(false)
      })
  }

  function batchDetails(id = null) {
    const currentBatchId = id ?? batchId
    fetch(`${API_URL}/batch?id=${currentBatchId}`)
      .then((res) => res.json())
      .then((data) => setBatchDetail(data))
  }

  useEffect(() => {
    if (batchDetail) {
      let intervalId = setInterval(() => {
        if (batchDetail.progress !== 100) {
          batchDetails(batchDetail.id)
        }
      }, 1000)

      return () => {
        clearInterval(intervalId)
      }
    }
  }, [batchDetail])

  return (
    <div>
      <Layouts></Layouts>
      {batchDetail?.progress !== undefined && (
        <session className="flex h-screen">
          <div className="text-center m-auto">
            <p>Upload is in progress ({batchDetail.progress}%)</p>
            <progress
              className="progress progress-info w-64"
              value={batchDetail.progress}
              max="100"
            ></progress>
          </div>
        </session>
      )}

      {batchDetail?.progress === undefined && (
        <session className="flex h-screen">
          <div className="mt-20 ml-auto mr-auto">
            <form
              method="post"
              className="border rounded p-4"
              onSubmit={handleForm}
            >
              <div className="mb-4">
                <input
                  type="file"
                  className="file-input file-input-bordered file-input-success w-full max-w-xs"
                  ref={fileRef}
                />
              </div>
              <button
                type="submit"
                className={`text-white  ${
                  isLoading
                    ? 'bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'
                    : 'bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                }`}
              >
                Upload
              </button>
            </form>
          </div>
        </session>
      )}
    </div>
  )
}

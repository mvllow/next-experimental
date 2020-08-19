import { useEffect } from 'react'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import Link from 'next/link'
import Layout from '../components/layout'
import { useRouter } from 'next/router'
import { fetchIssues } from '../helpers'
import { db } from '../firebase'

export default function Option() {
  let router = useRouter()
  let { pid } = router.query
  let [value, loading, error] = useDocumentData(db.doc(`options/${pid}`), {
    snapshotListenOptions: { includeMetadataChanges: true },
  })

  useEffect(() => {
    if (!loading && value) {
      if (!value.issues) {
        fetchIssues(value.name)
      }
    }
  }, [value])

  return (
    <Layout loading={loading} error={error}>
      <Link href="/">
        <a className="-mx-3 px-3 h-8 text-gray-500 rounded-md inline-flex items-center transition duration-150 ease-in-out hover:text-black hover:bg-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span className="ml-3 leading-none text-sm font-medium">
            All options
          </span>
        </a>
      </Link>

      <div className="h-6" />

      <h2 className="text-lg font-medium">{pid}</h2>

      <div className="h-1" />

      <div>
        {value?.issues?.length ? (
          value.issues.map((issue) => (
            <a
              href={issue.url}
              key={issue.url}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-gray-500 block truncate transition duration-150 ease-in-out hover:text-black"
            >
              {issue.title}
            </a>
          ))
        ) : (
          <p className="text-sm text-gray-500">
            {loading ? 'Loading...' : 'No related issues found'}
          </p>
        )}
      </div>
    </Layout>
  )
}

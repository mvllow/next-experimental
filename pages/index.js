import { useEffect } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import Link from 'next/link'
import Layout from '../components/layout'
import { fetchConfig } from '../helpers'
import { db } from '../firebase'

const Index = () => {
  let [values, loading, error] = useCollectionData(db.collection('options'), {
    snapshotListenOptions: { includeMetadataChanges: true },
  })

  useEffect(() => {
    if (!loading && !values) {
      fetchConfig()
    }
  }, [values])

  return (
    <Layout loading={loading} error={error}>
      <p className="pl-3 text-sm text-gray-500 border-l-2">
        Due to GitHub api rate limiting some options may be outdated or simply
        unavailable.{' '}
        <a
          href="https://github.com/mvllow/next-experimental"
          target="_blank"
          rel="noreferrer"
          className="border-b border-dotted hover:text-primary transition duration-150 ease-in-out"
        >
          Pull requests
        </a>{' '}
        are welcome :)
      </p>

      <div className="h-10" />

      {values?.map(({ name }) => (
        <Link key={name} href={name}>
          <a className="-mx-3 px-3 h-10 text-sm font-medium bg-transparent rounded-md flex items-center hover:text-black hover:bg-gray-100">
            {name}
          </a>
        </Link>
      ))}
    </Layout>
  )
}

export default Index

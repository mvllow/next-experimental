import { fetchConfig } from '../helpers'

const Layout = ({ children, loading, error }) => (
  <>
    <header className="mx-auto px-6 max-w-lg h-20 flex items-center">
      <h1 className="flex-1 text-lg font-bold">
        <a
          href="https://nextjs.org"
          className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light"
        >
          Next.js
        </a>{' '}
        experimental config
      </h1>

      <button
        onClick={fetchConfig}
        className="px-4 h-8 text-sm leading-none text-gray-500 hover:text-black font-medium hover:border-black border rounded-md flex items-center justify-center transition-colors duration-150 ease-in-out"
      >
        Refresh
      </button>
    </header>

    <main className="mx-auto pb-10 px-6 max-w-lg">
      {error ? error : children}
    </main>
  </>
)

export default Layout

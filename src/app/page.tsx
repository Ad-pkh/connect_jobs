'use client'

export default function home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="w-full px-6 py-4 flex items-center justify-between bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-indigo-600">Career Connect</h1>
        <a
          href="/login"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500"
        >
          Sign In
        </a>
      </header>

      <main className="flex-1 flex items-center justify-center">
        <p className="text-lg text-gray-600">Welcome to Career Connect</p>
      </main>
    </div>
  )
}

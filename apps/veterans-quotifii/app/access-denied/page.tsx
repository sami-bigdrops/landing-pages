import Navbar from "@/app/_components/Navbar"

export default function AccessDeniedPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-88px)] bg-white flex items-center justify-center px-6">
        <section className="max-w-lg w-full rounded-2xl border border-rose-200 bg-rose-50 p-8 text-center">
          <h1 className="text-3xl font-bold text-rose-700">Access Denied</h1>
          <p className="mt-3 text-sm text-rose-700/90">
            Your request could not be processed at this time.
          </p>
        </section>
      </main>
    </>
  )
}

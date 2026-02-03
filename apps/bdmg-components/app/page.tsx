import Navbar from "@/app/_components/Navbar"
import ProgressBar from "@/app/_components/ProgressBar"
import Button from "@/app/_components/Button"

export default function Page() {
  return (
    <main className="flex flex-col gap-4">
      <Navbar />
      <ProgressBar />
      <Button />
    </main>
  )
}

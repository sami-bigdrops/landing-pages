import Image from "next/image"

export default function CreditScoreNotice() {
  return (
    <p className="flex w-full items-center justify-center gap-1.5 text-[0.85rem] font-normal text-[#475467]">
      <Image
        src="/lock.svg"
        alt=""
        width={16}
        height={16}
        aria-hidden
        className="h-4 w-4 shrink-0"
      />
      <span>No impact to your credit score</span>
    </p>
  )
}

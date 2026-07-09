import * as React from "react"
import { Phone } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"
import { Button } from "@workspace/ui/components/button"
import type { NavbarContactButtonProps, NavbarProps } from "../model/types"
import { navbarVariants } from "../controller/navbar-variants"

const DEFAULT_CONTACT_BUTTON: NavbarContactButtonProps = {
  type: "3",
  variant: "default",
  size: "sm",
}

function CallIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      className="h-5 w-5 xl:h-6 xl:w-6 shrink-0"
      aria-hidden
    >
      <path
        d="M21.06 14.0833C20.8217 14.0833 20.5725 14.0075 20.3342 13.9533C19.8515 13.847 19.3772 13.7058 18.915 13.5308C18.4124 13.348 17.86 13.3575 17.364 13.5575C16.868 13.7575 16.4635 14.1339 16.2283 14.6142L15.99 15.1017C14.9348 14.5147 13.9652 13.7857 13.1083 12.935C12.2577 12.0781 11.5286 11.1085 10.9417 10.0533L11.3967 9.75C11.877 9.51483 12.2533 9.11032 12.4533 8.61433C12.6533 8.11834 12.6628 7.5659 12.48 7.06333C12.308 6.60012 12.1668 6.12603 12.0575 5.64417C12.0033 5.40583 11.96 5.15667 11.9275 4.9075C11.7959 4.14442 11.3962 3.45339 10.8004 2.95884C10.2046 2.4643 9.45174 2.19874 8.67749 2.21H5.42749C4.9606 2.20562 4.49826 2.30188 4.07192 2.49224C3.64559 2.6826 3.26527 2.96259 2.95687 3.31314C2.64847 3.66369 2.41922 4.07658 2.28472 4.52369C2.15023 4.9708 2.11366 5.44165 2.17749 5.90417C2.75462 10.4427 4.82735 14.6595 8.06828 17.8887C11.3092 21.1178 15.5336 23.1752 20.0742 23.7358H20.4858C21.2847 23.737 22.056 23.4439 22.6525 22.9125C22.9952 22.606 23.269 22.2302 23.4557 21.81C23.6425 21.3898 23.7379 20.9348 23.7358 20.475V17.225C23.7225 16.4725 23.4485 15.7479 22.9605 15.175C22.4725 14.602 21.8008 14.2162 21.06 14.0833ZM21.6017 20.5833C21.6015 20.7372 21.5685 20.8892 21.505 21.0293C21.4415 21.1694 21.3489 21.2943 21.2333 21.3958C21.1123 21.5003 20.9707 21.5784 20.8178 21.6251C20.6648 21.6717 20.5038 21.6859 20.345 21.6667C16.2878 21.1465 12.5192 19.2904 9.63376 16.3911C6.74828 13.4919 4.9101 9.71461 4.40915 5.655C4.39191 5.49631 4.40702 5.33577 4.45357 5.18309C4.50012 5.03041 4.57715 4.88874 4.67999 4.76667C4.78151 4.65111 4.90647 4.55849 5.04656 4.49498C5.18666 4.43148 5.33867 4.39853 5.49249 4.39833H8.74249C8.99441 4.39273 9.24041 4.47512 9.43814 4.63133C9.63587 4.78753 9.77296 5.00778 9.82582 5.25417C9.86915 5.55028 9.92332 5.84278 9.98832 6.13167C10.1135 6.70274 10.28 7.26394 10.4867 7.81083L8.96999 8.515C8.84031 8.5745 8.72366 8.65902 8.62674 8.76373C8.52982 8.86843 8.45454 8.99125 8.40521 9.12513C8.35589 9.25901 8.3335 9.40131 8.33932 9.54387C8.34515 9.68642 8.37907 9.82642 8.43915 9.95583C9.99829 13.2955 12.6828 15.98 16.0225 17.5392C16.2862 17.6475 16.5821 17.6475 16.8458 17.5392C16.9809 17.4908 17.1051 17.4162 17.2111 17.3195C17.3171 17.2227 17.4028 17.1059 17.4633 16.9758L18.135 15.4592C18.695 15.6595 19.2666 15.8259 19.8467 15.9575C20.1355 16.0225 20.428 16.0767 20.7242 16.12C20.9705 16.1729 21.1908 16.3099 21.347 16.5077C21.5032 16.7054 21.5856 16.9514 21.58 17.2033L21.6017 20.5833Z"
        fill="#0752A0"
      />
    </svg>
  )
}

function Navbar({
  variant = "default",
  type = "1",
  logo,
  contactText = "Call us",
  contactHref = "#",
  contactLabel = "Contact",
  contactTextClassName,
  contactButton,
  showContactIcon = true,
  className,
  ...props
}: NavbarProps) {
  const btn = { ...DEFAULT_CONTACT_BUTTON, ...contactButton }
  const hasCustomClassName =
    btn.className != null && btn.className.trim() !== ""

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className={cn(navbarVariants({ variant, type }), className)}
      {...props}
    >
      {type === "2" ? (
        logo != null ? <div className="shrink-0">{logo}</div> : null
      ) : type === "3" ? (
        <div className="flex w-full items-center justify-center md:grid md:grid-cols-[1fr_auto_1fr] md:items-center">
          <div className="hidden md:block" aria-hidden />
          {logo != null ? <div className="shrink-0 justify-self-center">{logo}</div> : null}
          <a
            href={contactHref}
            className={cn(
              "hidden md:inline-flex items-center gap-1.5 xl:gap-2 justify-self-end",
              contactTextClassName
            )}
            aria-label={`${contactText}: ${contactLabel}`}
          >
            {showContactIcon ? <CallIcon /> : null}
            <span className="text-base font-bold text-[#1A1A1A] xl:text-xl">
              {contactLabel}
            </span>
          </a>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-6 w-full">
            {logo != null ? <div className="shrink-0">{logo}</div> : null}
          </div>
          <div className="shrink-0 flex items-center gap-2">
            <span
              className={cn(
                "text-sm font-medium text-muted-foreground",
                contactTextClassName
              )}
            >
              {contactText}
            </span>
            <Button
              type={hasCustomClassName ? "6" : btn.type}
              variant={btn.variant}
              size={hasCustomClassName ? "default" : (btn.size ?? "sm")}
              backgroundColor={btn.backgroundColor}
              foregroundColor={btn.foregroundColor}
              className={cn(
                "inline-flex items-center gap-2",
                hasCustomClassName ? btn.className : undefined
              )}
              asChild
            >
              <a
                href={contactHref}
                aria-label={`${contactText}: ${contactLabel}`}
              >
                {showContactIcon ? <Phone className="size-4" aria-hidden /> : null}
                {contactLabel}
              </a>
            </Button>
          </div>
        </>
      )}
    </nav>
  )
}

export { Navbar }

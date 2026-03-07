"use client"

export default function Ribbon() {
    return (
        <div className="bg-[#EDF2F9] p-3 flex items-center justify-center rounded-sm overflow-x-auto">
            <p className="flex items-center gap-2 text-black font-inter font-semibold text-sm md:text-base whitespace-nowrap">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#3498DB]" />
                <a
                    href="https://apnews.com/article/trump-economy-inflation-interest-rates-borrowing-6ef86392b080ca963ec633546009409b"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#3498DB] hover:underline"
                >
                    APNEWS
                </a>
                <span>Trump demands interest rates come down</span>
            </p>
        </div>
    );
}
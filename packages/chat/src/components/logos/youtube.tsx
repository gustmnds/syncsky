import { IconProps } from "./icon";

export function YoutubeIcon({ size = 64, className }: IconProps) {
    return (
        <svg width={size} height={size} className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29 20">
            <path d="M14.485 20s9.085 0 11.338-.6a3.62 3.62 0 0 0 2.558-2.53C29 14.65 29 9.98 29 9.98s0-4.64-.62-6.84A3.55 3.55 0 0 0 25.824.61C23.57 0 14.485 0 14.485 0S5.42 0 3.177.61A3.65 3.65 0 0 0 .6 3.14C0 5.34 0 9.98 0 9.98s0 4.67.599 6.89a3.72 3.72 0 0 0 2.578 2.53c2.243.6 11.308.6 11.308.6" fill="#F03" />
            <path d="m19 10-7.5-4.25v8.5z" fill="#fff" />
        </svg>
    )
}

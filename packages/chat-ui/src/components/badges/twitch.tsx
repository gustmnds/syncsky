import { BadgeProps } from ".";

export function TwitchBadge({ size = 64, className }: BadgeProps) {
    return (
        <svg width={size} height={size} className={className} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <path d="m55.077 29.677-9.106 9.126h-9.105L28.9 46.788v-7.985H18.657V4.583h36.42z" fill="#FEFEFE"/>
            <path d="m55.077 29.677-9.106 9.126h-9.105L28.9 46.788v-7.985H18.657V4.583h36.42zM16.38.02 5 11.426v41.066h13.657v11.407l11.381-11.407h9.105l20.485-20.534V.018z" fill="#9046ff"/>
            <path d="M43.695 26.255h4.552V12.566h-4.552zm-12.52 0h4.554V12.566h-4.553z" fill="#9046ff"/>
        </svg>
    )
}

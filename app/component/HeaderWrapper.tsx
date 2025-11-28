
export default function HeaderWrapper ({header, text}) {
    return(
        <div className="header_wrapper flex flex-col gap-4 p-4  w-1/2 text-center">
            <h1 className="font-bold text-5xl">{header}</h1>
            <p className="font-light text-sm">{text}</p>
        </div>
    )
}
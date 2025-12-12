
export default function HeaderWrapper ({header, text}) {
    return(
        <div className="header_wrapper flex flex-col gap-4 p-4 ">
            <h1 className="font-bold text-3xl">{header}</h1>
            <p className="font-light text-sm">{text}</p>
        </div>
    )
}
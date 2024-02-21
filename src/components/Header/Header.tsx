import './Header.css'

type HeaderProps ={
    title:string
}

export default function Header({title}:HeaderProps){
    return(
        <div className="bg-blue-500 white p-6 mb-4">
            <h1 className="text-center text-white text-6xl">{title}</h1>
        </div>
    )
}
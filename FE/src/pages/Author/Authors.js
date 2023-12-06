import { Link, useLoaderData } from "react-router-dom"

export default function Authors() {
    const careers = useLoaderData()

    return (
        <div className="authors">
            <h1>Chào mừng tác giả. </h1>
            <span> Hãy cũng nhau lan tỏa nghệ thuật</span>
        </div>
    )
}

// data loader
// export const careersLoader = async () => {
//     const res = await fetch('http://localhost:4000/careers')

//     if (!res.ok) {
//         throw Error('Could not fetch the list of careers')
//     }

//     return res.json()
// }

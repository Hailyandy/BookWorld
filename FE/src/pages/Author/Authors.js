import { Link, useLoaderData } from "react-router-dom"

export default function Authors() {
    const careers = useLoaderData()

    return (
        <div className="authors">
            {/* {careers.map(career => (
                <Link to={career.id.toString()} key={career.id}>
                    <p>{career.title}</p>
                    <p>Based in {career.location}</p>
                </Link>
            ))} */}
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

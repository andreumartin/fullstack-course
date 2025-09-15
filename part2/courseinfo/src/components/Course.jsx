const Course = ({course}) => {
    const {id, name, parts} = course;
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
        <div>
            <h2>{name}</h2>
            <div>
                {parts.map(part => 
                    <p key={part.id}>{part.name} {part.exercises}</p>
                )}
            </div>
            <b>total of {total} exercises </b>
        </div>
    )
}

export default Course;
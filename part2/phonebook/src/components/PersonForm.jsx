const PersonForm = ({ onSubmit, value1, onChange1, value2, onChange2 }) => (
    <form
        onSubmit={onSubmit}>
        <div>
            name: <input 
                    value={value1}
                    onChange={onChange1}/>
        </div>
        <div>
            number: <input 
                    value={value2}
                    onChange={onChange2}/>
        </div>
        <div><button type="submit">add</button></div>
    </form>
);

export default PersonForm;
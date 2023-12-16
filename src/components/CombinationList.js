const CombinationList = ({ combinations }) => {
    return (
        <div className="combination-list">
            <h2>Combinações:</h2>
            <ul>
                {combinations.map((combination, index) => (
                    <li key={index}>{combination.join(', ')}</li>
                ))}
            </ul>
        </div>
    );
};

export default CombinationList;

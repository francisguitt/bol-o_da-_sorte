


import './NumberInput.css';
const NumberInput = ({ value, onChange, }) => {
    return (
        <div className="number-input">
            <input className='input_element'
            placeholder="apenas de 1 a 25 números "
                type="number"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};

export default NumberInput;

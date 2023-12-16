


import './NumberInput.css';
const NumberInput = ({ value, onChange, }) => {
    return (
        <div className="number-input">
            <input className='input_element'
            placeholder="Digite Seu Numero"
                type="number"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};

export default NumberInput;

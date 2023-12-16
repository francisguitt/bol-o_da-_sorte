
import './App.css';

import React, { useState, useEffect } from 'react';
import NumberInput from './components/NumberInput';
import ParticipantForm from './components/ParticipantForm';
import { Help } from './components/help';



const handleSaveParticipant = (newParticipant) => {
  // Lógica para salvar o participante onde necessário no App.js
  // Exemplo: atualizar o estado ou executar outra ação necessária
  console.log('Novo participante salvo:', newParticipant);
};

const generate_combinations = (numbers) => {
  const combinations = [];

  const combine = (current, start) => {
    if (current.length === 15) {
      combinations.push([...current]);
      return;
    }

    for (let i = start; i < numbers.length; i++) {
      current.push(numbers[i]);
      combine(current, i + 1);
      current.pop();
    }
  };

  combine([], 0);
  return combinations;
};

const generate_lottery_tickets = (combinations) => {
  const tickets = [];

  for (const combination of combinations) {
    const subcombinations = generate_combinations(combination);
    for (const subcombination of subcombinations) {
      const formattedCombination = subcombination.map(num => num < 10 ? `0${num}` : num);
      tickets.push(formattedCombination.slice(0, 6));
    }
  }

  return tickets;
};

const App = () => {
  const [numbers, setNumbers] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [combinations, setCombinations] = useState([]);
  const [showCombinations, setShowCombinations] = useState(false);
  const [showNumbers, setShowNumbers] = useState(false);

  const handleShowNumbers = () => {
    if (!showNumbers) {
      setShowNumbers(true);
    } else {
      setShowNumbers(false);
    }
  }

  useEffect(() => {
    const storedNumbers = JSON.parse(localStorage.getItem('numbers')) || [];
    setNumbers(storedNumbers);
  }, []);

  const updateLocalStorage = (newNumbers) => {
    localStorage.setItem('numbers', JSON.stringify(newNumbers));
  };

  const handleAddNumber = () => {
    if (numbers.length < 25 && inputValue.trim() !== '') {
      const newNumber = parseInt(inputValue, 10) < 10 ? `${parseInt(Number(0))}${parseInt(inputValue, 10)}` : parseInt(inputValue, 10);
      if (!numbers.includes(newNumber) && newNumber <= 25) {
        const newNumbers = [...numbers, newNumber];
        setNumbers(newNumbers);
        setInputValue('');
        updateLocalStorage(newNumbers);
      } else {
        alert('Este número já foi adicionado ou é maior que 25.');
        setInputValue('');
      }
    } else if (numbers.length >= 25) {
      alert('Você só pode adicionar até 25 números.');
    }

    setShowCombinations(false);
  };

  const handleCombineNumbers = () => {
    if (numbers.length >= 25) {
      const selectedNumbers = numbers.slice(0, 18);
      const combinations_15_numbers = generate_combinations(selectedNumbers);
      setCombinations(combinations_15_numbers);
      setShowCombinations(true);
    } else {
      alert('Você precisa adicionar pelo menos 25 números para gerar combinações.');
    }
  };
  // const handleGenerateLotteryTickets = () => {
  // const lottery_tickets = generate_lottery_tickets(combinations);
  //   console.log("Jogos gerados:", lottery_tickets.length);
  // };
  const handleGenerateLotteryTickets = () => {
    if (combinations.length > 0) {
      // const lotteryTickets = generateLotteryTickets(combinations);
      const lotteryTickets = generate_lottery_tickets(combinations);
      // Criar uma string com os bilhetes formatados
      const ticketsString = lotteryTickets.map(ticket => ticket.join(', ')).join('\n');

      // Criar uma nova janela do navegador para exibir os bilhetes
      const newWindow = window.open('', '_blank');
      newWindow.document.write(`<pre>${ticketsString}</pre>`);
    } else {
      alert('Você precisa gerar combinações antes de criar os bilhetes.');
    }
  };
  const handleRemoveLocalStorage = () => {
    const confirmRemove = window.confirm('Tem certeza de que deseja apagar os dados?');

    if (confirmRemove) {
      window.localStorage.removeItem('numbers');
      alert('Dados removidos com sucesso!');
      window.location.reload(); // Recarrega a página após a remoção dos dados
    } else {
      alert('Ação cancelada.');
    }
  };
  return (
    <>
      <header className='header-title'>
        <h1 className='title'>Bolão da Sorte</h1>
        <div className='help-area'>
          <Help />
        </div>
      </header>
      <div className="add-number-section">
        <h2>Digite Aqui seu Número:</h2>
        <NumberInput
          value={inputValue}
          onChange={(value) => setInputValue(value)}
        />
        <div className="add-number-section-area-button">
          <button className="add-button" onClick={handleAddNumber}>Adicionar Número</button>
          <button className="combine-button" onClick={handleCombineNumbers}>Combinar Números</button>
          <button className="remove-button" onClick={handleRemoveLocalStorage}>Limpar Dados</button>
          <button className="show-numbers-button" onClick={handleShowNumbers}>{!showNumbers ? "Ocultar tabela" : "Mostar tabela"}</button>
        </div>
        <ParticipantForm onSaveParticipant={handleSaveParticipant} />
      </div>

      {showCombinations && (

        <div className="combinations-section">
          <h2>Resultado</h2>
          {!showNumbers && <>
            <table className="combinations-table">
              <div className="combination-table-area">
                <thead>
                  <tr>
                    <th>Qt:</th>
                    <th>Números do Bilhete</th>
                  </tr>
                </thead>
                <div className="tacle-colum-rows-area">
                  {combinations.map((combination, index) => (
                    <div key={index} className="table-colum-rows-area-content">
                      <tr className={(index % 2 === 0) ? 'even-row' : 'odd-row'}>
                        <td ><span>{index + 1}</span></td>
                        <td><span className='td-combination'>{combination.join(', ')}</span></td>
                      </tr>
                    </div>
                  ))}
                </div>

              </div>
            </table>

            <button onClick={handleGenerateLotteryTickets} className='generation-tickets-button'><p>Gerar Bilhetes</p></button>
          </>}
        </div>

      )}

      <div className='author'>
        <a href='https://instagram.com/guittzoom' style={{ textDecoration: "none" }}> <p>desenvolvido com <span style={{ color: "red", marginLeft: "6px", marginRight: "6px" }}>&#10084;</span> por guitt zoom</p></a>
      </div>

    </>
  );
};

export default App;




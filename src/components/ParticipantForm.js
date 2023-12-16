
import React, { useState, useEffect } from 'react';
import './ParticipantForm.css'
const ParticipantForm = ({ onSaveParticipant }) => {
    const [participantName, setParticipantName] = useState('');
    const [participants, setParticipants] = useState([]);
    const [editingParticipantId, setEditingParticipantId] = useState(null);
    const [showParticipants, setShowParticipants] = useState(true);

    useEffect(() => {
        const storedParticipants = JSON.parse(localStorage.getItem('participants')) || [];
        setParticipants(storedParticipants);
    }, []);

    const updateLocalStorage = (newParticipants) => {
        localStorage.setItem('participants', JSON.stringify(newParticipants));
    };

    const handleAddParticipant = () => {
        if (participantName.trim() !== '') {
            if (editingParticipantId !== null) {
                const updatedParticipants = participants.map(participant =>
                    participant.id === editingParticipantId
                        ? { ...participant, name: participantName.trim() }
                        : participant
                );

                setParticipants(updatedParticipants);
                updateLocalStorage(updatedParticipants);
                setEditingParticipantId(null);
            } else {
                const newParticipant = {
                    id: new Date().getTime(),
                    name: participantName.trim(),
                };

                const newParticipantsList = [...participants, newParticipant];
                setParticipants(newParticipantsList);
                updateLocalStorage(newParticipantsList);
                onSaveParticipant(newParticipant);
            }

            setParticipantName('');
        } else {
            alert('Por favor, insira um nome válido para o participante.');
        }
    };

    const handleEditParticipant = (id) => {
        const participantToEdit = participants.find(participant => participant.id === id);
        if (participantToEdit) {
            setParticipantName(participantToEdit.name);
            setEditingParticipantId(id);
        }
    };

    const handleRemoveParticipant = (id) => {
        const updatedParticipants = participants.filter(participant => participant.id !== id);
        setParticipants(updatedParticipants);
        updateLocalStorage(updatedParticipants);
        setEditingParticipantId(null);
    };

    const handleToggleParticipants = () => {
        setShowParticipants(!showParticipants);
    };
    return (
        <div className="participant-form">
            <div className="participant-form-area">
                <h2>Cadastro de Participantes</h2>
                <div className="participant-form-content">
                    <div className="area-button-show-hidden-add">
                        <button onClick={handleToggleParticipants} className="button-show-hidden-participant">
                            {showParticipants ? 'Ocultar Particioantes' : 'Mostrar Participantes'}
                        </button>
                        <button onClick={handleAddParticipant} className="button-add-save-participant">
                            {editingParticipantId !== null ? 'Salvar Edição' : 'Adicionar Participante'}
                        </button>
                    </div>
                    {showParticipants && (
                        <>
                            <input
                                type="text"
                                placeholder="Nome do Participante"
                                value={participantName}
                                onChange={(e) => setParticipantName(e.target.value)}
                            />
                            <div className="list-client">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Nome do Participante</th>
                                            <th>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {participants.map(participant => (
                                            <tr key={participant.id}>
                                                <td>{participant.name}</td>
                                                <td className="td-area-button">
                                                    <button className="edit-button" onClick={() => handleEditParticipant(participant.id)}>Editar</button>
                                                    <button className="remove-button" onClick={() => handleRemoveParticipant(participant.id)}>Remover</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ParticipantForm;

import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface RentModalProps {
  show: boolean;
  onHide: () => void;
  selectedMovie: {
    title: string;
    quantity: number;
  } | null;
  rentalDays: number;
  setRentalDays: (days: number) => void;
  handleRent: () => void;
}

const RentModal: React.FC<RentModalProps> = ({
  show,
  onHide,
  selectedMovie,
  rentalDays,
  setRentalDays,
  handleRent,
}) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Alugar Filme</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Alugando 1 filme</strong></p>
        <p><strong>Filme:</strong> {selectedMovie?.title}</p>
        <p><strong>Disponível:</strong> {selectedMovie?.quantity}</p>
        <div className="mb-3">
          <label htmlFor="rentalDays" className="form-label">Dias de Aluguel</label>
          <input
            type="number"
            className="form-control"
            id="rentalDays"
            value={rentalDays}
            onChange={(e) => setRentalDays(Number(e.target.value))}
            min="1"
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancelar</Button>
        <Button variant="primary" onClick={handleRent}>Alugar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RentModal;

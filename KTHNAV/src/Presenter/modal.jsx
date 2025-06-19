import React from 'react';
import '/src/Css/karta.css'; 

export const Modal = ({ isOpen, close, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={close}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <p>{message}</p>
        <button className = "ok-button" onClick={close}>OK</button>
      </div>
    </div>
  );
};


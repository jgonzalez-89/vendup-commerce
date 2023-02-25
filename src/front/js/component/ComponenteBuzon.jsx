import React from 'react';
import icon from '../../../../public/iconConstruction.png';

const BuzonComponent = () => {
  return (
    <div>
      <h1 className="text-center my-5">Aquí podrás hablar con otros usuarios</h1>
      <div className="d-flex justify-content-center">
        <img width={200} height={200} className="align-self-center mr-3" src={icon} alt="Mi imagen" style={{ marginTop: '20vh' }} />
      </div>
    </div>
  );
};

export default BuzonComponent;

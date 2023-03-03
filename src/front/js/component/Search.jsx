import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';

const SearchPage = ({ onSearch }) => {
  return (
    <div className="d-flex justify-content-end my-3">
      <Form.Control type="text" placeholder="Buscar" className="mr-sm-2 btn-warning bg-white" onChange={onSearch} />
    </div>
  );
};

export default SearchPage;

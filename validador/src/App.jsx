import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { IMaskInput } from "react-imask";

const App = () => {
  const [cpf, setCpf] = useState("");

  const validateCpf = (cpf) => {
    const numCpf = cpf.replace(/\D/g, "");

    if (numCpf.length !== 11) {
      return false;
    }

    if (/^(\d)\1+$/.test(numCpf)) {
      return false;
    }

    let cpfQuebrado = numCpf.split("").map((item) => Number(item));

    let soma = 0;
    let resto = 0;

    for (let i = 0; i < 9; i++) {
      soma += cpfQuebrado[i] * (10 - i);
    }

    resto = soma % 11;
    if (resto < 2) {
      resto = 0;
    } else {
      resto = 11 - resto;
    }

    if (resto !== cpfQuebrado[9]) {
      return false;
    }

    soma = 0;

    for (let i = 0; i < 10; i++) {
      soma += cpfQuebrado[i] * (11 - i);
    }

    resto = soma % 11;
    if (resto < 2) {
      resto = 0;
    } else {
      resto = 11 - resto;
    }

    if (resto !== cpfQuebrado[10]) {
      return false;
    }

    return true;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (validateCpf(cpf)) {
      alert("CPF Válido: " + cpf);
    } else {
      alert("CPF Inválido: " + cpf);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div
        className="card shadow p-4"
        style={{ maxWidth: "500px", width: "100%", borderRadius: "1rem" }}
      >
        <h4 className="mb-4 text-center">Validação de CPF</h4>
        <Form onSubmit={onSubmit}>
          <Form.Group as={Row} className="mb-3" controlId="formCpf">
            <Form.Label column sm={1.5} className="fw-semibold">
              CPF
            </Form.Label>
            <Col sm={12}>
              <IMaskInput
                mask="000.000.000-00"
                value={cpf}
                onAccept={(value) => setCpf(value)}
                placeholder="Insira o CPF"
                className="form-control"
              />
            </Col>
          </Form.Group>
          <div className="d-grid">
            <Button variant="primary" type="submit" size="lg">
              Confirmar
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default App;

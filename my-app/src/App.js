import Container from "react-bootstrap/Container";
import FormTest from "./components/FormTest";
// import { useState } from "react";
import "./App.css";

function App() {
  // Jag vill flytta ut följande kod hit och hantera onSubmit i denna componenten, men då fungerar inte reset() funktionen som är innebygd i react-hook-form

  // const [message, setMessage] = useState(false);

  // function onSubmit(data) {
  //   console.log(data);
  //   setMessage(true);
  //   reset();
  // }
  // {message && <p className="success">Property added</p>}

  return (
    <Container>
      <h1 className="text-center mt-5">Test Form</h1>
      <FormTest />
    </Container>
  );
}

export default App;

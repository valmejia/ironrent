//Hooks useState para acceder a la funcionalidad del estado de React
//Queremos decirle a React que reactzione a los cambios que se realizan
//en la app.

import { useState, useEffect } from "react";
import "./App.css";
import { Button, Spinner, Image, Skeleton } from "@chakra-ui/react";
import Card from "./components/Card";
import Navbar from "./components/Navbar";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ListaCasas from "./components/ListaCasas";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  // const [valor,setValor] = useState(valorInicial)
  const [show, setShow] = useState(true);
  const [data, setData] = useState([]);

  //useEffect --> useEffect(() => {})

  //Mount, Update, Unmount
  // Si queremos que se ejecute en cada re-renderizado
  // useEffect(() => {
  //   console.log("Soy el UseEffect");
  // });

  // Si queremos que se ejecute una sola vez al montarse en nuestra app
  // Con este vamos a hacer nuestras peticiones GET
  useEffect(() => {
    console.log("GET DATOS");
    fetch("https://ironbnb-m3.herokuapp.com/apartments")
      .then((datos) => {
        datos.json().then((casas) => {
          console.log("Datos de la casas: ", casas);
          setData(casas);
          setShow(false);
        });
      })
      .catch(console.log);
    // axios
    //   .get("https://ironbnb-m3.herokuapp.com/apartments")
    //   .then((datos) => {
    //     console.log("esto es axios", datos);
    //     setData(datos.data);
    //     setShow(false);
    //   })
    //   .catch(console.log);
  }, []);

  const toggleShow = () => {
    setShow(!show);
    console.log("El valor de who es: ", show);
  };

  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<ListaCasas data={data}/>} />
      </Routes>
    </Router>
  );
}

export default App;
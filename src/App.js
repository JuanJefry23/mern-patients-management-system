import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import clienteAxios from "./config/axios";

//Components
import Pacientes from "./components/Pacientes";
import NuevaCita from "./components/NuevaCita";
import Cita from "./components/Cita";

function App() {
  //Uso mi state para guardar cita
  const [citas, guardarCitas] = useState([]); //Lo inicializo como un arreglo vacio para poder recorrerlo luego cuando tenga datos con ".map"

  const [consultar, guardarConsultar] = useState(true);

  //Mi useEffect un buen lugar para consumir mi API externa
  useEffect(() => {
    if (consultar) {
      const consultarApi = () => {
        clienteAxios
          .get("/pacientes")
          .then((respuesta) => {
            //Gardar la respuesta en el state
            guardarCitas(respuesta.data);

            //Deshabilitar la consulta
            guardarConsultar(false);
          })
          .catch((error) => console.log(error));
      };
      consultarApi();
    }
  }, [consultar]);
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={() => <Pacientes citas={citas} />} />
        <Route
          exact
          path="/nueva"
          component={() => <NuevaCita guardarConsultar={guardarConsultar} />}
        />
        <Route
          exact
          path="/cita/:id"
          render={(props) => {
            const cita = citas.filter(
              (cita) => cita._id === props.match.params.id
            );

            return <Cita cita={cita[0]} guardarConsultar={guardarConsultar} />;
          }}
        />
      </Switch>
    </Router>
  );
}

export default App;

/*

-Para poder pasarle las citas al componente "Pacientes" lo tengo que convertir
en un arrow function y hacer 

<Route
  ....
  component = { () => <Pacientes citas={citas}/>}
/>


-Muy importante en el Route de Cita en render=  ..... es importante la posicion del arreglo cita[0]


*/

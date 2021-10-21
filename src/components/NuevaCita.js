import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import clienteAxios from "../config/axios";
import validacionFormulario from "../helpers/validacionFormulario";
import Swal from "sweetalert2";

const NuevaCita = (props) => {
  const [cita, guardarCita] = useState({
    nombre: "",
    propietario: "",
    fecha: "",
    hora: "",
    telefono: "",
    sintomas: "",
  });

  //Evento para leer los datos del formulario
  const actualizarState = (e) => {
    guardarCita({
      ...cita,
      [e.target.name]: e.target.value,
    });
  };

  //Enviar una petición a la rest API
  const crearNuevaCita = (e) => {
    e.preventDefault();

    //Validamos que no este vacío
    if (validacionFormulario(e)) {
      Swal.fire({
        title: "Todos los campos son obligatorios",
        text: "Completa todo el formulario por favor",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Entendido",
      });
      return;
    } else {
      //Enviar la petición por axios
      console.log(cita);
      clienteAxios.post("/pacientes", cita).then((respuesta) => {
        console.log(respuesta);

        props.guardarConsultar(true);
        //Redireccionar
        props.history.push("/");
      });
    }
  };

  return (
    <Fragment>
      <div className="bg-title nueva-cita">
        <h1 className="my-5">Crear nueva cita</h1>
      </div>

      <div className="container mt-5 py-5">
        <div className="row">
          <div className="col-12 mb-5 d-flex justify-content-center">
            <Link
              to={"/"}
              className="btn btn-success text-uppercase py-2 px-5 font-weight-bold"
            >
              Volver
            </Link>
          </div>
        </div>
      </div>

      <div className="col-md-8 mx-auto">
        <form onSubmit={crearNuevaCita} className="bg-white p-5 bordered">
          <div className="form-group">
            <label htmlFor="nombre">Nombre Mascota</label>
            <input
              type="text"
              className="form-control form-control-lg"
              id="nombre"
              name="nombre"
              placeholder="Nombre Mascota"
              onChange={actualizarState}
            />
          </div>

          <div className="form-group">
            <label htmlFor="propietario">Nombre Propietario</label>
            <input
              type="text"
              className="form-control form-control-lg"
              id="propietario"
              name="propietario"
              placeholder="Nombre Propietario"
              onChange={actualizarState}
            />
          </div>

          <div className="form-group">
            <label htmlFor="telefono">Teléfono</label>
            <input
              type="tel"
              className="form-control form-control-lg"
              id="telefono"
              name="telefono"
              placeholder="Teléfono"
              onChange={actualizarState}
            />
          </div>

          <div className="form-group">
            <label htmlFor="fecha">Fecha Alta</label>
            <input
              type="date"
              className="form-control form-control-lg"
              id="fecha"
              name="fecha"
              onChange={actualizarState}
            />
          </div>

          <div className="form-group">
            <label htmlFor="hora">Hora Alta</label>
            <input
              type="time"
              className="form-control form-control-lg"
              id="hora"
              name="hora"
              onChange={actualizarState}
            />
          </div>

          <div className="form-group">
            <label htmlFor="sintomas">Síntomas</label>
            <textarea
              className="form-control"
              name="sintomas"
              rows="6"
              onChange={actualizarState}
            ></textarea>
          </div>

          <input
            type="submit"
            className="btn btn-primary mt-3 w-100 p-3 text-uppercase font-weight-bold"
            value="Crear Cita"
          />
        </form>
      </div>
    </Fragment>
  );
};

export default withRouter(NuevaCita);

/*

-En vez de crear varios "useState" puedo crear un solo "useState" e inicializarlo con un objeto con los campos que tiene
la B.Datos, pero vacios.

- Al hacer :   ...cita,
              [e.target.name]:[e.target.value]
estamos agregando un nuevo valor, si no declaro "...cita", entonces lo sobreescribirá y nunca agregará por lo que siempre
habría solo 1 paciente.

*/

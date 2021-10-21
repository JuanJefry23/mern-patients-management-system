import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const SinPacientes = () => {
  return (
    <Fragment>
      <div className="bg-title sin-pacientes">
        <h1 className="my-5">Agrega la primera cita</h1>
      </div>

      <div className="container mt-5 py-5">
        <div className="row">
          <div className="col-12 mb-5 d-flex justify-content-center">
            <Link
              to={"/nueva"}
              className="btn btn-success text-uppercase py-2 px-5 font-weight-bold"
            >
              Crear Cita
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SinPacientes;

function validacionFormulario(e) {
  if (
    e.target.nombre.value === "" ||
    e.target.propietario.value === "" ||
    (e.target.telefono.value === "" &&
      typeof parseInt(e.target.telefono.value) !== "number") ||
    e.target.fecha.value === "" ||
    e.target.hora.value === "" ||
    e.target.sintomas.value === ""
  ) {
    console.log(typeof parseInt(e.target.telefono.value));
    console.log(e.target.telefono.value);
    console.log("Falta validar");
    console.log(typeof 10);
    return true;
  }
}

export default validacionFormulario;

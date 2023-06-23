import React, { useState, useEffect } from 'react';
import { BsFillPersonPlusFill, BsFillXCircleFill } from 'react-icons/bs';

function FormularioContacto({ agregarContacto }) {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');
  const [mensajeAlerta, setMensajeAlerta] = useState('');
  const [mensajeError, setMensajeError] = useState('');

  useEffect(() => {
    let timer;

    if (mensajeExito || mensajeAlerta || mensajeError) {
      timer = setTimeout(() => {
        setMensajeExito('');
        setMensajeAlerta('');
        setMensajeError('');
      }, 5000);
    }

    return () => clearTimeout(timer);
  }, [mensajeExito, mensajeAlerta, mensajeError]);

  const formatearNombre = (nombre) => {
    const palabras = nombre.split(' ');
    const palabrasFormateadas = palabras.map((palabra) => {
      const primeraLetra = palabra.charAt(0).toUpperCase();
      const restoPalabra = palabra.slice(1).toLowerCase();
      return `${primeraLetra}${restoPalabra}`;
    });
    return palabrasFormateadas.join(' ');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre || !correo || !telefono) {
      setMensajeAlerta('Por favor, completa todos los campos');
      setMensajeExito('');
      setMensajeError('');
      return;
    }

    const regexNombre = /^[a-zA-Z\s]+$/;
    if (!regexNombre.test(nombre)) {
      setMensajeError('El nombre solo puede contener letras y espacios');
      setMensajeExito('');
      setMensajeAlerta('');
      return;
    }

    const regexTelefono = /^[9][0-9]{8}$/;
    if (!regexTelefono.test(telefono)) {
      setMensajeError('El número de teléfono debe tener 9 dígitos, empezar con 9 y no puede contener letras');
      setMensajeExito('');
      setMensajeAlerta('');
      return;
    }

    const nombreFormateado = formatearNombre(nombre);

    agregarContacto({ nombre: nombreFormateado, correo, telefono });

    // Limpiar los campos del formulario
    setNombre('');
    setCorreo('');
    setTelefono('');

    setMensajeExito('Contacto agregado exitosamente');
    setMensajeAlerta('');
    setMensajeError('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '5px' }}>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        style={{ marginBottom: '5px' }}
      />
      <input
        type="email"
        placeholder="Correo electrónico"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        style={{ marginBottom: '5px' }}
      />
      <input
        type="tel"
        placeholder="Teléfono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
        style={{ marginBottom: '5px' }}
      />
      <button type="submit"><BsFillPersonPlusFill /> Agregar contacto </button>
      {mensajeExito && (
        <div className="alert alert-success mt-2">{mensajeExito}</div>
      )}
      {mensajeAlerta && (
        <div className="alert alert-warning mt-2">
          {mensajeAlerta}
          <button
            className="cerrar-alerta"
            onClick={() => setMensajeAlerta('')}
          >
            <BsFillXCircleFill />
          </button>
        </div>
      )}
      {mensajeError && (
        <div className="alert alert-danger mt-2">
          {mensajeError}
          <button
            className="cerrar-alerta"
            onClick={() => setMensajeError('')}
          >
            <BsFillXCircleFill />
          </button>
        </div>
      )}
    </form>
  );
}

export default FormularioContacto;

import React, { useState, useEffect } from 'react';
import ListaContactos from './Componentes/ListaContactos';
import FormularioContacto from './Componentes/FormularioContacto';
import { BsFillPersonLinesFill, BsFillXCircleFill } from 'react-icons/bs';
import './App.css';

function App() {
  const [contactos, setContactos] = useState([]);
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [resultadosBusqueda, setResultadosBusqueda] = useState([]);
  const [mensajeExito, setMensajeExito] = useState('');
  const [mensajeError, setMensajeError] = useState('');

  useEffect(() => {
    const contactosGuardados = localStorage.getItem('contactos');
    if (contactosGuardados) {
      const contactosParseados = JSON.parse(contactosGuardados);
      setContactos(contactosParseados);
      ordenarContactosAlfabeticamente(contactosParseados);
    }
  }, []);

  useEffect(() => {
    const contactosFiltrados = contactos.filter((contacto) => {
      const nombreCoincide = contacto.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase());
      const correoCoincide = contacto.correo.toLowerCase().includes(terminoBusqueda.toLowerCase());
      const telefonoCoincide = contacto.telefono.includes(terminoBusqueda);
      return nombreCoincide || correoCoincide || telefonoCoincide;
    });
    setResultadosBusqueda(contactosFiltrados);
  }, [contactos, terminoBusqueda]);

  const agregarContacto = (contacto) => {
    const { nombre, correo, telefono } = contacto;

    // Verificar datos
    if (!esNombreValido(nombre)) {
      mostrarMensajeError('El nombre debe contener solo letras.');
      return;
    }
    if (!esCorreoValido(correo)) {
      mostrarMensajeError('El correo electrónico no es válido.');
      return;
    }
    if (!esTelefonoValido(telefono)) {
      mostrarMensajeError('El número de teléfono debe contener 9 dígitos y comenzar con 9.');
      return;
    }

    const nuevoContacto = {
      nombre: capitalizarNombre(nombre.trim()),
      correo: correo.trim(),
      telefono: telefono.trim(),
      id: Date.now().toString(),
    };

    const contactosActualizados = [...contactos, nuevoContacto];
    setContactos(contactosActualizados);
    localStorage.setItem('contactos', JSON.stringify(contactosActualizados));
    ordenarContactosAlfabeticamente(contactosActualizados);

    mostrarMensajeExito('¡Contacto agregado correctamente!');
  };

  const eliminarContacto = (id) => {
    const contactosActualizados = contactos.filter((contacto) => contacto.id !== id);
    setContactos(contactosActualizados);
    localStorage.setItem('contactos', JSON.stringify(contactosActualizados));

    mostrarMensajeExito('¡Contacto eliminado correctamente!');
  };

  const editarContacto = (contactoEditado) => {
    // Verificar datos
    if (!esNombreValido(contactoEditado.nombre)) {
      mostrarMensajeError('El nombre debe contener solo letras.');
      return;
    }
    if (!esCorreoValido(contactoEditado.correo)) {
      mostrarMensajeError('El correo electrónico no es válido.');
      return;
    }
    if (!esTelefonoValido(contactoEditado.telefono)) {
      mostrarMensajeError('El número de teléfono debe contener 9 dígitos y comenzar con 9.');
      return;
    }

    const contactosActualizados = contactos.map((contacto) =>
      contacto.id === contactoEditado.id ? { ...contactoEditado, nombre: capitalizarNombre(contactoEditado.nombre.trim()) } : contacto
    );

    setContactos(contactosActualizados);
    localStorage.setItem('contactos', JSON.stringify(contactosActualizados));
    ordenarContactosAlfabeticamente(contactosActualizados);

    mostrarMensajeExito('¡Contacto editado correctamente!');
  };

  const ordenarContactosAlfabeticamente = (contactosActualizados) => {
    contactosActualizados.sort((a, b) => a.nombre.localeCompare(b.nombre));
  };

  const esNombreValido = (nombre) => {
    return /^[a-zA-Z\s]+$/.test(nombre);
  };

  const esCorreoValido = (correo) => {
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexCorreo.test(correo);
  };

  const esTelefonoValido = (telefono) => {
    return /^[9]\d{8}$/.test(telefono);
  };

  const capitalizarNombre = (nombre) => {
    return nombre
      .split(' ')
      .map((palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1))
      .join(' ');
  };

  const mostrarMensajeExito = (mensaje) => {
    setMensajeExito(mensaje);
    setMensajeError('');

    setTimeout(() => {
      setMensajeExito('');
    }, 5000);
  };

  const mostrarMensajeError = (mensaje) => {
    setMensajeError(mensaje);
    setMensajeExito('');

    setTimeout(() => {
      setMensajeError('');
    }, 5000);
  };

  return (
    <div className="container text-center">
      <h1 className="mt-4 mb-4">
        <BsFillPersonLinesFill /> Directorio de contactos
      </h1>
      <FormularioContacto agregarContacto={agregarContacto} />
      <input
        type="text"
        placeholder="Buscar contactos"
        value={terminoBusqueda}
        onChange={(e) => setTerminoBusqueda(e.target.value)}
        className="form-control mb-4"
        style={{ width: '200px', margin: '0 auto', textAlign: 'center' }}
      />
      <ListaContactos contactos={resultadosBusqueda} eliminarContacto={eliminarContacto} editarContacto={editarContacto} />
      {mensajeExito && (
        <div className="alert alert-success mt-4">
          {mensajeExito}
          <button className="close" onClick={() => setMensajeExito('')} aria-label="Close">
            <BsFillXCircleFill />
          </button>
        </div>
      )}
      {mensajeError && (
        <div className="alert alert-danger mt-4">
          {mensajeError}
          <button className="close" onClick={() => setMensajeError('')} aria-label="Close">
            <BsFillXCircleFill />
          </button>
        </div>
      )}
    </div>
  );
}

export default App;

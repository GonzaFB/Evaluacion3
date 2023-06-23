import React, { useState } from 'react';
import { BsFillPersonXFill } from 'react-icons/bs';
import { BsFillPencilFill } from 'react-icons/bs';
import { BsFillPersonCheckFill } from 'react-icons/bs';
import { BsFillPersonDashFill } from 'react-icons/bs';
import './ListaContactos.css';

function ListaContactos({ contactos, eliminarContacto, editarContacto }) {
  const [idContactoEditando, setIdContactoEditando] = useState(null);
  const [nombreEditado, setNombreEditado] = useState('');
  const [correoEditado, setCorreoEditado] = useState('');
  const [telefonoEditado, setTelefonoEditado] = useState('');

  const manejarEdicion = (contacto) => {
    setIdContactoEditando(contacto.id);
    setNombreEditado(contacto.nombre);
    setCorreoEditado(contacto.correo);
    setTelefonoEditado(contacto.telefono);
  };

  const guardarEdicion = (idContacto) => {
    const contactoEditado = {
      id: idContacto,
      nombre: nombreEditado,
      correo: correoEditado,
      telefono: telefonoEditado
    };
    editarContacto(contactoEditado);
    setIdContactoEditando(null);
  };

  const cancelarEdicion = () => {
    setIdContactoEditando(null);
    setNombreEditado('');
    setCorreoEditado('');
    setTelefonoEditado('');
  };

  return (
    <ul className="lista-contactos">
      {contactos.map((contacto) => (
        <li key={contacto.id} className="item-contacto">
          <div>
            {idContactoEditando === contacto.id ? (
              <>
                <input
                  type="text"
                  value={nombreEditado}
                  onChange={(e) => setNombreEditado(e.target.value)}
                />
                <input
                  type="email"
                  value={correoEditado}
                  onChange={(e) => setCorreoEditado(e.target.value)}
                />
                <input
                  type="tel"
                  value={telefonoEditado}
                  onChange={(e) => setTelefonoEditado(e.target.value)}
                />
                <button onClick={() => guardarEdicion(contacto.id)}>
                  <BsFillPersonCheckFill /> Guardar
                </button>
                <button onClick={cancelarEdicion}>
                  <BsFillPersonXFill /> Cancelar
                </button>
              </>
            ) : (
              <>
                <div className="info-contacto">
                  <span className="nombre-contacto">{contacto.nombre}</span>
                  <span className="correo-contacto">{contacto.correo}</span>
                  <span className="telefono-contacto">{contacto.telefono}</span>
                </div>
                <div className="acciones-contacto">
                  <button className="eliminar-contacto" onClick={() => eliminarContacto(contacto.id)}>
                    <BsFillPersonDashFill /> Eliminar
                  </button>
                  <button className="editar-contacto" onClick={() => manejarEdicion(contacto)}>
                    <BsFillPencilFill /> Editar
                  </button>
                </div>
              </>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ListaContactos;

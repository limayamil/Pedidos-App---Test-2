import React, { useState } from 'react';

const menuItems = [
  { id: 1, name: 'Hamburguesa', price: 10 },
  { id: 2, name: 'Pizza', price: 12 },
  { id: 3, name: 'Ensalada', price: 8 },
];

const MenuPedido = () => {
  const [pedido, setPedido] = useState([]);

  const agregarItem = (item) => {
    setPedido([...pedido, item]);
  };

  const eliminarItem = (index) => {
    const nuevoPedido = pedido.filter((_, i) => i !== index);
    setPedido(nuevoPedido);
  };

  const enviarPedido = async () => {
    const response = await fetch('/api/createOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items: pedido }),
    });

    if (response.ok) {
      alert('Pedido enviado con éxito!');
      setPedido([]);
    } else {
      alert('Error al enviar el pedido');
    }
  };

  return (
    <div>
      <h2>Menú</h2>
      {menuItems.map((item) => (
        <div key={item.id}>
          <span>{item.name} - ${item.price}</span>
          <button onClick={() => agregarItem(item)}>Agregar</button>
        </div>
      ))}

      <h2>Tu Pedido</h2>
      {pedido.map((item, index) => (
        <div key={index}>
          <span>{item.name} - ${item.price}</span>
          <button onClick={() => eliminarItem(index)}>Eliminar</button>
        </div>
      ))}

      <button onClick={enviarPedido}>Enviar Pedido</button>
    </div>
  );
};

export default MenuPedido;
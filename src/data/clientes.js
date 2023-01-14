const obtenerClientes = async () => {
  const url = import.meta.env.VITE_API_URL

  const respuesta = await fetch(url)
  const resultado = await respuesta.json()
  return resultado
}

const obtenerClienteById = async (id) => {
  const url = import.meta.env.VITE_API_URL

  const respuesta = await fetch(`${url}/${id}`)
  const resultado = await respuesta.json()
  return resultado
}

const agregarCliente = async (cliente) => {
  const url = import.meta.env.VITE_API_URL
  try {
    const respuesta = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(cliente),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    await respuesta.json()
  } catch (error) {
    console.log( error )
  }
}

const editarCliente = async (id, cliente) => {
  const url = import.meta.env.VITE_API_URL
  try {
    const respuesta = await fetch(`${url}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(cliente),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    await respuesta.json()
  } catch (error) {
    console.log( error )
  }
}

const eliminarCliente = async (id) => {
  const url = import.meta.env.VITE_API_URL
  try {
    const respuesta = await fetch(`${url}/${id}`, {
      method: 'DELETE',
    })
    await respuesta.json()
  } catch (error) {
    console.log( error )
  }
}

export {
  obtenerClientes,
  obtenerClienteById,
  agregarCliente,
  editarCliente,
  eliminarCliente
}
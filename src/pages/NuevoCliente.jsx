import { useNavigate, Form, useActionData, redirect } from 'react-router-dom'
import Formulario from '../components/Formulario'
import Error from '../components/Error'
import { agregarCliente } from '../data/clientes'

export const action = async ({ request }) => {
  // console.log( 'rerender' )
  // console.log( request )

  const formData = await request.formData()
  // console.log( ...formData )

  const datos = Object.fromEntries(formData)
  // console.log( datos )
  const email = formData.get('email')

  // Validacion
  const errores = []
  // console.log( Object.values(datos)
  if(Object.values(datos).includes('')) {
    errores.push('Todos los campos son Obligatorios')
  }

  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])")
  if(!regex.test(email)) {
    errores.push('E-Mail no es valido')
  }

  // Retornar errores si hay algo en el Arreglo
  if(Object.keys(errores).length) {
    return errores
  }

  await agregarCliente(datos)

  // return { ok: true }
  return redirect('/')
}

const NuevoCliente = () => {

  const errores = useActionData()
  const navigate = useNavigate()
  // console.log( 'rerender componente' )
  
  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>Nuevo Cliente</h1>
      <p className='mt-3'>Llena todos los campos para registrar un nuevo cliente</p>

      <div className='flex justify-end'>
        <button
          type='button'
          className='bg-blue-800 text-white px-3 py-1 font-bold uppercase'
          onClick={() => navigate('/')}
          // onClick={() => navigate(-1)}
        >
          Volver
        </button>
      </div>

      <div className='bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20'>

        {errores?.length && errores.map((error, i) => 
          <Error
            key={i}
          >
            {error}
          </Error>
        )}

        <Form
          method='POST'
          noValidate
        >
          <Formulario />
          <input 
            type="submit" 
            value="Registrar Cliente" 
            className='mt-5 w-full bg-blue-800 uppercase font-bold text-white text-lg'  
          />
        </Form>
      </div>
    </>
  )
}

export default NuevoCliente
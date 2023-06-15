/**
 * Iniciar el servidor
 */

import app from './app'

const puerto = 3001

app.listen(
    puerto,
    ()=>{
        console.log(`El servidor se está ejecutando en el puerto ${puerto}`)
    }
)
/**
 * Archivo principal del microservicio de Cstálogo
 * @author Maidy Cabrera <maidyc914@gmail.com>
 */

import express, { Application, NextFunction, Request, Response } from 'express';
import catalogoRoutes from './routes/catalogoRoutes';

const app: Application = express();
app.use(express.json());

/**
 * Agregar un conjunto de rutas al stack
 */
app.use('/', catalogoRoutes);


/**
 * Respuesta cuando la ruta no existe
 */
app.use(
  (req: Request, res: Response, next: NextFunction) => {
    res.status(404);
    res.json({ message: "Oops. El recurso no existe" });
  }
);

/**
 * Respuesta cuando existe un error del servidor
 */
app.use(
  (error: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500);
    console.log(error);
    res.json({ message: "Houston, tenemos un problema!" });
  }
);

export default app;

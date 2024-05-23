import * as z from 'zod';


export const schemaAuth = z.object({
    email: z.string()
    .email("Email invalido")
    .min(3, 'El nombre de usuario debe tener al menos 3 caracteres')
    .max(20, 'El nombre de usuario debe tener como máximo 20 caracteres')
    .nonempty('El nombre de usuario es obligatorio'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres').nonempty('La contraseña es obligatoria'),
  });
  
  
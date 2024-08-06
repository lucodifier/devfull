import { FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { authRepository } from '../repositories/authRepository';


export async function login(request: FastifyRequest, reply: FastifyReply) {

  const loginBodySchema = z.object({
    email: z.string(),
    password: z.string()
  });

  const { email, password } = loginBodySchema.parse(request.body);

  try {

    const user = await authRepository.findUserByEmail(email);

    if (!user) {
      return reply.status(401).send({ message: 'Credenciais inválidas' });
    }

    const isValid = password == user.password;
    if (!isValid) {
      return reply.status(401).send({ message: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    return reply.send({ message: 'Autenticado', token });
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: 'Erro ocorrido na autenticação' });
  }
}
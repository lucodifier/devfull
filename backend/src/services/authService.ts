import { FastifyRequest, FastifyReply } from 'fastify';
import jwt from 'jsonwebtoken';

interface IUserPayload {
  id: string;
  role: string;
}

declare module 'fastify' {
  interface FastifyRequest {
    user?: IUserPayload;
  }
}

export async function verifyJWT(req: FastifyRequest, reply: FastifyReply) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      reply.status(401).send({ message: 'Token não fornecido' });
      throw new Error('Token não fornecido');
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as IUserPayload;
    req.user = decoded;
  } catch (error: any) {
    reply.status(401).send({ message: 'Token inválido ou expirado' });
    throw error;
  }
}

import fastify from 'fastify'
import fastifyCors from '@fastify/cors';

import authRoutes from './routes/authRoutes';
import movieRoutes from './routes/movieRoutes';
import rentRoutes from './routes/rentRoutes';

const app = fastify()

app.register(fastifyCors, {
  origin: '*',
  methods: ['GET', 'POST'],
});

app.register(authRoutes, { prefix: '/api' });
app.register(movieRoutes, { prefix: '/api' });
app.register(rentRoutes, { prefix: '/api' });


export default app;
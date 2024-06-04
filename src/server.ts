import fastify from 'fastify'
import problemRoutes from './routes/problemRoutes'
import userRoutes from './routes/userRoutes';
const dbconnector = require('./db')

const server = fastify()

server.register(dbconnector);
server.register(problemRoutes);
server.register(userRoutes);

server.listen(8080, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`)
})
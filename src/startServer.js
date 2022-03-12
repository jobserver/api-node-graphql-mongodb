import {ApolloServer} from 'apollo-server';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()

async function startServer({typeDefs, resolvers}) { 
      
    const conexao = process.env.DB_MONGODB_CONEXAO;

    //Conecta ao MOngoDB
    mongoose.connect(conexao,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    });

    mongoose.connection.once('open', function(){
        console.log('Conection has been made!');
      }).on('error', function(error){
          console.log('Error is: ', error);
      });


    //Inicia o Apollo Server
    const server = new ApolloServer({typeDefs, resolvers});
    server.listen()
    .then(({url}) => console.log(`Server started at ${url}`))
    .catch((error)=> console.log(`error: ${error}`));
}

export default startServer;
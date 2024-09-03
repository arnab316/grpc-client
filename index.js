const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

//* Import proto file

const PROTO_PATH = ('./todo.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  
});
const todoProto = grpc.loadPackageDefinition(packageDefinition);

const todoService = todoProto.TodoService;

const client = new todoService('localhost:50051', grpc.credentials.createInsecure());

client.listTodos({}, (err, todos)=>{
    if(!err) console.log(todos);

    /* client.CreateTodo({id: 4, title: 'client', content:'client content',}, (err, todo)=>{
        if(!err) {
            console.log('Created Todo'); 
        }else{
            console.log(err)
        }

    })*/
});


// //* getTodos
// client.getTodo({id: 1}, (err, todos)=>{
//     if(err) console.log(err);
//     console.log(todos)
// })
const app = require("./src/app");
const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
  console.log(`WSV eCommerce start with http://localhost:${PORT}`);
});

// khi aans Ctrl + C
// process.on('SIGINT', ()=> {
//     server.close(()=> console.log('Exit Server'))
// });

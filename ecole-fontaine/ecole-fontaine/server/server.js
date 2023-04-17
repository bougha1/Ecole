import express from 'express';
import cors from 'cors';
import  router  from './routes/router.js';



const app = express();
const PORT = 9000;

app.use(cors());
app.use(express.json());

app.use(express.static('public'));



app.use("/",router);

app.listen(PORT, () => {
  console.log(`Server started on port http://localhost:${PORT}`);
});



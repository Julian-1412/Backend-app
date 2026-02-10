import express from 'express';
import mongoose from 'mongoose';


const app = express();
app.use(express.json());
const userSchema= new mongoose.Schema(
    {
        name: String,
        lastname: String,
        identification: Number,
        email: String,
        age: Number

    },{versionKey:false})

    const user= mongoose.model('user', userSchema, 'users');

    const dbname= "test"
    

const mongoUri = `mongodb+srv://julianseg1412_db_user:prueba123456@julian.bqkyjeu.mongodb.net/${dbname}?retryWrites=true&w=majority`;
mongoose.connect(mongoUri)
    .then(() => console.log(" Conexión exitosa a MongoDB"))
    .catch(err => console.error(" Error:", err));
    
    
    app.get('/user', async (req, res) => {
        try {
            const users = await user.find();
            res.json(users);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    })
    app.post('/user', async (req, res) => {
        try {
            const newUser = new user(req.body);
            const savedUser = await newUser.save();
            res.status(201).json(savedUser);

        }catch (err) {
            res.status(400).json({ message: err.message });
        }
    })

    app.put('/user/:id', async (req, res) =>{
        try {
            const updatedUser = await user.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );
        
        if (!updatedUser) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.json(updatedUser);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    })
    
    app.delete('/user/:id', async (req, res) => {
        try {
            const deletedUser = await user.findByIdAndDelete(req.params.id);
            if (!deletedUser) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }
            res.json({ message: "Usuario eliminado" });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    })

    app.listen(3000, () => {
    console.log(" Servidor corriendo en http://localhost:3000")});

    //adding a new line to test the commit and push process
    //adding another line to test the commit and push process in the feature new/space
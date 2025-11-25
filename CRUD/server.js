import express from 'express';
import cors from 'cors';
import {PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()


const app = express()

app.use(cors())
app.use(express.json())
    
 
app.post('/usuarios', async (req, res) => {
    try{
        await prisma.user.create({
        data:{
            email: req.body.email,
            name: req.body.name,
            age: req.body.age

        }
    })
    res.status(201).json(req.body)
} catch(err){
    console.error(err);
    res.status(500).json({error: "Erro ao criar usuário"})
}})


app.get('/usuarios', async (req, res)=>{

    try{
        const users = await prisma.user.findMany()

        res.status(200).json(users)
    } catch(err){
        console.error(err)
        res.status(500).json({error: "Erro ao listar usuários"})
    }
    
}) 

app.put('/usuarios/:id', async (req, res) => {
    try{
        await prisma.user.update({
            where:{
                id: req.params.id
            },
        data:{
            email: req.body.email,
            name: req.body.name,
            age: req.body.age

        }
    })
    res.status(200).json(req.body)
} catch(err){
    console.error(err);
    res.status(500).json({error: "Erro ao editar usuário"})
}})

app.delete('/usuarios/:id', async(req,res) =>{
    try{
    await prisma.user.delete({
        where:{
            id :req.params.id,
        },
    })
    res.status(200).json(req.body)
    } catch(err){
        console.error(err)
        res.status(500).json({error: "Erro ao deletar usuário"})
    }




})

app.listen(3000)

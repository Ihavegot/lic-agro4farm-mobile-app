import { PrismaClient } from "@prisma/client"
import NextCors from 'nextjs-cors'

const prisma = new PrismaClient()

export default async function handle(req, res) {
    await NextCors(req, res, {
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200,
     })
    res.status(200).json({data: 'SOR Database API made for bachelor degree'})
}
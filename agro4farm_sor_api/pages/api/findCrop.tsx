import { PrismaClient } from "@prisma/client"
import NextCors from 'nextjs-cors'
import { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient()

export default async function handle(req: NextApiRequest, res: NextApiResponse) {

    let {
        query: {name},
        method,
    } = req

    if(name.length < 3){
        name = "abcdefghijklmnoprstuwyz"
    }

    await NextCors(req, res, {
        methods: ['GET'],
        origin: '*',
        optionsSuccessStatus: 200,
    })

    const posts = await prisma.sor.findMany({
        where: {
            uprawa: {
                contains: name as string,
                mode: 'insensitive'
            }
        },
    })

    res.status(200).json(posts)
}
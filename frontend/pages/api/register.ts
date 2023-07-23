import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password, role } = req.body

  // Hash the password with a salt
  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      email: email,
      password: hashedPassword,
      role: role, // Assign role
    },
  })

  res.json(user)
}

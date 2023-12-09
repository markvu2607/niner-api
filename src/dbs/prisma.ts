import { PrismaClient } from "@prisma/client"
import config from "../configs/config"

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

export default prisma

if (config.environment !== "production") globalThis.prisma = prisma

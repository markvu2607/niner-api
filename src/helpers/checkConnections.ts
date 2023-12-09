import prisma from "../dbs/prisma"

const checkConnections = async () => {
  try {
    await prisma.$connect()
    console.log("Prisma connected to the database!")
  } catch (error) {
    console.error("Error connecting to the database:", error)
  }
}

export default checkConnections

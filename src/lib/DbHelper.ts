import prisma from "prisma"

export const connectToDatabase = async () => {
  try {
    // Check if the Prisma client is connected
    await prisma.$connect();
    console.log("Connected to the database successfully.");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error; // Re-throw the error for further handling
  }
}
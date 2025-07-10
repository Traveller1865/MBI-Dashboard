import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import {connectToDatabase} from '@/lib/DbHelper';
//const { PrismaClient } = require('@prisma/client');
import {PrismaClient} from 'generated/prisma';

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const {email, password, sex, age, firstname, lastname } = body;

    // Validate input
    if (!sex || !email || !password || !firstname || !lastname || !age) {
      return new NextResponse(JSON.stringify({ error: 'All fields are required' }), { status: 400 });
    }
    const hashedpassword = await bcrypt.hash(password, 10); // In a real application, make sure to hash the password before storing it
    // Import Prisma client
    await connectToDatabase(); // Ensure the database connection is established
    const prisma = new PrismaClient();

    // Create user in the database
    const user = await prisma.user.create({
      data: {
        email,
        sex,
        age,
        firstName: firstname,
        lastName: lastname,
        hashedPassword: hashedpassword, 
      },
    });

    return new NextResponse(JSON.stringify(user), { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return new NextResponse(JSON.stringify({ error: 'Registration failed' }), { status: 500 });
  }finally {
    // Ensure the Prisma Client disconnects from the database when the function exits
    const prisma = new PrismaClient();
    await prisma.$disconnect();
  }
}
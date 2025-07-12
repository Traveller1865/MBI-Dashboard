import * as mongoDB from 'mongodb';
import { updateHealthData, getHealthData } from '../../../src/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';

export const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017";
export const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || "healthData"; 

export const collections: {healthData?: mongoDB.Collection} = {};

export async function connectToDatabase() {
  if (collections.healthData) {
    return collections.healthData;
  }

  const client = new mongoDB.MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db(MONGODB_DB_NAME);
  
  collections.healthData = db.collection("healthData");
  
  return collections.healthData;
}

// PATCH /api/Mongodb?id=<id>
export async function PATCH(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 });
    }
    const data = await req.json();
    const updated = await updateHealthData(id, data);
    if (updated) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Document not found or not updated' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update health data', details: String(error) }, { status: 500 });
  }
}

// GET /api/Mongodb
export async function GET() {
  try {
    const data = await getHealthData();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch health data', details: String(error) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
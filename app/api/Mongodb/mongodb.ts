import { MongoClient, Db, Collection, ObjectId } from 'mongodb';

// Define your document types
export interface HealthData {
                 name: string, 
                 sleepScore: number, 
                 sleepDduration: string,
                 hrv: number,
                 restingHR: number,
                 hydration: { current: number, goal: number },
                 vitaminD: number,
                 stepStreak: number,
                 meditationDays: number,
                 ldl: number,
                 hdl: number, 
                 createdAt: Date,
                 id?: ObjectId;
}

// MongoDB URI and DB name from environment variables
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = process.env.MONGODB_DB_NAME || 'healthData';

// Singleton pattern for MongoClient
let client: MongoClient | null = null;
let db: Db | null = null;

export async function connectToDatabase(): Promise<Db> {
  if (db) return db;
  try {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db(dbName);
    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

// Graceful shutdown
if (typeof process !== 'undefined' && process.on) {
  process.on('SIGINT', async () => {
    if (client) {
      await client.close();
      console.log('MongoDB connection closed on app termination');
      process.exit(0);
    }
  });
}

// Example: getHealthData function
export async function getHealthData(): Promise<HealthData[]> {
  const database = await connectToDatabase();
  const HealthData: Collection<HealthData> = database.collection('users');
  return HealthData.find({}).toArray();
}

// Update an existing health data document by id
export async function updateHealthData(id: string | ObjectId, data: Partial<HealthData>): Promise<boolean> {
  const database = await connectToDatabase();
  const healthDataCollection: Collection<HealthData> = database.collection('users');
  try {
    const result = await healthDataCollection.updateOne(
      { _id: typeof id === 'string' ? new ObjectId(id) : id },
      { $set: data }
    );
    return result.modifiedCount > 0;
  } catch (error) {
    console.error('Error updating health data:', error);
    throw error;
  }
}

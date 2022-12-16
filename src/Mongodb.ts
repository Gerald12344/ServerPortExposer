import { MongoClient } from 'mongodb';

let MongoPromise: MongoClient = null;

export default function StartMongoDb() {
    return new Promise(async (resolve) => {
        let client = new MongoClient(process.env.MONGO_URI);
        MongoPromise = await client.connect();
        resolve(0);
    });
}

export function Wait() {
    return new Promise((resolve) => {
        let interval = setInterval(() => {
            if (MongoPromise !== null) {
                clearInterval(interval);
                resolve(0);
            }
        }, 1000);
    });
}

export async function FetchMongo() {
    if (MongoPromise === null) {
        await Wait();
    }
    return MongoPromise;
}

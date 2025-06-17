import {ObjectId} from 'mongodb';


export default class HealthData {
    constructor(public name: string, 
                public sleepScore: number, 
                public sleepDduration: string,
                public hrv: number,
                public restingHR: number,
                public hydration: { current: number, goal: number },
                public vitaminD: number,
                public stepStreak: number,
                public meditationDays: number,
                public ldl: number,
                public hdl: number, 
                public createdAt: Date = new Date(),
                public id?: ObjectId) {}
}
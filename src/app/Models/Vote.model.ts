export class MarkModel {
    mark:number
    expertName: string
}

export class Vote {
    name: string  
    marks: MarkModel[]
    totalVLow: number
    totalLow: number
    totalDefault: number
    totalHigh: number
    totalVHigh: number
    totalUnvoted: number
    totalMark:number 
}


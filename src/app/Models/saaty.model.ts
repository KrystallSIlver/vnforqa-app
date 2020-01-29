import { Alternative } from "./alternative.model"

export class Saaty {
    alternatives:Alternative[] = []
    comparedAlts:number[] = [,]
    sqrt:number[] = []
    sqrtSum:number = 0
    normalizedSqrts:Alternative[] = []
    rows: Row[] = []
}

export class Row {
    name: string
    marks: number[]
    ei: number
    omega: number
}

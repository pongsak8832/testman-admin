# Database Firestore

## question-HD
- id : string
- clientRef : string
- testName : string
- questionQTY : number 
- testingTime : number 
- numberOfChoice : string
- choiceFormat : string
- isReview : string
- score : string
- testInstructions : string
- clientNote : string
- status: string `draft , published, unpublished`
- tested: number จำนวนคนที่ทำข้อสอบนี้ไปแล้วกี่คน

## question-DT
- id: string
- headerId: string
- question: string
- option1: string
- option2: string
- option3: string
- option4: string
- option5: string
- isCorrect: boolean
- isLastChoice: boolean
- score: number
- status: string

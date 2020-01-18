export class QuestionHDModel {
  id: string;
  organizationId: string;
  clientRef: string;
  testName: string;
  questionQTY: number;
  testingTime: number;
  numberOfChoice: number;
  choiceFormat: string;
  isReview: string;
  score: string;
  testInstructions: string;
  clientNote: string;
  status: string;
  tested: number;

  constructor(params: QuestionHDModel) {
    Object.assign(this as QuestionHDModel, params);
  }

  static empty() {
    return new QuestionHDModel({
      id: '',
      organizationId: '',
      clientRef: '',
      testName: '',
      questionQTY: null,
      testingTime: null,
      numberOfChoice: 2,
      choiceFormat: '',
      isReview: '',
      score: '',
      testInstructions: '',
      clientNote: '',
      status: 'draft',
      tested: 0
    });
  }

}

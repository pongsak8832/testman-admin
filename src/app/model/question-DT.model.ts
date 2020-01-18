export class QuestionDTModel {
  id: string;
  headerId: string;
  question: string;
  option1: string;
  isCorrect1: boolean;
  isLastChoice1: boolean;
  option2: string;
  isCorrect2: boolean;
  isLastChoice2: boolean;
  option3: string;
  isCorrect3: boolean;
  isLastChoice3: boolean;
  option4: string;
  isCorrect4: boolean;
  isLastChoice4: boolean;
  option5: string;
  isCorrect5: boolean;
  isLastChoice5: boolean;
  score: number;
  status: string;

  constructor(params: QuestionDTModel) {
    Object.assign(this as QuestionDTModel, params);
  }

  static empty() {
    return new QuestionDTModel({
      id: '',
      headerId: '',
      question: '',
      option1: '',
      isCorrect1: false,
      isLastChoice1: false,
      option2: '',
      isCorrect2: false,
      isLastChoice2: false,
      option3: '',
      isCorrect3: false,
      isLastChoice3: false,
      option4: '',
      isCorrect4: false,
      isLastChoice4: false,
      option5: '',
      isCorrect5: false,
      isLastChoice5: false,
      score: 1,
      status: 'active',
    });
  }

}

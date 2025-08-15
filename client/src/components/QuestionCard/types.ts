type Option = {
  id: string;
  label: string;
  text: string;
};

type QuestionCardProps = {
  question: string;
  options: Option[];
  selectedOptionId?: string;
  onSelect: (optionId: string) => void;
  questionIndex: number;
  totalQuestions: number;
};

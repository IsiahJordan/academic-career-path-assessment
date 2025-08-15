import TestCard from '@/components/TestCard'
import { useFetchUserData } from "@/hooks/useFetchUserData";

function TestPage(){
  const { userData, isLoading, error } = useFetchUserData();
  console.log(userData);

  return (
    <div>
      <div id="test-header">
        <h1 id="test-title">Examination</h1>
        <hr id="test-bar"/>
      </div>
      <div id="test-page">
        <TestCard
          testId="prod"
          title="2024"
          content="Math, Physics"
        />
        <TestCard
          testId="prod"
          title="2024"
          content="Math, Physics"
        />
        <TestCard
          testId="prod"
          title="2024"
          content="Math, Physics"
        />
        <TestCard
          testId="prod"
          title="2024"
          content="Math, Physics"
        />
        <TestCard
          testId="prod"
          title="2024"
          content="Math, Physics"
        />
        <TestCard
          testId="prod"
          title="2024"
          content="Math, Physics"
        />
        <TestCard
          testId="prod"
          title="2024"
          content="Math, Physics"
        />
      </div>
    </div>
  );
}

export default TestPage

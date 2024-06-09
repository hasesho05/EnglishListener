import data from '../../data/data.json'
import QuestionSection from './QuestionSection'

interface QuestionDetailProps {
  params: {
    id: string
  }
}

const QuestionDetail = async ({ params }: QuestionDetailProps) => {
  const questionId = Number(params.id)
  const question = data.questions.find((q) => q.id === questionId)
  const choices = data.choices.filter((c) => c.question_id === questionId)

  if (!question) {
    return <div>Question not found</div>
  }

  return (
    <div className="w-full flex flex-col items-center ">
      <QuestionSection question={question} choices={choices} />
    </div>
  )
}

export async function generateStaticParams() {
  return data.questions.map((question) => ({
    id: question.id.toString(),
  }))
}

export default QuestionDetail

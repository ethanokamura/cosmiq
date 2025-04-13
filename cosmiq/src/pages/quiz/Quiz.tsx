import { Link, useParams } from "react-router-dom";
import { readTextFile, BaseDirectory, stat } from '@tauri-apps/plugin-fs';
import { useEffect, useState } from "react";
import Starfield from "@/components/starfield";

type Quiz = {
  quiz_title: string;
  questions: Question[];
};

type Question = {
  question: string;
  options: string[];
  answer: number;
  reason: string;
};

export default function Quiz() {
  const { slug } = useParams();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showReasons, setShowReasons] = useState<Record<number, boolean>>({});

  console.log(`slug passed to quiz: ${slug}`)

  useEffect(() => {
    const loadFile = async () => {
      if (!slug) return;

      const path = `${import.meta.env.VITE_APP_DIRECTORY}/quizzes/${slug}.json`;

      try {
        const fileInfo = await stat(path, {
          baseDir: BaseDirectory.Document,
        });

        if (!fileInfo.isFile) {
          console.error(`${path} is not a file`);
          return;
        }

        const jsonString = await readTextFile(path, {
          baseDir: BaseDirectory.Document,
        });

        setQuiz(JSON.parse(jsonString));
      } catch (error) {
        console.error("Failed to read file:", error);
      }
    };

    loadFile();
  }, [slug]);


  const handleAnswer = (qIndex: number, optionIndex: number) => {
    if (!quiz) return;
    const isCorrect = quiz.questions[qIndex].answer === optionIndex;
    setSelectedAnswers(prev => ({ ...prev, [qIndex]: optionIndex }));

    if (isCorrect) {
      setShowReasons(prev => ({ ...prev, [qIndex]: true }));
    }
  };

  return (
    <main>
      <Link to={"/"} className="fixed left-10 top-5 shadow-2xl z-20">
        <button className="ring-accent ring-2 bg-background text-text">Home</button>
      </Link>
      <Starfield/>
      {quiz ? (
        <div className="flex flex-col items-center gap-10">
          <h1 className="border-b-2 border-text2 pb-2">{quiz.quiz_title != "" ? quiz.quiz_title : "Quiz"}</h1>
          {quiz.questions.map((q, qIndex) => (
            <div className="card py-4 w-full">
              <div key={qIndex}>
                <h3 className="font-medium mb-2">{q.question}</h3>
                <ul className="space-y-4">
                  {q.options.map((option, oIndex) => (
                    <li key={oIndex}>
                      <button
                        onClick={() => handleAnswer(qIndex, oIndex)}
                        className={`text-base my-0 w-full text-left ${
                          selectedAnswers[qIndex] === oIndex
                            ? q.answer === oIndex
                              ? "bg-green-300 text-background"
                              : "bg-destructive text-background"
                            : "bg-background/40 hover:bg-background text-text"
                        }`}
                      >
                        {option}
                      </button>
                    </li>
                  ))}
                </ul>
                {showReasons[qIndex] && (
                  <p className="mt-4 text-sm text-green-300 p-2 rounded">
                    ✅ {q.reason}
                  </p>
                )}
              </div>
            </div> 
          ))}
        </div>
      ) : (
        <h1>Unknown Quiz</h1>
      )}
    </main>
  );
}

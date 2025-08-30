import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useParams } from "wouter";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  subject: string;
}

interface TestResult {
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  score: number;
  subjectWise: {
    [key: string]: {
      correct: number;
      incorrect: number;
      percentage: number;
    };
  };
}

export default function TestInterface() {
  const params = useParams();
  const testId = params.id;
  
  const [user] = useState({
    name: "John Doe",
    role: "Student"
  });

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({});
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const [isTestComplete, setIsTestComplete] = useState(false);
  const [testResult, setTestResult] = useState<TestResult | null>(null);

  // Sample questions - 20 questions from your provided data
  const questions: Question[] = [
    {
      id: 1,
      question: "Which of the following is NOT a part of MERN stack?",
      options: ["MongoDB", "Express.js", "React.js", "Django"],
      correctAnswer: 3,
      subject: "Coding"
    },
    {
      id: 2,
      question: "What type of database is MongoDB?",
      options: ["Relational Database", "Document-Oriented NoSQL Database", "Graph Database", "Key-Value Store"],
      correctAnswer: 1,
      subject: "Coding"
    },
    {
      id: 3,
      question: "What is the output of 2 + '2' in JavaScript?",
      options: ["4", "22", "NaN", "Error"],
      correctAnswer: 1,
      subject: "Aptitude"
    },
    {
      id: 4,
      question: "Express.js is mainly used for?",
      options: ["Frontend UI", "Styling the app", "Backend server and routing", "Database operations"],
      correctAnswer: 2,
      subject: "Aptitude"
    },
    {
      id: 5,
      question: "Which of the following is true about Node.js?",
      options: ["It is a frontend framework", "It runs JavaScript on the server", "It can only be used with databases", "It is a programming language"],
      correctAnswer: 1,
      subject: "Aptitude"
    },
    {
      id: 6,
      question: "If A = 1, B = 2, C = 3, what is the value of ABC?",
      options: ["6", "123", "321", "111"],
      correctAnswer: 0,
      subject: "Reasoning"
    },
    {
      id: 7,
      question: "Which method is used in React to manage component state?",
      options: ["setValue()", "setState() / useState()", "updateState()", "stateChange()"],
      correctAnswer: 1,
      subject: "Reasoning"
    },
    {
      id: 8,
      question: "What does REST API stand for?",
      options: ["Representational State Transfer", "Real-time Express Service Tool", "Remote Express Server Transfer", "Reliable State Transfer"],
      correctAnswer: 0,
      subject: "Reasoning"
    },
    {
      id: 9,
      question: "Find the next number in sequence: 2, 4, 8, 16, ?",
      options: ["24", "32", "20", "18"],
      correctAnswer: 1,
      subject: "Reasoning"
    },
    {
      id: 10,
      question: "Which of the following is used for routing in React?",
      options: ["Express Router", "React Router", "Node Router", "Redux Router"],
      correctAnswer: 1,
      subject: "Reasoning"
    },
    {
      id: 11,
      question: "Choose the correctly spelled word:",
      options: ["Accomodate", "Accommodate", "Acomodate", "Acommodate"],
      correctAnswer: 1,
      subject: "English"
    },
    {
      id: 12,
      question: "Which of these is used for global state management in React?",
      options: ["Redux", "Node.js", "Express.js", "MongoDB"],
      correctAnswer: 0,
      subject: "English"
    },
    {
      id: 13,
      question: "What is the synonym of 'Abundant'?",
      options: ["Scarce", "Plentiful", "Limited", "Rare"],
      correctAnswer: 1,
      subject: "English"
    },
    {
      id: 14,
      question: "Which hook is used to perform side effects in React?",
      options: ["useState()", "useEffect()", "useReducer()", "useRef()"],
      correctAnswer: 1,
      subject: "English"
    },
    {
      id: 15,
      question: "What does npm stand for?",
      options: ["Node Package Manager", "New Project Manager", "Node Program Module", "Network Package Manager"],
      correctAnswer: 0,
      subject: "English"
    },
    {
      id: 16,
      question: "Which of these is used for schema definition in MongoDB with Node.js?",
      options: ["Express", "Mongoose", "Redux", "Axios"],
      correctAnswer: 1,
      subject: "English"
    },
    {
      id: 17,
      question: "If 5x + 3 = 18, what is the value of x?",
      options: ["2", "3", "4", "5"],
      correctAnswer: 1,
      subject: "Aptitude"
    },
    {
      id: 18,
      question: "In Express.js, app.use(express.json()) is used for?",
      options: ["Parsing incoming JSON requests", "Connecting to MongoDB", "Running React frontend", "Handling authentication"],
      correctAnswer: 0,
      subject: "Aptitude"
    },
    {
      id: 19,
      question: "Which of these is used for making API calls in React?",
      options: ["Redux", "Axios / fetch()", "Express.js", "Mongoose"],
      correctAnswer: 1,
      subject: "Aptitude"
    },
    {
      id: 20,
      question: "In React, keys used in lists help in?",
      options: ["Styling the components", "Identifying elements uniquely for re-rendering", "Creating database IDs", "Passing props"],
      correctAnswer: 1,
      subject: "Aptitude"
    }
  ];

  const testTitle = testId === "1" ? "Aptitude Test" : "Mock Test";

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleFinishExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const calculateResults = (): TestResult => {
    let correctAnswers = 0;
    const subjectWise: {[key: string]: {correct: number; incorrect: number; percentage: number}} = {};

    questions.forEach((question) => {
      const userAnswer = selectedAnswers[question.id];
      const isCorrect = userAnswer === question.correctAnswer;
      
      if (isCorrect) correctAnswers++;

      if (!subjectWise[question.subject]) {
        subjectWise[question.subject] = { correct: 0, incorrect: 0, percentage: 0 };
      }

      if (isCorrect) {
        subjectWise[question.subject].correct++;
      } else {
        subjectWise[question.subject].incorrect++;
      }
    });

    // Calculate percentages
    Object.keys(subjectWise).forEach(subject => {
      const total = subjectWise[subject].correct + subjectWise[subject].incorrect;
      subjectWise[subject].percentage = total > 0 ? Math.round((subjectWise[subject].correct / total) * 100) : 0;
    });

    const wrongAnswers = questions.length - correctAnswers;
    const score = Math.round((correctAnswers / questions.length) * 100);

    return {
      totalQuestions: questions.length,
      correctAnswers,
      wrongAnswers,
      score,
      subjectWise
    };
  };

  const handleFinishExam = () => {
    const result = calculateResults();
    setTestResult(result);
    setIsTestComplete(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleQuestionNavigation = (questionIndex: number) => {
    setCurrentQuestion(questionIndex);
  };

  const getQuestionStatus = (questionIndex: number) => {
    const questionId = questions[questionIndex].id;
    if (selectedAnswers[questionId] !== undefined) {
      return "answered"; // Green
    }
    if (questionIndex === currentQuestion) {
      return "current"; // Blue
    }
    return "unanswered"; // Gray
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "answered":
        return "bg-green-500 text-white";
      case "current":
        return "bg-blue-500 text-white";
      default:
        return "bg-gray-300 text-gray-700";
    }
  };

  const handleLogout = () => {
    window.location.href = "/";
  };

  if (isTestComplete && testResult) {
    return (
      <div className="min-h-screen bg-background">
        {/* Navigation Bar */}
        <nav className="bg-primary text-primary-foreground p-4 rounded-lg m-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <h1 className="text-xl font-bold" data-testid="nav-title">🏠 Placement Tracker Portal</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-primary-foreground hover:bg-primary/80" data-testid="nav-profile">
                Profile 👤
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary-foreground text-primary text-sm font-medium">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium" data-testid="nav-username">{user.name}</span>
            </div>
          </div>
        </nav>

        {/* Test Results */}
        <div className="px-4 pb-8">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-xl text-orange-600" data-testid="result-title">
                <span>✅</span>
                <span>Mock Test Result</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Score Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-green-100 border-green-300">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600" data-testid="total-score">
                      {testResult.score}%
                    </div>
                    <div className="text-sm text-green-700">Total Score</div>
                  </CardContent>
                </Card>
                <Card className="bg-blue-100 border-blue-300">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600" data-testid="correct-answers">
                      {testResult.correctAnswers}/{testResult.totalQuestions}
                    </div>
                    <div className="text-sm text-blue-700">Correct Answers</div>
                  </CardContent>
                </Card>
                <Card className="bg-red-100 border-red-300">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-red-600" data-testid="wrong-answers">
                      {testResult.wrongAnswers}
                    </div>
                    <div className="text-sm text-red-700">Wrong Answers</div>
                  </CardContent>
                </Card>
              </div>

              {/* Subject-wise Performance */}
              <div>
                <h3 className="text-lg font-bold mb-4 flex items-center" data-testid="subject-performance-title">
                  <span className="mr-2">📊</span>
                  Subject-wise Performance
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-border">
                    <thead className="bg-primary text-primary-foreground">
                      <tr>
                        <th className="border border-border p-3 text-left">Section</th>
                        <th className="border border-border p-3 text-center">Correct</th>
                        <th className="border border-border p-3 text-center">Incorrect</th>
                        <th className="border border-border p-3 text-center">Score %</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(testResult.subjectWise).map(([subject, data]) => (
                        <tr key={subject} className="hover:bg-muted/50" data-testid={`subject-row-${subject.toLowerCase()}`}>
                          <td className="border border-border p-3 font-medium text-blue-600">{subject}</td>
                          <td className="border border-border p-3 text-center">{data.correct}</td>
                          <td className="border border-border p-3 text-center">{data.incorrect}</td>
                          <td className="border border-border p-3 text-center font-bold text-blue-600">{data.percentage}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Action Button */}
              <div className="text-center pt-4">
                <Button 
                  onClick={() => window.location.href = "/practice-exam"}
                  className="px-8"
                  data-testid="button-back-to-tests"
                >
                  Back to Tests
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="pb-8">
          <Card className="mx-4 bg-primary text-primary-foreground">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-bold" data-testid="footer-title">Placement Tracker Portal</h3>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <nav className="bg-primary text-primary-foreground p-4 rounded-lg m-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <h1 className="text-xl font-bold" data-testid="nav-title">🏠 Placement Tracker Portal</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-primary-foreground hover:bg-primary/80" data-testid="nav-profile">
              Profile 👤
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary-foreground text-primary text-sm font-medium">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium" data-testid="nav-username">{user.name}</span>
          </div>
        </div>
      </nav>

      {/* Test Header */}
      <div className="px-4 mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-orange-600 flex items-center" data-testid="test-title">
            <span className="mr-3">📋</span>
            {testTitle}
          </h2>
          <div className="flex items-center space-x-4">
            <Badge className="bg-red-100 text-red-800 px-3 py-1 text-lg" data-testid="timer">
              ⏰ Time Left: {formatTime(timeLeft)}
            </Badge>
            <Badge className="bg-blue-100 text-blue-800 px-3 py-1" data-testid="question-count">
              Total: {questions.length} Questions
            </Badge>
            <Button 
              onClick={handleFinishExam}
              variant="outline"
              data-testid="finish-exam-button"
            >
              Finish Exam
            </Button>
          </div>
        </div>
      </div>

      {/* Main Test Interface */}
      <div className="px-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Question Panel */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle data-testid="question-number">Question {currentQuestion + 1}:</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-lg" data-testid="question-text">
                {questions[currentQuestion].question}
              </div>
              
              <RadioGroup 
                value={selectedAnswers[questions[currentQuestion].id]?.toString() || ""} 
                onValueChange={(value) => handleAnswerSelect(questions[currentQuestion].id, parseInt(value))}
                data-testid="answer-options"
              >
                {questions[currentQuestion].options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 hover:bg-muted/50 rounded">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} data-testid={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="cursor-pointer flex-1">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              <div className="pt-4">
                <Button 
                  onClick={handleNextQuestion}
                  disabled={currentQuestion >= questions.length - 1}
                  data-testid="next-question-button"
                >
                  Next Question
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Question Navigator */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-600" data-testid="navigator-title">Question Navigator</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-2">
                {questions.map((_, index) => {
                  const status = getQuestionStatus(index);
                  return (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className={`h-10 w-10 p-0 ${getStatusColor(status)}`}
                      onClick={() => handleQuestionNavigation(index)}
                      data-testid={`question-nav-${index + 1}`}
                    >
                      {index + 1}
                    </Button>
                  );
                })}
              </div>
              
              {/* Legend */}
              <div className="mt-4 space-y-2 text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span>Answered</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span>Current Question</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gray-300 rounded"></div>
                  <span>Not Yet Filled</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="py-8">
        <Card className="mx-4 bg-primary text-primary-foreground">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-bold" data-testid="footer-title">Placement Tracker Portal</h3>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
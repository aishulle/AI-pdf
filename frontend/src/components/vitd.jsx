import React, { useState } from 'react';

const VitaminDQA = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  // Predefined Q&A data
  const qaData = [
    {
      question: "What is Vitamin D?",
      answer: "Vitamin D is a fat-soluble vitamin essential for calcium absorption and bone health.",
    },
    {
      question: "How does the human body produce Vitamin D?",
      answer: "The human body produces Vitamin D when skin is exposed to ultraviolet B (UVB) rays from the sun.",
    },
    {
      question: "What are good sources of Vitamin D?",
      answer: "Good sources include sunlight, fortified foods, and supplements.",
    },
  ];

  const handleSearch = () => {
    const matched = qaData.find((qa) =>
      qa.question.toLowerCase().includes(question.toLowerCase())
    );
    setAnswer(matched ? matched.answer : 'No answer found for that question.');
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Vitamin D Q&A</h2>
      <input
        type="text"
        placeholder="Ask a question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Get Answer
      </button>
      {answer && (
        <div className="mt-4 p-3 bg-gray-100 rounded">
          <strong>Answer:</strong> {answer}
        </div>
      )}
    </div>
  );
};

export default VitaminDQA;

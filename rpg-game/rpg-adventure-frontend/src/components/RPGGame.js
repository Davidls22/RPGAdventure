// RPGGame.js
import React, { useState, useEffect } from "react";

const RPGGame = ({ questsData }) => {
  const [currentQuest, setCurrentQuest] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    // Set the initial quest when the component mounts
    setCurrentQuest(questsData[0]);
  }, [questsData]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);

    // Check if there's a next quest and update the current quest
    if (option.nextQuestId) {
      const nextQuest = questsData.find((q) => q.id === option.nextQuestId);
      setCurrentQuest(nextQuest);
    }
  };

  const handleCompleteQuest = () => {
    // Perform actions when the quest is completed
    setSelectedOption(null);

    // If there's a next quest, continue with it; otherwise, reset to the initial quest
    const nextQuestId = selectedOption ? selectedOption.nextQuestId : null;
    const nextQuest = nextQuestId ? questsData.find((q) => q.id === nextQuestId) : questsData[0];
    setCurrentQuest(nextQuest);
  };

  if (!currentQuest) {
    // Loading state or handle no quests
    return <p>No quests available.</p>;
  }

  return (
    <div>
      <h2>RPG Game</h2>
      {currentQuest && (
        <>
          <p>{currentQuest.description}</p>
          <ul>
            {currentQuest.choices.map((option) => (
              <li
                key={option.id}
                onClick={() => handleOptionClick(option)}
                style={{ cursor: "pointer" }}
              >
                {option.text}
              </li>
            ))}
          </ul>
        </>
      )}
      {selectedOption && (
        <div>
          <p>{selectedOption.result}</p>
          <button onClick={handleCompleteQuest}>Continue</button>
        </div>
      )}
    </div>
  );
};

export default RPGGame;

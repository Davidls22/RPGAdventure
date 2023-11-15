// QuestCreator.js
import React, { useState } from "react";
import questsData from "./quests.json";
import RPGGame from "./RPGGame";

const QuestCreator = () => {
  const [selectedQuest, setSelectedQuest] = useState(null);
  const [questIndex, setQuestIndex] = useState(0);

  const handleStartQuest = () => {
    setSelectedQuest(questsData[questIndex]);
  };

  const handleCompleteQuest = () => {
    // Perform any additional actions upon completing the quest
    setQuestIndex((prevIndex) => prevIndex + 1);
    setSelectedQuest(null);
  };

  return (
    <div>
      <h1>Quest Creator</h1>

      <h2>Start Quest</h2>
      <button onClick={handleStartQuest}>Start Quest</button>

      {selectedQuest && (
        <RPGGame selectedQuest={selectedQuest} onCompleteQuest={handleCompleteQuest} />
      )}
    </div>
  );
};

export default QuestCreator;

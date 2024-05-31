const sortArrayObj = (IsAsc, itemsArray, prop) =>  {
    let sortedResultArray = [];
    // sort by name
    if(Array.isArray(itemsArray) && itemsArray.length > 0) {
      sortedResultArray = itemsArray.slice().sort((a, b) => {
          let nameA = a[prop];
          let nameB = b[prop];
          if(IsAsc) {
               nameA = nameA.toUpperCase(); // ignore upper and lowercase
               nameB = nameB.toUpperCase(); // ignore upper and lowercase
          } else {
               nameA = nameB.toUpperCase(); // ignore upper and lowercase
               nameB = nameA.toUpperCase(); // ignore upper and lowercase
          }
          if (nameA < nameB) {
          return -1;
          }
          if (nameA > nameB) {
          return 1;
          }
      
          // names must be equal
          return 0;
      });
    }  else {
      return new Error("Invalid Array to sort");
    }
    return sortedResultArray;
}

const voiceCommandUtterance = (voicecommand) => {
  const speechSynthesis = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(voicecommand);

  // Optional: Set properties on the utterance
  utterance.pitch = 1; // Default is 1
  utterance.rate = 1;  // Default is 1
  utterance.volume = 1; // Default is 1
  // Speak the text
  speechSynthesis.speak(utterance);
};

export const commonUtils = {
    sortArrayObj,
    voiceCommandUtterance
}
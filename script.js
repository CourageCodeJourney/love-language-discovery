document.addEventListener("DOMContentLoaded", function() {
  const quizContainer = document.getElementById("quiz-container");
  const questionDisplay = document.getElementById("question-display");
  const optionsContainer = document.getElementById("options-container");
  const startQuizButton = document.getElementById("start-quiz");
  const bars = document.querySelectorAll(".bar");
  const storyCards = document.querySelectorAll(".story-card");
  const storyNav = document.getElementById("story-nav");
  const prevStory = document.getElementById("prev-story");
  const nextStory = document.getElementById("next-story");
  const challengeText = document.getElementById("challenge-text");
  const newChallengeBtn = document.getElementById("new-challenge");
  const days = document.querySelectorAll(".day");
  const mapContainer = document.getElementById("map-container");
  
  let currentStoryIndex = 0;
  let quizIndex = 0;
  let loveLanguageScores = { words: 0, acts: 0, gifts: 0, time: 0, touch: 0 };
  
  const quizQuestions = [
    { question: "What makes you feel most valued by a loved one?", options: ["Hearing sincere compliments", "Someone helping with a task", "Receiving a thoughtful present"] },
    { question: "How do you prefer to show affection?", options: ["Writing a heartfelt note", "Doing something helpful for them", "Giving a small gift"] },
    { question: "When you need support, what is most comforting?", options: ["Words of encouragement", "Someone taking care of a chore", "A small token of appreciation"] },
    { question: "What makes you feel appreciated in a relationship?", options: ["Verbal expressions of gratitude", "Acts of service that lighten your load", "Receiving a surprise gift"] },
    { question: "What is your ideal way to spend quality time with someone?", options: ["Having a meaningful conversation", "Working on a shared project", "Exchanging gifts"] },
    { question: "How do you prefer to receive praise?", options: ["Through spoken affirmations", "Someone assisting you with a task", "With a small, meaningful gift"] },
    { question: "What is your preferred way to show gratitude?", options: ["Expressing thanks verbally", "Offering to help with a task", "Giving a small gift as a thank you"] },
    { question: "What makes you feel most connected to someone?", options: ["Kind and supportive words", "Someone taking initiative to help you", "Receiving a thoughtful gift"] },
    { question: "What is your ideal way to celebrate a special occasion?", options: ["Sharing meaningful words and sentiments", "Collaborating on a shared activity", "Exchanging gifts"] },
    { question: "When you're feeling stressed, what helps you feel better?", options: ["Words of comfort and support", "Someone helping you with a task", "Receiving a small, comforting gift"] },
  ];
  
  const loveLanguageKeys = ["words", "acts", "gifts", "time", "touch"];
  
  function loadQuizQuestion() {
    const questionCounter = document.getElementById("question-counter");
    const resultsHint = document.getElementById("results-hint"); // Get the hint element

    if (quizIndex < quizQuestions.length) {
        questionCounter.textContent = `Question ${quizIndex + 1} of ${quizQuestions.length}`;
        questionDisplay.textContent = quizQuestions[quizIndex].question;
        const options = quizQuestions[quizIndex].options;
        optionsContainer.innerHTML = "";
        options.forEach((option, index) => {
            const button = document.createElement("button");
            button.classList.add("option");
            button.textContent = option;
            button.dataset.value = index;
            button.addEventListener("click", function() {
                loveLanguageScores[loveLanguageKeys[index]]++;
                quizIndex++;
                loadQuizQuestion();
            });
            optionsContainer.appendChild(button);
        });
    } else {
        questionCounter.textContent = "";
        updateChart();
        questionDisplay.textContent = "Quiz Completed!";
        optionsContainer.innerHTML = "";
        resultsHint.style.display = "block"; // Show the hint
    }
}
  
  function updateChart() {
    bars.forEach(bar => {
      const language = bar.parentElement.dataset.language;
      bar.style.height = `${loveLanguageScores[language] * 20}px`;
    });
  }
  
  startQuizButton.addEventListener("click", function() {
    quizIndex = 0;
    loveLanguageScores = { words: 0, acts: 0, gifts: 0, time: 0, touch: 0 };
    loadQuizQuestion();
  });
  
  function updateStoryView() {
    storyCards.forEach((card, index) => {
      card.style.display = index === currentStoryIndex ? "block" : "none";
    });
  }
  
  prevStory.addEventListener("click", function() {
    if (currentStoryIndex > 0) {
      currentStoryIndex--;
      updateStoryView();
    }
  });
  
  nextStory.addEventListener("click", function() {
    if (currentStoryIndex < storyCards.length - 1) {
      currentStoryIndex++;
      updateStoryView();
    }
  });
  
  storyCards.forEach(card => {
    const expandBtn = card.querySelector(".expand-btn");
    const preview = card.querySelector(".preview");
    const fullStory = card.querySelector(".full-story"); // Assuming you have a .full-story element
  
    expandBtn.addEventListener("click", function() {
      if (fullStory.style.display === "none" || !fullStory.style.display) {
        preview.style.display = "none"; // Hide preview
        fullStory.style.display = "block"; // Show full story
        expandBtn.textContent = "-"; // Change "+" to "-"
      } else {
        preview.style.display = "block"; // Show preview
        fullStory.style.display = "none"; // Hide full story
        expandBtn.textContent = "+"; // Change "-" to "+"
      }
    });
  
    // Initially hide the full story
    fullStory.style.display = "none";
  });

  const languageCards = document.querySelectorAll("#language-cards .card");
  const meaningsContainer = document.getElementById("language-meanings");

  const languageMeanings = {
      words: "Words of Affirmation: Expressing affection through spoken or written words of praise, appreciation, and encouragement.",
      acts: "Acts of Service: Showing love by performing helpful actions and tasks for your loved ones.",
      gifts: "Receiving Gifts: Feeling loved when receiving thoughtful and meaningful gifts.",
      time: "Quality Time: Valuing focused, undivided attention and spending meaningful time together.",
      touch: "Physical Touch: Expressing and receiving love through physical affection and closeness."
  };

  languageCards.forEach(card => {
      card.addEventListener("click", function() {
          const language = this.dataset.language;
          meaningsContainer.textContent = languageMeanings[language];
      });
  });
  
  // Initialize the map
  var map = L.map('map').setView([10, 0], 2); // Centered on the world map

  // Add map tiles from OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // Define continent locations and love language practices
  var continents = [
    { 
      name: "Asia", 
      lat: 34.0479, 
      lng: 100.6197, 
      text: "In Asia, love is often expressed through acts of service and devotion. Many cultures emphasize caring for loved ones through actions rather than words, such as preparing meals, providing financial stability, or fulfilling family duties." 
    },
    { 
      name: "Europe", 
      lat: 54.5260, 
      lng: 15.2551, 
      text: "In Europe, love languages vary by country, but quality time and physical touch are common. Romantic gestures like hand-holding, public displays of affection, and deep conversations over coffee or wine are widely practiced." 
    },
    { 
      name: "Americas", 
      lat: 15.0000, 
      lng: -90.0000, 
      text: "In the Americas, words of affirmation and physical touch are major love expressions. Compliments, 'I love yous,' hugs, and kisses are commonly used to communicate affection, especially in Latin American cultures where passion is key." 
    },
    { 
      name: "Africa", 
      lat: 1.6508, 
      lng: 17.3006, 
      text: "In Africa, love is often demonstrated through acts of service and gift-giving. Providing for one’s partner, sharing resources, and honoring traditions like bride price (dowry) are strong cultural expressions of love." 
    }
  ];

  // Loop through locations and add markers with tooltips and popups
  continents.forEach(function(continent) {
    L.marker([continent.lat, continent.lng])
      .addTo(map)
      .bindPopup("<b>" + continent.name + "</b><br>" + continent.text) // Click to see details
      .bindTooltip(continent.name, { permanent: true, direction: "top" }); // Always visible label
  });

  let completedCount = 0; // Track how many challenges have been completed

  const challenges = [
    "Give someone a genuine compliment.",
    "Write a heartfelt note to a friend.",
    "Do a small act of kindness today.",
    "Spend quality time with someone you care about.",
    "Give someone a hug or a pat on the back."
  ];

  function generateChallenge() {
    // Set a new challenge text
    challengeText.textContent = challenges[Math.floor(Math.random() * challenges.length)];

    // Mark the next available day as completed
    if (completedCount < days.length) {
      days[completedCount].classList.add("completed");
      completedCount++; // Move to the next day
    }

    // If all days are completed, show a congratulatory message
    if (completedCount === days.length) {
      challengeText.textContent = "🎉 Congratulations! You've completed the Love Language Challenge! 🎉";
      newChallengeBtn.disabled = true; // Disable button to prevent further changes
    }
  }

  // Add event listener to the button
  newChallengeBtn.addEventListener("click", generateChallenge);

  // Generate the first challenge when the page loads
  generateChallenge();
});

document.querySelectorAll('.share-btn').forEach(button => {
    button.addEventListener('click', () => {
        const platform = button.getAttribute('data-platform');
        const url = encodeURIComponent("https://couragecodejourney.github.io/love-language-discovery/"); 
        const text = encodeURIComponent("I just discovered my love language! ❤️✨ Find out how you give and receive love. Take the quiz here:");

        let shareUrl = "";

        if (platform === "twitter") {
            shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
        } else if (platform === "facebook") {
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        } else if (platform === "instagram") {
            alert("Instagram does not support direct web sharing! Try copying the link instead.");
            return;
        }

        window.open(shareUrl, "_blank");
    });
});


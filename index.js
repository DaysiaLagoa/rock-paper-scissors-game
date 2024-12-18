(() => {
    const choices = ["rock", "paper", "scissors"];
    const winningCombinations = {
        rock: "scissors",
        paper: "rock",
        scissors: "paper"
    };
    let wins = 0;
    let losses = 0;
    let ties = 0;

    const getComputerChoice = () => {
        const randomIndex = Math.floor(Math.random() * choices.length);
        return choices[randomIndex];
    };

    const determineWinner = (userChoice, computerChoice) => {
        if (userChoice === computerChoice) {
            return "It's a tie!";
        } else if (winningCombinations[userChoice] === computerChoice) {
            return "You win!";
        } else {
            return "You lose!";
        }
    };

    const showResult = (result, userChoice, computerChoice) => {
        document.getElementById('game-screen').classList.add('is-hidden');
        document.getElementById('result-screen').classList.remove('is-hidden');
        document.getElementById('result').textContent = `You chose ${userChoice}. The computer chose ${computerChoice}. ${result}`;
        
        // Update score
        if (result === "You win!") wins++;
        else if (result === "You lose!") losses++;
        else ties++;

        document.getElementById('wins').textContent = wins;
        document.getElementById('losses').textContent = losses;
        document.getElementById('ties').textContent = ties;

        // Add to history
        const historyItem = document.createElement('li');
        historyItem.textContent = `You: ${userChoice}, Computer: ${computerChoice} - ${result}`;
        document.getElementById('history').appendChild(historyItem);

        // Play result sound
        const resultSound = document.getElementById('result-sound');
        resultSound.play().catch(error => {
            console.error("Failed to play result sound:", error);
        });

        // Play fun sound
        const funSound = document.getElementById('fun-sound');
        funSound.play().catch(error => {
            console.error("Failed to play fun sound:", error);
        });
    };

    const resetGame = () => {
        document.getElementById('game-screen').classList.remove('is-hidden');
        document.getElementById('result-screen').classList.add('is-hidden');
    };

    document.querySelectorAll('#game-screen button').forEach(button => {
        button.addEventListener('click', () => {
            const userChoice = button.id;
            const computerChoice = getComputerChoice();
            const result = determineWinner(userChoice, computerChoice);
            showResult(result, userChoice, computerChoice);
            
            // Play click sound
            const clickSound = document.getElementById('click-sound');
            clickSound.play().catch(error => {
                console.error("Failed to play click sound:", error);
            });
        });
    });

    document.getElementById('play-again').addEventListener('click', resetGame);
})();

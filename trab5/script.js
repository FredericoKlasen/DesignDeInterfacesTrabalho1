document.addEventListener("DOMContentLoaded", function() {
    const steps = document.querySelectorAll(".step");
    const nextButtons = document.querySelectorAll("button[id^='nextStep']");

    let currentStep = 0;

    nextButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            const currentStepInputs = steps[currentStep].querySelectorAll("input, select");
            let fieldsFilled = true;

            currentStepInputs.forEach(input => {
                if (input.value === "") {
                    fieldsFilled = false;
                }
            });

            if (fieldsFilled && validateFields(currentStepInputs)) {
                steps[currentStep].classList.add("hidden");
                currentStepInputs.forEach(input => {
                    input.disabled = true;
                });

                currentStep = index + 1;
                steps[currentStep].classList.remove("hidden");

                highlightWinner(currentStep);
            } else {
                alert("Preencha todos os campos corretamente antes de prosseguir.");
            }
        });
    });

    const calculateButton = document.getElementById("calculate");
    calculateButton.addEventListener("click", calculateResults);

    function calculateResults() {
        const step4Inputs = steps[3].querySelectorAll("input, select");
        let step4FieldsFilled = true;

        step4Inputs.forEach(input => {
            if (input.value === "") {
                step4FieldsFilled = false;
            }
        });

        if (step4FieldsFilled && validateFields(step4Inputs)) {
            for (let i = 0; i <= currentStep; i++) {
                const stepInputs = steps[i].querySelectorAll("input, select");
                stepInputs.forEach(input => {
                    input.disabled = true;
                });
            }

            highlightWinner(1);
            highlightWinner(2);
            highlightWinner(3);

            highlightChampion();
        } else {
            alert("Preencha todos os campos corretamente antes de calcular.");
        }
    }

    function validateFields(inputs) {
        let isValid = true;

        inputs.forEach(input => {
            if (input.type === "text" && input.value.trim() === "") {
                isValid = false;
            } else if (input.type === "number") {
                const inputValue = parseInt(input.value);
                if (isNaN(inputValue) || inputValue < 0) {
                    isValid = false;
                }
            }
        });

        return isValid;
    }

    function highlightWinner(step) {
        const team1Goals = parseInt(document.getElementById(`team${step}Goals`).value);
        const team2Goals = parseInt(document.getElementById(`team${step + 1}Goals`).value);
        const winnerIndex = team1Goals > team2Goals ? 1 : 2;

        const winnerName = document.getElementById(`team${step + winnerIndex}Name`);
        winnerName.style.fontWeight = "bold";
    }

    function highlightChampion() {
        const step3Winner1Goals = parseInt(document.getElementById("team3Goals").value);
        const step3Winner2Goals = parseInt(document.getElementById("team4Goals").value);
        const step4Winner1Goals = parseInt(document.getElementById("team5Goals").value);
        const step4Winner2Goals = parseInt(document.getElementById("team6Goals").value);

        const championTeam1Goals = step3Winner1Goals + step4Winner1Goals;
        const championTeam2Goals = step3Winner2Goals + step4Winner2Goals;

        const championIndex = championTeam1Goals > championTeam2Goals ? 1 : 2;

        const championName = document.getElementById(`championTeam${championIndex}Name`);
        championName.style.fontWeight = "bold";

        // Pintar o site com a cor do campeão
        const championColor = document.getElementById(`championTeam${championIndex}Color`).value;
        document.body.style.backgroundColor = championColor;
    }
});
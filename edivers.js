$(document).ready(function() {
    const colors = [
        { name: "Red", code: "#FF6961" },
        { name: "Green", code: "#77DD77" },
        { name: "Blue", code: "#AEC6CF" },
        { name: "Yellow", code: "#FFD700" },
        { name: "Orange", code: "#FFA07A" },
        { name: "Purple", code: "#B39EB5" }
    ];

    function generateRandomColor() {
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    }

    function setRandomColorBox() {
        const randomColor = generateRandomColor();
        $("#colorBox").css("background-color", randomColor.code);
        $("#colorName").text(randomColor.name);
    }

    function showPopup(message, type) {
        const popup = $("#popup");
        popup.text(message);
        if (type === "correct") {
            gsap.to(popup, { backgroundColor: "#AEC6CF", duration: 0.5 });
        } else {
            gsap.to(popup, { backgroundColor: "#77DD77", duration: 0.5 });
        }
        gsap.to(popup, { top: "50%", opacity: 1, duration: 0.5 });

        setTimeout(function() {
            hidePopup();
        }, 3000);
    }

    function hidePopup() {
        const popup = $("#popup");
        gsap.to(popup, { top: "-50%", opacity: 0, duration: 0.5 });

        setTimeout(function() {
            resetColorOptions();
        }, 500);
    }

    function setupColorOptions() {
        const options = [...colors];

        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }

        $(".color-option").each(function(index) {
            const optionButton = $(this);
            const optionColor = options[index];
            optionButton.css("background-color", optionColor.code);

            optionButton.click(function() {
                if (optionColor.name === $("#colorName").text()) {
                    gsap.to(optionButton, { backgroundColor: "#77DD77", duration: 1 });
                    showPopup("¡Correcto!", "correct");
                } else {
                    gsap.to(optionButton, { backgroundColor: "#FF6961", duration: 1 });
                    showPopup("Incorrecto. Inténtalo de nuevo.", "incorrect");
                }
            });
        });
    }

    function resetColorOptions() {
        $(".color-option").each(function() {
            gsap.to(this, { backgroundColor: "colors", duration: 0.5 });
        });
        setRandomColorBox();
        setupColorOptions();
    }

    setRandomColorBox();
    setupColorOptions();
});
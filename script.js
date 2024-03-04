const gameContainer = document.querySelector('.game');
const gridSizeSlider = document.getElementById("grid-size");
const gridSizeLabel = document.getElementById("grid-size-label");
const changeSizeButton = document.querySelectorAll('.change-size');
const rainbowColorCheck = document.getElementById("rainbow-color");
const colorPicker = document.getElementById("color-picker");

let gridSize = 55;
gridSizeSlider.value = gridSize;
gridSizeLabel.innerText = `${gridSize.toString()} × ${gridSize.toString()}`;

document.addEventListener("DOMContentLoaded", makeGrid);

gridSizeSlider.addEventListener('input', () => {
    gridSize = gridSizeSlider.value;
    gridSizeLabel.innerText = `${gridSize.toString()} × ${gridSize.toString()}`;
});

changeSizeButton.forEach(button => {
    button.addEventListener('click', () => {
        deleteGrid();
        makeGrid();
    });
});

function makeGrid() {
    for (let i = 0; i < gridSize; i++) {
        let row = document.createElement("div");
        row.classList.add("row");
        row.style.height = `calc(100%/${gridSize})`;

        for (let j = 0; j < gridSize; j++) {
            let field = document.createElement("div");
            field.classList.add("field");

            if (i == gridSize - 1) {
                field.style.borderBottom = "none";
            }

            if (j == gridSize - 1) {
                field.style.borderRight = "none";
            }

            field.addEventListener('mouseover', () => {
                if (rainbowColorCheck.checked) {
                    const randomColor = rainbowColor();
                    field.style.backgroundColor = randomColor;
                } else {
                    field.style.backgroundColor = colorPicker.value;
                }
            });
            row.appendChild(field);
        }

        gameContainer.appendChild(row);
    }
}

function deleteGrid() {
    while (gameContainer.firstChild) {
        gameContainer.removeChild(gameContainer.firstChild);
    }
}

function rainbowColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
}

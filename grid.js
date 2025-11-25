document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('grid-container');
    const createGridBtn = document.getElementById('create-grid-btn');
    const gridSizeInput = document.getElementById('grid-size');

    if (!gridContainer || !createGridBtn || !gridSizeInput) return;

    function getRandomDarkColor(darkness) {
        // darkness vai de 0 a 1, onde 1 é preto
        const letters = '0123456789ABCDEF';
        let color = '#';
        
        // Limita os valores para ficarem mais escuros conforme darkness aumenta
        const maxValue = Math.floor(15 * (1 - darkness));
        
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * (maxValue + 1))];
        }
        return color;
    }

    function createGrid(columns) {
        if (isNaN(columns) || columns < 1 || columns > 100) {
            alert('Por favor, digite um número entre 1 e 100.');
            return;
        }

        gridContainer.innerHTML = '';
        gridContainer.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
        gridContainer.style.gridTemplateRows = `repeat(${columns}, 1fr)`;

        const totalItems = columns * columns;

        for (let i = 0; i < totalItems; i++) {
            const gridItem = document.createElement('div');
            gridItem.className = 'grid-item';
            
            // Rastreia quantas vezes o mouse passou pela célula
            let passCount = 0;
            
            gridItem.addEventListener('mouseover', () => {
                passCount++;
                
                if (passCount >= 10) {
                    gridItem.style.backgroundColor = '#000000';
                } else {
                    // Calcula o nível de escuridão (0 a 0.9)
                    const darkness = passCount / 10;
                    gridItem.style.backgroundColor = getRandomDarkColor(darkness);
                }
            });
            
            gridContainer.appendChild(gridItem);
        }
    }

    createGridBtn.addEventListener('click', () => {
        const columns = parseInt(gridSizeInput.value);
        createGrid(columns);
    });

    createGrid(5);
});
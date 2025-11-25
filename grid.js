document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('grid-container');
    const createGridBtn = document.getElementById('create-grid-btn');
    const gridSizeInput = document.getElementById('grid-size');
    const resetGridBtn = document.getElementById('reset-grid-btn');

    if (!gridContainer || !createGridBtn || !gridSizeInput) return;

    // --- Alternative method (commented) ---------------------------------------
    // Below was an approach that generated a random, 
    // increasingly darker color by limiting hexadecimal values.
    /*
    function getRandomDarkColor(darkness) {
        const letters = '0123456789ABCDEF';
        let color = '#';
        const maxValue = Math.floor(15 * (1 - darkness));
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * (maxValue + 1))];
        }
        return color;
    }
    */
    // ---------------------------------------------------------------------

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

            // cor base inicial: branco (também usado no reset)
            gridItem.style.backgroundColor = '#ffffff';

            // overlay preto que controla a escuridão via alpha (opacidade)
            const overlay = document.createElement('div');
            overlay.className = 'overlay';
            overlay.style.background = 'rgba(0,0,0,0)';
            gridItem.appendChild(overlay);

            /*
            //To use the alternative method of coloring cells, 
            // uncomment this part of the code in addition to the 
            // getRandomDarkColor function and comment out the event below.
            
            let passCount = 0;

            gridItem.addEventListener('mouseover', () => {
                passCount = Math.min(10, passCount + 1);

                if (passCount >= 10) {
                    gridItem.style.backgroundColor = '#000000';
                } else {
                    const darkness = passCount / 10; // 0.1, 0.2, ... 0.9
                    gridItem.style.backgroundColor = getRandomDarkColor(darkness);
                }
            });
            */
           
            let passCount = 0;

            gridItem.addEventListener('mouseover', () => {
                passCount = Math.min(10, passCount + 1);
                const alpha = passCount / 10; // 0.1 por vez
                overlay.style.background = `rgba(0,0,0,${alpha})`;
                if (passCount >= 10) {
                    overlay.style.background = 'rgba(0,0,0,1)';
                }
            });

            gridContainer.appendChild(gridItem);
        }
    }

    createGridBtn.addEventListener('click', () => {
        const columns = parseInt(gridSizeInput.value);
        createGrid(columns);
    });

    // Reset: recria o grid com o mesmo tamanho (limpa cores)
    if (resetGridBtn) {
        resetGridBtn.addEventListener('click', () => {
            const columns = parseInt(gridSizeInput.value) || 5;
            createGrid(columns);
        });
    }

    createGrid(5);
});
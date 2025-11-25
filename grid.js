document.addEventListener('DOMContentLoaded', () => {
    const columns = 5;

    const gridContainer = document.getElementById('grid-container');
    if (!gridContainer) return;

    gridContainer.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;

    const totalItems = columns * columns;

    for (let i = 0; i < totalItems; i++) {
        const gridItem = document.createElement('div');
        gridItem.className = 'grid-item';
        gridContainer.appendChild(gridItem);
    }
});
let selectedPiece = null;

document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', () => {
        if (selectedPiece) {
            if (cell.innerHTML === '') {
                cell.innerHTML = selectedPiece.innerHTML;
                selectedPiece.innerHTML = '';
                selectedPiece = null;
            }
        } else if (cell.innerHTML !== '') {
            selectedPiece = cell;
        }
    });
});
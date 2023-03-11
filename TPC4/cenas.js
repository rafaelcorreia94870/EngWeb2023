function toggleEdit(button, href) {
    const row = button.parentNode.parentNode.parentNode;
    const editableCells = row.querySelectorAll('editable');
    if (button.innerHTML === 'Edit') {
        editableCells.forEach(cell => {
            cell.setAttribute('contenteditable', "false");
        });
        button.innerHTML = 'Save';
    } else {
        editableCells.forEach(cell => {
            cell.setAttribute('contenteditable', "true");
            cell.style.backgroundColor = '';
        });
        button.innerHTML = 'Edit';
        
    }
}
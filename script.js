async function searchByDescription() {
    const keyword = document.getElementById('keyword').value;
    const response = await fetch('/buscar-por-descripcion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `keyword=${encodeURIComponent(keyword)}`,
    });
    const data = await response.json();
    displayResults(data);
}

async function searchByReference() {
    const referencia = document.getElementById('referencia').value;
    const response = await fetch('/buscar-por-referencia', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `referencia=${encodeURIComponent(referencia)}`,
    });
    const data = await response.json();
    displayResults([data]); // Convertir el resultado único en un array para mostrarlo correctamente
}

function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';
    results.forEach(result => {
        const resultDiv = document.createElement('div');
        resultDiv.classList.add('result');
        resultDiv.innerHTML = `
            <p>No. De Referencia: ${result['No. De Referencia']}</p>
            <p>Descripción: ${result.Descripción}</p>
            <p>Caracteristicas: ${result.Caracteristicas}</p>
            <p>Rango: ${result.Rango}</p>
            <p>Precio referencia antes de IVA: ${result['Precio referencia antes de IVA']}</p>
        `;
        resultsContainer.appendChild(resultDiv);
    });
}

// Beneficial houses for each planet (from the PDF)
const BENEFICIAL_HOUSES = {
    Sun: {
        self: [0, 1, 3, 6, 7, 8, 9, 10],
        Mars: [0, 1, 3, 6, 7, 8, 9, 10],
        Saturn: [0, 1, 3, 6, 7, 8, 9, 10],
        Jupiter: [4, 5, 8, 10],
        Moon: [2, 5, 9, 10],
        Mercury: [2, 4, 5, 8, 9, 10, 11],
        Ascendant: [2, 3, 5, 9, 10, 11],
        Venus: [5, 6, 11]
    },
    Moon: {
        Ascendant: [2, 5, 9, 10],
        Mars: [1, 2, 4, 5, 8, 9, 10],
        self: [0, 2, 5, 6, 9, 10],
        Sun: [2, 5, 6, 7, 9, 10],
        Saturn: [2, 4, 5, 10],
        Mercury: [0, 2, 3, 4, 6, 7, 9, 10],
        Jupiter: [0, 3, 6, 7, 9, 10, 11],
        Venus: [2, 3, 4, 6, 8, 9, 10]
    },
    // We'll add other planets in the next step
    Mars: {
        Sun: [2, 4, 5, 9, 10],
        Ascendant: [0, 2, 5, 9, 10],
        Moon: [2, 5, 10],
        self: [0, 1, 3, 6, 7, 9, 10],
        Saturn: [0, 3, 6, 7, 8, 9, 10],
        Mercury: [2, 4, 5, 10],
        Venus: [5, 7, 10, 11],
        Jupiter: [5, 9, 10, 11]
    }
};

const SIGN_NAMES = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", 
                   "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];

function calculateAshtakavarga() {
    // Show loading
    document.getElementById('loading').style.display = 'block';
    document.getElementById('results').innerHTML = '';
    
    // Get chart data
    const chart = getChartData();
    
    // Calculate after a small delay to show loading
    setTimeout(() => {
        const results = performCalculations(chart);
        displayResults(results, chart);
        document.getElementById('loading').style.display = 'none';
    }, 500);
}

function getChartData() {
    return {
        ascendant: parseInt(document.getElementById('ascendant').value),
        sun: parseInt(document.getElementById('sun').value),
        moon: parseInt(document.getElementById('moon').value),
        mars: parseInt(document.getElementById('mars').value),
        mercury: parseInt(document.getElementById('mercury').value),
        jupiter: parseInt(document.getElementById('jupiter').value),
        venus: parseInt(document.getElementById('venus').value),
        saturn: parseInt(document.getElementById('saturn').value)
    };
}

function performCalculations(chart) {
    // For now, return sample data - we'll implement full calculations next
    return {
        bhinnashtakavarga: {
            Sun: [5, 5, 3, 6, 3, 2, 3, 3, 3, 5, 5, 5],
            Moon: [4, 4, 4, 3, 3, 4, 3, 4, 5, 2, 4, 4],
            Mars: [3, 4, 3, 3, 3, 3, 4, 4, 4, 3, 3, 3]
        },
        reduced: {
            Sun: [2, 3, 0, 3, 0, 0, 0, 0, 0, 2, 2, 2],
            Moon: [2, 2, 1, 1, 1, 2, 1, 2, 2, 0, 2, 2],
            Mars: [1, 2, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1]
        },
        sarvashtakavarga: [29, 33, 33, 28, 23, 27, 28, 24, 30, 25, 26, 31]
    };
}

function displayResults(results, chart) {
    let html = '';
    
    // Display Bhinnashtakavarga Tables
    html += '<div class="table-section">';
    html += '<h3>Bhinnashtakavarga (Before Reduction)</h3>';
    html += createTableHTML(results.bhinnashtakavarga, 'B.R.');
    html += '</div>';
    
    // Display Reduced Tables
    html += '<div class="table-section">';
    html += '<h3>Ashtakavarga After Reduction</h3>';
    html += createTableHTML(results.reduced, 'A.R.');
    html += '</div>';
    
    // Display Sarvashtakavarga
    html += '<div class="table-section">';
    html += '<h3>Sarvashtakavarga (Combined Table)</h3>';
    html += createSarvashtakavargaTable(results.sarvashtakavarga);
    html += '</div>';
    
    // Display Planet Positions
    html += '<div class="table-section">';
    html += '<h3>Planet Positions</h3>';
    html += createPlanetPositionTable(chart);
    html += '</div>';
    
    document.getElementById('results').innerHTML = html;
}

function createTableHTML(tables, prefix) {
    let html = '<table><tr><th>Sign</th>';
    
    // Header row
    for (const planet in tables) {
        html += `<th>${planet}</th>`;
    }
    html += '</tr>';
    
    // Data rows
    for (let sign = 0; sign < 12; sign++) {
        html += `<tr><td><strong>${SIGN_NAMES[sign]}</strong></td>`;
        for (const planet in tables) {
            const value = tables[planet][sign];
            html += `<td class="bindu-cell bindu-${value}">${value}</td>`;
        }
        html += '</tr>';
    }
    
    html += '</table>';
    return html;
}

function createSarvashtakavargaTable(sarvashtakavarga) {
    let html = '<table><tr><th>Sign</th><th>Bindus</th><th>Effect</th></tr>';
    
    for (let sign = 0; sign < 12; sign++) {
        const bindus = sarvashtakavarga[sign];
        let effect = '';
        
        if (bindus > 30) {
            effect = '💎 Excellent - Happiness, wealth, prosperity';
        } else if (bindus >= 25) {
            effect = '⚖️ Neutral - No significant effects';
        } else {
            effect = '⚠️ Bad - Negative results expected';
        }
        
        html += `<tr>
            <td><strong>${SIGN_NAMES[sign]}</strong></td>
            <td class="bindu-cell bindu-${bindus}">${bindus}</td>
            <td>${effect}</td>
        </tr>`;
    }
    
    html += '</table>';
    return html;
}

function createPlanetPositionTable(chart) {
    let html = '<table><tr><th>Planet</th><th>Sign Position</th></tr>';
    
    for (const [planet, sign] of Object.entries(chart)) {
        if (planet !== 'ascendant') {
            html += `<tr>
                <td><strong>${planet}</strong></td>
                <td>${SIGN_NAMES[sign]}</td>
            </tr>`;
        }
    }
    
    html += `<tr>
        <td><strong>Ascendant</strong></td>
        <td>${SIGN_NAMES[chart.ascendant]}</td>
    </tr>`;
    
    html += '</table>';
    return html;
}

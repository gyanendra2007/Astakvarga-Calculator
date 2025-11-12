// Complete Beneficial Houses for all planets (from the PDF)
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
    Mars: {
        Sun: [2, 4, 5, 9, 10],
        Ascendant: [0, 2, 5, 9, 10],
        Moon: [2, 5, 10],
        self: [0, 1, 3, 6, 7, 9, 10],
        Saturn: [0, 3, 6, 7, 8, 9, 10],
        Mercury: [2, 4, 5, 10],
        Venus: [5, 7, 10, 11],
        Jupiter: [5, 9, 10, 11]
    },
    Mercury: {
        Venus: [0, 1, 2, 3, 4, 7, 8, 10],
        Mars: [0, 1, 3, 6, 7, 8, 9, 10],
        Saturn: [0, 1, 3, 6, 7, 8, 9, 10],
        Jupiter: [5, 7, 10, 11],
        Sun: [4, 5, 8, 10, 11],
        self: [0, 2, 4, 5, 8, 9, 10, 11],
        Moon: [1, 3, 5, 7, 9, 10],
        Ascendant: [0, 1, 3, 5, 7, 9, 10]
    },
    Jupiter: {
        Mars: [0, 1, 3, 6, 7, 9, 10],
        self: [0, 1, 2, 3, 6, 7, 9, 10],
        Sun: [0, 1, 2, 3, 6, 7, 8, 9, 10],
        Venus: [1, 4, 5, 8, 9, 10],
        Moon: [1, 4, 6, 8, 10],
        Saturn: [2, 4, 5, 11],
        Mercury: [0, 1, 3, 4, 5, 8, 9, 10],
        Ascendant: [0, 1, 3, 4, 5, 6, 8, 9, 10]
    },
    Venus: {
        Ascendant: [0, 1, 2, 3, 4, 7, 8, 10],
        Moon: [0, 1, 2, 3, 4, 7, 8, 10, 11],
        self: [0, 1, 2, 3, 4, 7, 8, 9, 10],
        Saturn: [2, 3, 4, 7, 8, 9, 10],
        Sun: [7, 10, 11],
        Jupiter: [4, 7, 8, 9, 10],
        Mercury: [2, 4, 5, 8, 10],
        Mars: [2, 4, 5, 8, 10, 11]
    },
    Saturn: {
        self: [2, 4, 5, 10],
        Mars: [2, 4, 5, 9, 10, 11],
        Sun: [0, 1, 3, 6, 7, 9, 10],
        Ascendant: [0, 2, 3, 5, 9, 10],
        Mercury: [5, 7, 8, 9, 10, 11],
        Moon: [2, 5, 10],
        Venus: [5, 10, 11],
        Jupiter: [4, 5, 10, 11]
    }
};

const SIGN_NAMES = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", 
                   "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];

const TOTAL_BINDUS = {
    Sun: 48, Moon: 49, Mars: 39, Mercury: 54, 
    Jupiter: 56, Venus: 52, Saturn: 39
};

function calculateAshtakavarga() {
    document.getElementById('loading').style.display = 'block';
    document.getElementById('results').innerHTML = '';
    
    const chart = getChartData();
    
    setTimeout(() => {
        try {
            const results = performRealCalculations(chart);
            displayResults(results, chart);
        } catch (error) {
            document.getElementById('results').innerHTML = 
                '<div style="color: red; text-align: center; padding: 20px;">Error in calculation: ' + error.message + '</div>';
            console.error('Calculation error:', error);
        }
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

function performRealCalculations(chart) {
    // Calculate Bhinnashtakavarga (before reduction)
    const bhinnashtakavarga = calculateBhinnashtakavarga(chart);
    
    // Apply reductions
    const reduced = {};
    for (const planet in bhinnashtakavarga) {
        const trikonaReduced = trikonaReduction(bhinnashtakavarga[planet]);
        const ekadhipatyaReduced = ekadhipatyaReduction(trikonaReduced, chart, planet);
        reduced[planet] = ekadhipatyaReduced;
    }
    
    // Calculate Sarvashtakavarga
    const sarvashtakavarga = calculateSarvashtakavarga(bhinnashtakavarga);
    
    return {
        bhinnashtakavarga,
        reduced,
        sarvashtakavarga
    };
}

function calculateBhinnashtakavarga(chart) {
    const result = {};
    
    for (const planet in BENEFICIAL_HOUSES) {
        const table = new Array(12).fill(0);
        const beneficialConfig = BENEFICIAL_HOUSES[planet];
        
        for (const referencePoint in beneficialConfig) {
            const beneficialHouses = beneficialConfig[referencePoint];
            const refPosition = getReferencePosition(referencePoint, planet, chart);
            
            for (const house of beneficialHouses) {
                const sign = (refPosition + house) % 12;
                table[sign]++;
            }
        }
        
        result[planet] = table;
    }
    
    return result;
}

function getReferencePosition(referencePoint, currentPlanet, chart) {
    if (referencePoint === 'self') {
        return chart[currentPlanet.toLowerCase()];
    } else if (referencePoint === 'Ascendant') {
        return chart.ascendant;
    } else {
        return chart[referencePoint.toLowerCase()];
    }
}

function trikonaReduction(table) {
    const reduced = [...table];
    
    const trikonaGroups = [
        [0, 4, 8],   // Aries, Leo, Sagittarius
        [1, 5, 9],   // Taurus, Virgo, Capricorn
        [2, 6, 10],  // Gemini, Libra, Aquarius
        [3, 7, 11]   // Cancer, Scorpio, Pisces
    ];
    
    for (const group of trikonaGroups) {
        const values = group.map(sign => reduced[sign]);
        const nonZeroValues = values.filter(val => val > 0);
        
        if (nonZeroValues.length === 0) continue;
        
        const minVal = Math.min(...nonZeroValues);
        
        // Apply reduction: subtract minimum from all
        for (const sign of group) {
            if (reduced[sign] > 0) {
                reduced[sign] -= minVal;
            }
        }
    }
    
    return reduced;
}

function ekadhipatyaReduction(table, chart, planet) {
    const reduced = [...table];
    
    // Sign ownership rules
    const ownership = {
        mars: [0, 7],     // Aries, Scorpio
        venus: [1, 6],    // Taurus, Libra
        mercury: [2, 5],  // Gemini, Virgo
        jupiter: [8, 11], // Sagittarius, Pisces
        saturn: [9, 10]   // Capricorn, Aquarius
        // Sun: [4], Moon: [3] - not subject to Ekadhipatya reduction
    };
    
    for (const [owner, signs] of Object.entries(ownership)) {
        if (signs.length !== 2) continue;
        
        const [sign1, sign2] = signs;
        const val1 = reduced[sign1];
        const val2 = reduced[sign2];
        
        // Check if signs are occupied
        const sign1Occupied = isSignOccupied(sign1, chart);
        const sign2Occupied = isSignOccupied(sign2, chart);
        
        // Apply Ekadhipatya rules
        if (sign1Occupied && !sign2Occupied) {
            if (val1 < val2) {
                reduced[sign2] = val1;
            } else if (val1 > val2) {
                reduced[sign2] = 0;
            } else {
                reduced[sign2] = 0;
            }
        } else if (!sign1Occupied && sign2Occupied) {
            if (val2 < val1) {
                reduced[sign1] = val2;
            } else if (val2 > val1) {
                reduced[sign1] = 0;
            } else {
                reduced[sign1] = 0;
            }
        } else if (!sign1Occupied && !sign2Occupied) {
            if (val1 === val2 && val1 > 0) {
                reduced[sign1] = 0;
                reduced[sign2] = 0;
            } else if (val1 !== val2) {
                const minVal = Math.min(val1, val2);
                reduced[sign1] = minVal;
                reduced[sign2] = minVal;
            }
        }
    }
    
    return reduced;
}

function isSignOccupied(sign, chart) {
    // Check if any planet is in this sign (excluding Rahu/Ketu)
    const planets = ['sun', 'moon', 'mars', 'mercury', 'jupiter', 'venus', 'saturn'];
    return planets.some(planet => chart[planet] === sign);
}

function calculateSarvashtakavarga(bhinnashtakavarga) {
    const sarvashtakavarga = new Array(12).fill(0);
    
    for (let sign = 0; sign < 12; sign++) {
        let total = 0;
        for (const planet in bhinnashtakavarga) {
            total += bhinnashtakavarga[planet][sign];
        }
        sarvashtakavarga[sign] = total;
    }
    
    return sarvashtakavarga;
}

function displayResults(results, chart) {
    let html = '';
    
    // Calculate total bindus for verification
    const totalBindus = results.sarvashtakavarga.reduce((sum, val) => sum + val, 0);
    
    // Display Planet Positions
    html += '<div class="table-section">';
    html += '<h3>📊 Planet Positions</h3>';
    html += createPlanetPositionTable(chart);
    html += '</div>';
    
    // Display Bhinnashtakavarga Tables
    html += '<div class="table-section">';
    html += '<h3>⭐ Bhinnashtakavarga (Before Reduction)</h3>';
    html += '<p><em>Individual planet Ashtakavarga tables before applying reductions</em></p>';
    html += createTableHTML(results.bhinnashtakavarga, 'B.R.');
    html += '</div>';
    
    // Display Reduced Tables
    html += '<div class="table-section">';
    html += '<h3>🔻 Ashtakavarga After Reduction</h3>';
    html += '<p><em>After applying Trikona and Ekadhipatya reductions</em></p>';
    html += createTableHTML(results.reduced, 'A.R.');
    html += '</div>';
    
    // Display Sarvashtakavarga
    html += '<div class="table-section">';
    html += '<h3>📈 Sarvashtakavarga (Combined Table)</h3>';
    html += '<p><em>Total bindus in each sign from all planets</em></p>';
    html += createSarvashtakavargaTable(results.sarvashtakavarga, totalBindus);
    html += '</div>';
    
    // Display Analysis
    html += '<div class="table-section">';
    html += '<h3>📋 Analysis</h3>';
    html += createAnalysisTable(results, chart, totalBindus);
    html += '</div>';
    
    document.getElementById('results').innerHTML = html;
}

function createTableHTML(tables, prefix) {
    let html = '<div class="table-container"><table><tr><th>Sign</th>';
    
    // Header row
    const planets = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];
    for (const planet of planets) {
        if (tables[planet]) {
            html += `<th>${planet}</th>`;
        }
    }
    html += '</tr>';
    
    // Data rows
    for (let sign = 0; sign < 12; sign++) {
        html += `<tr><td><strong>${SIGN_NAMES[sign]}</strong></td>`;
        for (const planet of planets) {
            if (tables[planet]) {
                const value = tables[planet][sign];
                html += `<td class="bindu-cell bindu-${value}">${value}</td>`;
            }
        }
        html += '</tr>';
    }
    
    // Total row
    html += '<tr><td><strong>Total</strong></td>';
    for (const planet of planets) {
        if (tables[planet]) {
            const total = tables[planet].reduce((sum, val) => sum + val, 0);
            html += `<td><strong>${total}</strong></td>`;
        }
    }
    html += '</tr>';
    
    html += '</table></div>';
    return html;
}

function createSarvashtakavargaTable(sarvashtakavarga, totalBindus) {
    let html = '<table><tr><th>Sign</th><th>Bindus</th><th>Effect</th><th>Recommendation</th></tr>';
    
    for (let sign = 0; sign < 12; sign++) {
        const bindus = sarvashtakavarga[sign];
        let effect = '';
        let recommendation = '';
        
        if (bindus > 30) {
            effect = '💎 Excellent';
            recommendation = 'Good for starting new ventures, business, marriage';
        } else if (bindus >= 25) {
            effect = '⚖️ Neutral';
            recommendation = 'Normal results, neither very good nor bad';
        } else {
            effect = '⚠️ Challenging';
            recommendation = 'Avoid important activities, be cautious';
        }
        
        html += `<tr>
            <td><strong>${SIGN_NAMES[sign]}</strong></td>
            <td class="bindu-cell bindu-${bindus}">${bindus}</td>
            <td>${effect}</td>
            <td>${recommendation}</td>
        </tr>`;
    }
    
    html += `<tr>
        <td><strong>GRAND TOTAL</strong></td>
        <td><strong>${totalBindus}</strong></td>
        <td colspan="2">${totalBindus === 337 ? '✅ Correct Calculation' : '⚠️ Check Calculation'}</td>
    </tr>`;
    
    html += '</table>';
    return html;
}

function createPlanetPositionTable(chart) {
    let html = '<table><tr><th>Planet/Point</th><th>Sign</th><th>House</th></tr>';
    
    const points = [
        { name: 'Ascendant', value: chart.ascendant },
        { name: 'Sun', value: chart.sun },
        { name: 'Moon', value: chart.moon },
        { name: 'Mars', value: chart.mars },
        { name: 'Mercury', value: chart.mercury },
        { name: 'Jupiter', value: chart.jupiter },
        { name: 'Venus', value: chart.venus },
        { name: 'Saturn', value: chart.saturn }
    ];
    
    for (const point of points) {
        const house = (point.value - chart.ascendant + 12) % 12 + 1;
        html += `<tr>
            <td><strong>${point.name}</strong></td>
            <td>${SIGN_NAMES[point.value]}</td>
            <td>${house}</td>
        </tr>`;
    }
    
    html += '</table>';
    return html;
}

function createAnalysisTable(results, chart, totalBindus) {
    const sarvashtakavarga = results.sarvashtakavarga;
    
    let html = '<div class="analysis-grid">';
    
    // Best and Worst Signs
    let maxBindus = Math.max(...sarvashtakavarga);
    let minBindus = Math.min(...sarvashtakavarga);
    let bestSigns = [];
    let worstSigns = [];
    
    for (let i = 0; i < 12; i++) {
        if (sarvashtakavarga[i] === maxBindus) bestSigns.push(SIGN_NAMES[i]);
        if (sarvashtakavarga[i] === minBindus) worstSigns.push(SIGN_NAMES[i]);
    }
    
    html += `<div class="analysis-card">
        <h4>🎯 Best Signs</h4>
        <p><strong>${bestSigns.join(', ')}</strong> with ${maxBindus} bindus</p>
        <p>Ideal for starting important activities</p>
    </div>`;
    
    html += `<div class="analysis-card">
        <h4>🚫 Challenging Signs</h4>
        <p><strong>${worstSigns.join(', ')}</strong> with ${minBindus} bindus</p>
        <p>Be cautious during transits through these signs</p>
    </div>`;
    
    // House Analysis
    const houses = [];
    for (let i = 0; i < 12; i++) {
        const houseSign = (chart.ascendant + i) % 12;
        houses.push({
            number: i + 1,
            sign: SIGN_NAMES[houseSign],
            bindus: sarvashtakavarga[houseSign]
        });
    }
    
    // Find best houses (excluding 6,8,12)
    const goodHouses = houses.filter(h => ![5, 7, 11].includes(h.number));
    const bestHouse = goodHouses.reduce((best, current) => 
        current.bindus > best.bindus ? current : best
    );
    
    html += `<div class="analysis-card">
        <h4>🏠 Strongest House</h4>
        <p><strong>${bestHouse.number}th House (${bestHouse.sign})</strong></p>
        <p>With ${bestHouse.bindus} bindus - indicates strength in this area of life</p>
    </div>`;
    
    html += `<div class="analysis-card">
        <h4>📊 Overall Quality</h4>
        <p><strong>${totalBindus === 337 ? '✅ Perfect Calculation' : '⚠️ Needs Verification'}</strong></p>
        <p>Total Bindus: ${totalBindus}/337</p>
    </div>`;
    
    html += '</div>';
    return html;
}

// Add additional CSS for the analysis cards
const additionalCSS = `
.analysis-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-top: 20px;
}

.analysis-card {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

.analysis-card h4 {
    margin-bottom: 10px;
    font-size: 1.2em;
}

.analysis-card p {
    margin: 5px 0;
    opacity: 0.9;
}

.table-container {
    overflow-x: auto;
}
`;

// Inject additional CSS
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);

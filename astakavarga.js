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

// Rasi Gunakara factors (constant for all horoscopes)
const RASI_GUNAKARA = [7, 10, 8, 4, 10, 5, 7, 8, 9, 5, 11, 12];

// Graha Gunakara factors (planetary multipliers)
const GRAHA_GUNAKARA = {
    Sun: 5,
    Moon: 5,
    Mars: 8,
    Mercury: 5,
    Jupiter: 10,
    Venus: 7,
    Saturn: 5
};

// Transit predictions from the PDF
const TRANSIT_PREDICTIONS = {
    Sun: {
        1: "Financial loss, discomfort, chest pain and aimless journey",
        2: "Increase of expenditure, eye trouble, deceit and unhappiness",
        3: "Increase of emoluments, freedom from sickness and destruction of enemies",
        4: "Quarrels with wife, unhappiness in conjugal life and general ailments",
        5: "Increase of enemies and physical indisposition",
        6: "Success over enemies, joy and good health",
        7: "Wearisome travelling, chest pain and stomach troubles",
        8: "Misunderstandings with or separation from wife",
        9: "Accidents, stomach trouble, mental worry and opposition",
        10: "Success in endeavours, honour and realisation of ambition",
        11: "Great success, respect, freedom from disease and prosperity",
        12: "Success by right means, high moral character"
    },
    Moon: {
        1: "Good food, comforts and clothes",
        2: "Loss of respect, money and increase of obstacles",
        3: "Domestic happiness and access to money",
        4: "Loss of trust in others and lack of peace of mind",
        5: "Indisposition, grief and disappointment",
        6: "Happiness, success over enemies and good health",
        7: "Respect from others and sudden influx of unexpected resources",
        8: "Apprehension, uneasiness and worry",
        9: "Mental pain, stomach trouble and incarceration (if indicated in horoscope)",
        10: "Success, authority and position, realisation of ambition",
        11: "Prosperity, new friends and good income",
        12: "Injuries due to fall from vehicles and increased expenditure"
    },
    Mars: {
        1: "Troubles from various sources and bodily affliction",
        2: "Trouble from Government, frequent quarrels with enemies, disease, accidents, bilious complaints and loss by theft",
        3: "Benefits through auspicious characters, financial improvement and acquisition of authority",
        4: "Fever, stomachache, piles and blood discharges and frequent trouble from ailments",
        5: "Trouble from enemies, illness, misunderstandings with children and loss of physical energy",
        6: "Success over enemies, termination of strife in family, and acquisition of self-confidence",
        7: "Frequent quarrels with wife, eye trouble and stomachache",
        8: "Loss of blood from piles and anaemia and loss of wealth and name",
        9: "Suffering from insults, heavy expenditure and weakness due to ill-health",
        10: "Acquisition of money from unexpected source",
        11: "Fame, reputation and authority",
        12: "Unforeseen expenses, quarrels with wife, eye disease and bilious affections"
    },
    Mercury: {
        1: "Loss of money due to advice by wicked men, worry due to association with tale-bearers, quarrels, imprisonment and disagreeable news while travelling",
        2: "Disgrace, ill-treatment from relatives but acquisition of success and wealth",
        3: "New friends, but anticipation of trouble from government and enemies; aimless roaming about due to misdeeds",
        4: "Prosperity for relatives and family members, addition to family and gain of money",
        5: "Quarrels with wife and children",
        6: "Gain of renown, success and popularity",
        7: "Bloodlessness, quarrels and mental uneasiness",
        8: "Birth of an issue, success, happiness and acquisition of new articles",
        9: "Obstacles and mental worry",
        10: "Defeat of enemies, acquisition of money, happiness with wife and agreeable company",
        11: "Acquisition of wealth; birth of a son and happiness",
        12: "Disgrace from enemies, disease and domestic disharmony"
    },
    Jupiter: {
        1: "Loss of money and intelligence; aimless roaming about and frequent quarrels",
        2: "Happiness, domestic harmony and success over enemies",
        3: "Moving about from place to place, obstacles to own work and loss of position",
        4: "Troubles from relatives, development of a sense of resignation to the inevitable",
        5: "Acquisition of servants, birth of a son, general prosperity, addition of property and development of good qualities",
        6: "Affliction of mind, friends turning enemies and indifferent to good things",
        7: "Happiness, erotic pleasure, good income, purchase of a conveyance and graceful speech",
        8: "Imprisonment, disease, heavy grief and serious illness",
        9: "Influential, birth of an issue, success in work and acquisition of wealth from unexpected source",
        10: "Destruction of position, loss of money and health and aimless roaming about",
        11: "Reinstatement in former position, and recovery of health",
        12: "Fall from ideals and right conduct and increase of grief"
    },
    Venus: {
        1: "Acquisition of comforts for pleasure, and a happy life",
        2: "Acquisition of money and gifts, birth of an issue, and erotic pleasure",
        3: "Influence, wealth and respect",
        4: "Disgrace to enemies and general prosperity",
        5: "Renewal of contact with friends, increase of reputation, influence and power",
        6: "General happiness, extension of business, birth of an issue and good income",
        7: "Humiliation, disease and danger",
        8: "Injuries and trouble from women and mental worry",
        9: "Acquisition of a new house, articles of luxury and wife if not married",
        10: "Increase of virtue, happiness, wealth and performance of religious acts",
        11: "Quarrels and disgrace",
        12: "Acquisition of new friends, money, perfumes and clothes"
    },
    Saturn: {
        1: "Fear from poison or fire, of friends and family members, fear of incarceration, travel to foreign lands, loss of money and near relatives; separation from kith and kin and suffering from insults",
        2: "Emaciated physical appearance, loss of comfort, acquisition but not enjoyment of wealth",
        3: "Increase of wealth and other comforts, good health, general happiness and disappearance of enemies",
        4: "Separation from friends and family members, suspicious nature, crooked behaviour and wicked acts",
        5: "Separation from sons, loss of money and frequent quarrels",
        6: "Freedom from enemies and diseases, association with fair sex",
        7: "Separation from wife and children and aimless roaming about",
        8: "Indulgence in mean activities and bereft of happiness",
        9: "Same results as in (8), suffers from hatred, heart trouble and even imprisonment",
        10: "Gets new avocation, but loses money and fame",
        11: "Frequent loss of temper but acquisition of wealth through wrong means",
        12: "Grief, series of miseries, ill-health and general affliction"
    }
};

// Ashtakavarga Bindu Results from PDF
const ASHTAKAVARGA_BINDU_RESULTS = {
    Sun: {
        8: "Wealth and prosperity and royal favour",
        7: "Welfare, happiness and pomp",
        6: "Rising power",
        5: "Wealth",
        4: "Both good and bad will be equal",
        3: "Fatigue through journey",
        2: "Sinful actions", 
        1: "Severe sickness",
        0: "Death"
    },
    Moon: {
        8: "Happiness, prosperity and help from relatives",
        7: "Gain of clothes, agreeable food and gain of perfumes",
        6: "Study of Mantras and association with religious heads",
        5: "Courage and mental satisfaction",
        4: "Misery and ill-health",
        3: "Quarrels with relations",
        2: "Quarrels brought about by one's wife and one's wealth",
        1: "Irreparable losses",
        0: "Sorrow and extreme panic"
    },
    Mars: {
        8: "Gain of landed property and moneys, acquisition of a house and victory",
        7: "Prosperity through brothers",
        6: "Favour through kings",
        5: "Pleasing experiences",
        4: "Good and bad in equal proportion",
        3: "Separation from brothers and women",
        2: "Quarrels due to wife and wealth",
        1: "Disease as smallpox, etc.",
        0: "Disease in the stomach, fits and exhaustion"
    },
    Mercury: {
        8: "Respect from rulers",
        7: "Increase of wealth and learning",
        6: "Success attending all efforts",
        5: "Reconciliation with relations",
        4: "Want of spirit in everything",
        3: "Anxiety through disturbed thoughts",
        2: "Diseases caused by mental worry",
        1: "Imprisonment by force and unexpected calamities",
        0: "Unexpected loss of everything and consequent mental worries"
    },
    Jupiter: {
        8: "Sovereignty, ownership and kingly prosperity",
        7: "Gain of wealth and happiness",
        6: "Gain of clothes, vehicles and gold",
        5: "Ruin to enemies, accomplishment of desired objects",
        4: "Gain and loss in equal measure",
        3: "Nervous debility and ear diseases",
        2: "Royal frowns",
        1: "Loss of wealth and relations",
        0: "Derangement of the mind, loss of wealth and children"
    },
    Venus: {
        8: "Comfort from good clothes, women, flowers and wholesome food",
        7: "Gain of ornaments and pearls",
        6: "Happiness from agreeable wife",
        5: "Meeting with friends",
        4: "Equal dose of good and bad",
        3: "Quarrel with the people of the locality and relatives",
        2: "Diseases and dismissal from service",
        1: "Fear from water and poison",
        0: "All sorts of calamities"
    },
    Saturn: {
        8: "Acquisition of administrative control over a village or town",
        7: "Acquisition of servants and domestic animals",
        6: "Popularity with thieves, hill tribes and army chief",
        5: "Gain of grain",
        4: "Good and bad equal",
        3: "Loss of wealth, servants, women and happiness",
        2: "Imprisonment, fear and disease",
        1: "Dirty fallen life",
        0: "Ill-luck in everything"
    }
};

function calculateAshtakavarga() {
    console.log("Calculate button clicked!");
    document.getElementById('loading').style.display = 'block';
    document.getElementById('results').innerHTML = '';
    
    const chart = getChartData();
    console.log("Chart data:", chart);
    
    setTimeout(() => {
        try {
            const results = performRealCalculations(chart);
            console.log("Calculation results:", results);
            displayResults(results, chart);
        } catch (error) {
            console.error('Calculation error:', error);
            document.getElementById('results').innerHTML = 
                '<div style="color: red; text-align: center; padding: 20px;">Error in calculation: ' + error.message + '</div>';
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
    
    // Calculate Rasi Gunakara, Graha Gunakara, and Shodhya Pinda
    const gunakaraResults = calculateGunakara(reduced, chart);
    
    // Calculate Transit Predictions
    const transitPredictions = calculateTransitPredictions(reduced, sarvashtakavarga, chart);
    
    // Calculate Sarvashtakavarga Special Predictions
    const sarvaPredictions = calculateSarvashtakavargaPredictions(sarvashtakavarga, chart);
    
    return {
        bhinnashtakavarga,
        reduced,
        sarvashtakavarga,
        gunakaraResults,
        transitPredictions,
        sarvaPredictions
    };
}

// NEW: Calculate Sarvashtakavarga Special Predictions
function calculateSarvashtakavargaPredictions(sarvashtakavarga, chart) {
    const predictions = [];
    
    // Prediction 14: Fame, wealth and happiness
    const house10 = sarvashtakavarga[(chart.ascendant + 9) % 12];
    const house11 = sarvashtakavarga[(chart.ascendant + 10) % 12];
    const house12 = sarvashtakavarga[(chart.ascendant + 11) % 12];
    const house1 = sarvashtakavarga[chart.ascendant];
    
    if (house11 > house10 && house12 < house11 && house1 > house12) {
        predictions.push({
            type: "excellent",
            message: "🎉 Fame, wealth and happiness will be vouchsafed - 11th house has more bindus than 10th, 12th has less than 11th, and ascendant has more than 12th"
        });
    }
    
    // Prediction 15: Life period analysis
    const childhood = sarvashtakavarga.slice(11, 12).concat(sarvashtakavarga.slice(0, 4))
        .reduce((sum, val) => sum + val, 0); // Pisces to Gemini
    const youth = sarvashtakavarga.slice(3, 8).reduce((sum, val) => sum + val, 0); // Cancer to Libra
    const oldAge = sarvashtakavarga.slice(7, 12).reduce((sum, val) => sum + val, 0); // Scorpio to Aquarius
    
    const maxPeriod = Math.max(childhood, youth, oldAge);
    let bestPeriod = "";
    
    if (maxPeriod === childhood) bestPeriod = "Childhood (Pisces to Gemini)";
    else if (maxPeriod === youth) bestPeriod = "Youth (Cancer to Libra)";
    else bestPeriod = "Old Age (Scorpio to Aquarius)";
    
    predictions.push({
        type: "life_period",
        message: `📊 Life Period Analysis: ${bestPeriod} will be most prosperous (Childhood: ${childhood}, Youth: ${youth}, Old Age: ${oldAge})`
    });
    
    return predictions;
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

function calculateGunakara(reducedTables, chart) {
    const results = {};
    
    for (const planet in reducedTables) {
        const reducedTable = reducedTables[planet];
        
        // Rasi Gunakara Calculation
        let rasiGunakara = 0;
        for (let sign = 0; sign < 12; sign++) {
            rasiGunakara += reducedTable[sign] * RASI_GUNAKARA[sign];
        }
        
        // Graha Gunakara Calculation
        const planetPosition = chart[planet.toLowerCase()];
        const bindusInPlanetSign = reducedTable[planetPosition];
        const grahaGunakara = bindusInPlanetSign * GRAHA_GUNAKARA[planet];
        
        // Shodhya Pinda (Sum of both)
        const shodhyaPinda = rasiGunakara + grahaGunakara;
        
        results[planet] = {
            rasiGunakara,
            grahaGunakara,
            shodhyaPinda
        };
    }
    
    return results;
}

// UPDATED: Calculate Transit Predictions using PDF data
function calculateTransitPredictions(reducedTables, sarvashtakavarga, chart) {
    const predictions = [];
    
    // Analyze each planet's transit effects from Moon sign
    for (const planet in reducedTables) {
        const reducedTable = reducedTables[planet];
        
        for (let sign = 0; sign < 12; sign++) {
            const bindus = reducedTable[sign];
            const houseFromMoon = (sign - chart.moon + 12) % 12 + 1;
            
            // Get prediction based on house from Moon
            if (TRANSIT_PREDICTIONS[planet] && TRANSIT_PREDICTIONS[planet][houseFromMoon]) {
                const prediction = TRANSIT_PREDICTIONS[planet][houseFromMoon];
                
                // Determine effect based on bindus
                let effect = 'neutral';
                if (bindus === 0) effect = 'negative';
                else if (bindus >= 4) effect = 'positive';
                else if (bindus >= 6) effect = 'excellent';
                
                predictions.push({
                    planet,
                    sign: SIGN_NAMES[sign],
                    houseFromMoon,
                    bindus,
                    effect,
                    message: prediction
                });
            }
            
            // Add Ashtakavarga bindu results
            if (ASHTAKAVARGA_BINDU_RESULTS[planet] && ASHTAKAVARGA_BINDU_RESULTS[planet][bindus]) {
                predictions.push({
                    planet,
                    sign: SIGN_NAMES[sign],
                    houseFromMoon,
                    bindus, 
                    effect: bindus >= 4 ? 'positive' : 'negative',
                    message: `Ashtakavarga ${bindus} bindus: ${ASHTAKAVARGA_BINDU_RESULTS[planet][bindus]}`
                });
            }
        }
    }
    
    return predictions;
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
    
    // NEW: Display Sarvashtakavarga Special Predictions
    html += '<div class="table-section">';
    html += '<h3>🎯 Sarvashtakavarga Special Predictions</h3>';
    html += '<p><em>Based on classical Vedic astrology principles</em></p>';
    html += createSarvashtakavargaPredictionsTable(results.sarvaPredictions);
    html += '</div>';
    
    // Display Rasi Gunakara, Graha Gunakara, and Shodhya Pinda
    html += '<div class="table-section">';
    html += '<h3>🧮 Rasi Gunakara & Graha Gunakara</h3>';
    html += '<p><em>Longevity calculation factors - Rasi Gunakara + Graha Gunakara = Shodhya Pinda</em></p>';
    html += createGunakaraTable(results.gunakaraResults);
    html += '</div>';
    
    // UPDATED: Display Transit Predictions
    html += '<div class="table-section">';
    html += '<h3>🔮 Transit Predictions (Based on PDF)</h3>';
    html += '<p><em>Effects when planets transit through different signs from Moon</em></p>';
    html += createTransitPredictionsTable(results.transitPredictions);
    html += '</div>';
    
    // Display Analysis
    html += '<div class="table-section">';
    html += '<h3>📋 Overall Analysis</h3>';
    html += createAnalysisTable(results, chart, totalBindus);
    html += '</div>';
    
    document.getElementById('results').innerHTML = html;
}

function createTableHTML(tables, prefix) {
    let html = '<div class="table-container"><table><tr><th>Sign</th>';
    
    const planets = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];
    for (const planet of planets) {
        if (tables[planet]) {
            html += `<th>${planet}</th>`;
        }
    }
    html += '</tr>';
    
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

// NEW: Create Sarvashtakavarga Predictions Table
function createSarvashtakavargaPredictionsTable(predictions) {
    if (predictions.length === 0) {
        return '<p>No special Sarvashtakavarga predictions based on current chart configuration.</p>';
    }
    
    let html = '<div class="analysis-grid">';
    
    for (const prediction of predictions) {
        const effectClass = prediction.type === 'excellent' ? 'excellent-effect' : 
                           prediction.type === 'life_period' ? 'positive-effect' : 'neutral-effect';
        
        html += `<div class="analysis-card ${effectClass}">
            <p>${prediction.message}</p>
        </div>`;
    }
    
    html += '</div>';
    return html;
}

function createGunakaraTable(gunakaraResults) {
    let html = '<table><tr><th>Planet</th><th>Rasi Gunakara</th><th>Graha Gunakara</th><th>Shodhya Pinda</th></tr>';
    
    const planets = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];
    
    for (const planet of planets) {
        if (gunakaraResults[planet]) {
            const { rasiGunakara, grahaGunakara, shodhyaPinda } = gunakaraResults[planet];
            
            html += `<tr>
                <td><strong>${planet}</strong></td>
                <td class="bindu-cell">${rasiGunakara}</td>
                <td class="bindu-cell">${grahaGunakara}</td>
                <td class="bindu-cell bindu-${Math.min(8, Math.floor(shodhyaPinda/30))}"><strong>${shodhyaPinda}</strong></td>
            </tr>`;
        }
    }
    
    html += '</table>';
    return html;
}

// UPDATED: Create Transit Predictions Table with PDF data
function createTransitPredictionsTable(predictions) {
    if (predictions.length === 0) {
        return '<p>No significant transit predictions based on current data.</p>';
    }
    
    let html = '<table><tr><th>Planet</th><th>Sign</th><th>House from Moon</th><th>Bindus</th><th>Effect</th><th>Prediction</th></tr>';
    
    // Show only unique predictions (avoid duplicates)
    const uniquePredictions = [];
    const seenPredictions = new Set();
    
    for (const prediction of predictions) {
        const key = `${prediction.planet}-${prediction.sign}-${prediction.houseFromMoon}-${prediction.message}`;
        if (!seenPredictions.has(key)) {
            seenPredictions.add(key);
            uniquePredictions.push(prediction);
        }
    }
    
    // Show only first 20 predictions to avoid overwhelming
    const displayPredictions = uniquePredictions.slice(0, 20);
    
    for (const prediction of displayPredictions) {
        const effectClass = prediction.effect === 'positive' || prediction.effect === 'excellent' ? 
                           'positive-effect' : 
                           prediction.effect === 'negative' ? 'negative-effect' : 'challenging-effect';
        
        html += `<tr>
            <td><strong>${prediction.planet}</strong></td>
            <td>${prediction.sign}</td>
            <td>${prediction.houseFromMoon}</td>
            <td class="bindu-cell bindu-${prediction.bindus}">${prediction.bindus}</td>
            <td class="${effectClass}">${prediction.effect.toUpperCase()}</td>
            <td>${prediction.message}</td>
        </tr>`;
    }
    
    if (uniquePredictions.length > 20) {
        html += `<tr><td colspan="6" style="text-align: center; font-style: italic;">... and ${uniquePredictions.length - 20} more predictions</td></tr>`;
    }
    
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

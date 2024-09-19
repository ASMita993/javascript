function addPoint() {
    const pointContainer = document.getElementById("pointInputs");
    const pointIndex = pointContainer.children.length + 1;

    const newPoint = document.createElement("div");
    newPoint.className = "point";

    newPoint.innerHTML = `
        <label for="angle${pointIndex}">Observed Angle (°):</label>
        <input type="number" id="angle${pointIndex}" name="angle[]" step="0.01" required>
        <label for="bearing${pointIndex}">Bearing (°):</label>
        <input type="number" id="bearing${pointIndex}" name="bearing[]" step="0.01" required>
        <label for="distance${pointIndex}">Length (m):</label>
        <input type="number" id="distance${pointIndex}" name="distance[]" step="0.01" required>
    `;
    
    pointContainer.appendChild(newPoint);
}

function computeTraverse() {
    const e1 = parseFloat(document.getElementById("easting1").value);
    const n1 = parseFloat(document.getElementById("northing1").value);
    const e2 = parseFloat(document.getElementById("easting2").value);
    const n2 = parseFloat(document.getElementById("northing2").value);
    const angles = document.getElementsByName("angle[]");
    const bearings = document.getElementsByName("bearing[]");
    const distances = document.getElementsByName("distance[]");
    const resultsDiv = document.getElementById("results");

    // Compute initial bearing using E1, N1, E2, N2
    let initialBearing = Math.atan2(e2 - e1, n2 - n1) * (180 / Math.PI);
    let totalAngularAccuracy = 0;
    let totalLinearDistance = 0;

    let resultText = "<h2>Computed Traverse Chart</h2>";
    resultText += "<table><tr><th>Point</th><th>Observed Angle (°)</th><th>Bearing (°)</th><th>Length (m)</th><th>ΔE (m)</th><th>ΔN (m)</th><th>Easting (E)</th><th>Northing (N)</th></tr>";

    let currentEasting = e1;
    let currentNorthing = n1;

    for (let i = 0; i < angles.length; i++) {
        const angle = parseFloat(angles[i].value);
        const bearing = parseFloat(bearings[i].value);
        const distance = parseFloat(distances[i].value);

        // Total Angular Accuracy Calculation
        totalAngularAccuracy += angle;

        // Total Linear Distance Calculation
        totalLinearDistance += distance;

        const deltaE = distance * Math.sin(bearing * (Math.PI / 180));
        const deltaN = distance * Math.cos(bearing * (Math.PI / 180));

        currentEasting += deltaE;
        currentNorthing += deltaN;

        resultText += `<tr><td>${i + 1}</td><td>${angle.toFixed(2)}</td><td>${bearing.toFixed(2)}</td><td>${distance.toFixed(2)}</td><td>${deltaE.toFixed(2)}</td><td>${deltaN.toFixed(2)}</td><td>${currentEasting.toFixed(2)}</td><td>${currentNorthing.toFixed(2)}</td></tr>`;
    }

    // Add results for total accuracy
    resultText += `</table><br/><h3>Total Angular Accuracy: ${totalAngularAccuracy.toFixed(2)}°</h3>`;
    resultText += `<h3>Total Linear Distance: ${totalLinearDistance.toFixed(2)} m</h3>`;
    resultsDiv.innerHTML = resultText;
}

document.getElementById("addPoint").addEventListener("click", addPoint);
document.getElementById("compute").addEventListener("click", computeTraverse);

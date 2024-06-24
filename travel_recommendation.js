function thankyou() {
    alert('Thank you for contacting us!')
}

const resContainer = document.getElementById("searchRes");
const resDiv = document.getElementById("search_result");
const btnSearch = document.getElementById('btnSearch');
const btnClear = document.getElementById('btnClear');
btnSearch.addEventListener('click', searchRes);
btnClear.addEventListener('click', clearSearch);

const beachesN = "beaches";
const countriesN = "countries";
const templesN = "temples";
function searchRes() {
    var query = document.getElementById("searchInput").value.toLowerCase();
    clearSearch();
    fetch("travel_recommendation_api.json")
        .then(response => response.json())
        .then(data => {
            var res = [];
            if (query !== "") {
                if (beachesN.includes(query)) {
                    res = data["beaches"];
                } else if (countriesN.includes(query)) {
                    res = data["countries"];
                } else if (templesN.includes(query)) {
                    res = data["temples"];
                }
            }
            if (res.length > 0) {
                resContainer.style.display = "inline-block";
                res.forEach(element => {
                    var card = document.createElement("div");
                    card.className = "resCard";
                    card.innerHTML += `<img class="resImg" src="${element.imageUrl}" alt="not found">`;
                    card.innerHTML += `<h3>${element.name}</h3>`;
                    card.innerHTML += `<p>${element.description}</p>`;
                    resDiv.appendChild(card);
                });

            } else {
                resContainer.style.display = "inline-block";
                resDiv.innerHTML += '<h2>Destination not found.</h2>';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resDiv.innerHTML = 'An error occurred while fetching data.';
        });
}

function clearSearch() {
    document.getElementById("searchInput").value = "";
    resDiv.innerHTML = "";
    resContainer.style.display = "none";
}

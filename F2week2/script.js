const coinTableBody = document.getElementById('coin-table-body');
const searchInput = document.getElementById('search-input');
const sortMarketCap = document.getElementById('sort-market');
const sortPercentage = document.getElementById('sort-percentage');

let coinData = []; 


  fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
    .then(response => response.json())
    .then(data => {
      coinData = data.map(item => ({
        logo: item.image,
        name: item.name,
        id: item.symbol,
        currentPrice: item.current_price,
        marketCap: item.market_cap,
        percentageChange24h: item.market_cap_change_percentage_24h
      }));
      Adding(coinData);
    })
    .catch(error => {
      console.error('Error:', error);
    });


// Fetch data using async/await 


async function fetchData() {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
    const data = await response.json();

    coinData = data.map(item => ({
      logo: item.image,
      name: item.name,
      id: item.symbol,
      currentPrice: item.current_price,
      marketCap: item.market_cap,
      percentageChange24h: item.market_cap_change_percentage_24h
    }));
    Adding(coinData);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Search functionality
searchInput.addEventListener('input', () => {
  const searchValue = searchInput.value.toLowerCase();
  const filteredData = coinData.filter(coin => coin.name.toLowerCase().includes(searchValue));
  Adding(filteredData);
});


// Sort by Market Cap
sortMarketCap.addEventListener('click', () => {
  const sortedData = [...coinData].sort((a, b) => a.marketCap - b.marketCap);
  Adding(sortedData);
});

// Sort by Percentage Change
sortPercentage.addEventListener('click', () => {
  const sortedData = [...coinData].sort((a, b) => a.percentageChange24h - b.percentageChange24h);
 Adding(sortedData);
});



// Render the table
function Adding(data) {
  coinTableBody.innerHTML = '';

  data.forEach(item => {
    const row = document.createElement('tr');

    const logoCell = document.createElement('td');
    const logoImg = document.createElement('img');
    logoImg.src = item.logo;
    logoImg.alt = item.name;
    logoCell.appendChild(logoImg);
    row.appendChild(logoCell);

    const nameCell = document.createElement('td');
    nameCell.textContent = item.name;
    row.appendChild(nameCell);

    const idCell = document.createElement('td');
    idCell.textContent = item.id.toUpperCase();
    row.appendChild(idCell);

    const currentPriceCell = document.createElement('td');
    currentPriceCell.textContent = '$'+item.currentPrice;
    row.appendChild(currentPriceCell);

    const percentageChange24hCell = document.createElement('td');
    percentageChange24hCell.textContent = item.percentageChange24h.toFixed(2) + '%';

    if (item.percentageChange24h < 0) {
        percentageChange24hCell.style.color = 'red';
      } else {
        percentageChange24hCell.style.color = 'green';
      }


    row.appendChild(percentageChange24hCell);

    const marketCapCell = document.createElement('td');
    marketCapCell.textContent ='Mkt Cap: $' + item.marketCap;
    row.appendChild(marketCapCell);

  

    coinTableBody.appendChild(row);
  });
}
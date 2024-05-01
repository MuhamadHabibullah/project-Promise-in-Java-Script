document.addEventListener('DOMContentLoaded', function () {
    const apiKey = '8864faee5a5043a388c71f5c6c7de6e2'; // Ganti dengan API key yang valid
    const apiUrl = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=' + apiKey;

    fetchNews(apiUrl);

    // Panggil fetchNews() saat pengguna mengetikkan kata kunci pencarian
    document.getElementById('search').addEventListener('input', function () {
        const searchQuery = this.value;
        const searchUrl = `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${apiKey}`;
        fetchNews(searchUrl);
    });
});

function fetchNews(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const newsContainer = document.getElementById('news');
                newsContainer.innerHTML = '';

                data.articles.forEach(article => {
                    const newsItem = document.createElement('div');
                    newsItem.classList.add('col');
                    newsItem.innerHTML = `
            <div class="card">
              <img src="${article.urlToImage}" class="card-img-top" alt="${article.title}">
              <div class="card-body">
                <h5 class="card-title">${article.title}</h5>
                <p class="card-text">${article.description}</p>
                <a href="${article.url}" class="btn btn-primary" target="_blank">Read More</a>
              </div>
            </div>
          `;
                    newsContainer.appendChild(newsItem);
                });

                resolve(); // Panggil resolve setelah berita berhasil dimuat
            })
            .catch(error => {
                console.error('Error fetching news:', error);
                reject(error); // Panggil reject jika terjadi kesalahan saat memuat berita
            });
    });
}

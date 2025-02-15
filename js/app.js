const config = {
    // prod: '/mixmag/api'
    // dev: 'http://localhost:3000/api'
    apiBase: 'http://localhost:3000/api'
}

async function fetchArticles() {
    console.log('API URL:', `${config.apiBase}/articles`); // Debug
    const response = await fetch(`${config.apiBase}/articles`);
    const articles = await response.json();
    const sorted = articles.sort((a, b) => b.pub_date - a.pub_date);

    document.getElementById('articles').innerHTML = sorted.map(article => {
        const date = new Date(article.pub_date * 1000);
        return `
            <div class="article">
                <a href="article.html?id=${article.id}">${article.title}</a>
                <div class="date">${date.toLocaleDateString()}</div>
            </div>
        `;
    }).join('');
}


async function fetchArticle() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const response = await fetch(`${config.apiBase}/articles/${id}`);
    const article = await response.json();

    const date = new Date(article.pub_date * 1000);

    document.getElementById('article').innerHTML = `
       <h1 class="article-title">${article.title}</h1>
       ${article.announcement ? `<div class="article-announcement">${article.announcement}</div>` : ''}
       <div class="article-content">${article.description}</div>
       <div class="article-meta">
           Published: ${date.toLocaleDateString()}
           <br>
           Views: ${article.views}
       </div>
   `;
}

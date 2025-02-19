async function fetchArticles() {
    const response = await fetch('http://localhost:3000/api/articles');
    const articles = await response.json();

    const sorted = articles.sort((a, b) => b.pub_date - a.pub_date);

    document.getElementById('app').innerHTML = sorted.map(article => {
        const date = new Date(article.pub_date * 1000);
        return `
           <div class="article">
               <div class="date">${date.toLocaleDateString()}</div>
               <a href="/mixmag/article/${article.pub_date}">${article.title}</a>
           </div>
       `;
    }).join('');
}
fetchArticles();
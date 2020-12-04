const APIurl = "https://api.github.com/users/"


const form = document.getElementById("form");
const main = document.getElementById("main");
const search = document.getElementById("search");

getUser("RagedHydra");

async function getUser(username) {
	const resp = await fetch(APIurl + username);
	const respData = await resp.json();

	createUserCard(respData);

	getRepos(username);
}

async function getRepos(username) {
	const resp = await fetch(APIurl + username + "/repos");
	const respData = await resp.json();

	addReposToCard(respData);
}

function createUserCard(user) {
	const card = document.createElement("div");
	card.classList.add("card");

	const cardHTML = `
		<div class="card">
			<div>
				<img class="avatar" src="${user.avatar_url}" alt="${user.name}">
			</div>
			<div class="user-info">
				<h2>${user.login}</h2>
				<p>${user.bio}</p>

				<ul class="info">
					<li>${user.followers}</li><strong>Followers</strong>
					<li>${user.following}</li><strong>Following</strong>
					<li>${user.public_repos}</li><strong>Repos</strong>
				</ul>
				<div id="repos">

				<h4>Repos:</h4>
				</div>
			</div>
		</div>			
	`;

	main.innerHTML = cardHTML;
}

function addReposToCard(repos) {
	const reposEl = document.getElementById("repos")

	repos.forEach((repo) => {
		const repoEl = document.createElement("a");
		repoEl.classList.add('repo');

		repoEl.href = repo.html_url;
		repoEl.target = "_blank";
		repoEl.innerText = repo.name;

		reposEl.appendChild(repoEl);

	});
}

form.addEventListener("submit", e => {
	e.preventDefault();

	const user = search.value;

	if (user) {
		getUser(user);

		main.innerHTML = '';
	}
})
dayjs.extend(dayjs_plugin_relativeTime);
const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users");
const btnFollowers = document.getElementById("followers");
const main = document.getElementById("repos");
const github = new Github();
const ui = new UI();
const followers = [];
const following = [];
const timeline = [];
const repos = [];
eventListeners();

function eventListeners() {
    githubForm.addEventListener("submit", getData);
    clearLastUsers.addEventListener("click", clearAllSearched);

    document.addEventListener("DOMContentLoaded", getAllSearched);
}

function getData(e) {

    let username = nameInput.value.trim();

    if (username === "") {
        alert("lütfen bir kullanıcı giriniz..");
    } else {
        github.getGithubData(username)
            .then(response => {
                if (response.user.message === "Not Found") {
                    ui.showError("kullanıcı bulunamadı");
                } else {
                    ui.addSearchedUsersFromUI(username);
                    Storage.addSearchedUsersFromStorage(username);
                    ui.showUserInfo(response.user);
                    ui.showRepoInfo(response.repo);
                    followers.push = response.followers;
                    following.push = response.following;
                    timeline.push = response.timeLine;
                    repos.push = response.repo;

                }
            })
            .catch(err => ui.showError(err));
    }
    ui.clearInput();
    e.preventDefault();
}

function clearAllSearched() {
    if (confirm("Emin misiniz?")) {
        Storage.clearSearchedUsersFromStorage();
        ui.clearSearchedUsersFromUI();
    }
}

function getAllSearched() {
    let users = Storage.getSearchedUsersFromStorage();
    users.forEach(user => {
        lastUsers.innerHTML += `<li class="list-group-item">${user}</li>`;
    });
}

function showFollowers() {
    main.innerHTML = `<div class="col-md-12"><h3 class="page-heading mb-3">Followers</h3></div>`;
    followers.push.forEach(profil => {
        main.innerHTML += `
            <div class="col-md-3 mb-2 card-body">
                <a href="${profil.html_url}" target = "_blank">
                    <img class="img-fluid mb-2 rounded-circle" src="${profil.avatar_url}"> 
                </a>
                <p>${profil.login}</p>
            </div>
        `;
    });

}

function showFollowing() {
    main.innerHTML = `<div class="col-md-12"><h3 class="page-heading mb-3">Following</h3></div>`;
    following.push.forEach(profil => {
        main.innerHTML += `
            <div class="col-md-3 mb-2 card-body">
                <a href="${profil.html_url}" target = "_blank">
                    <img class="img-fluid mb-2 rounded-circle" src="${profil.avatar_url}"> 
                </a>
                <p>${profil.login}</p>
            </div>
        `;
    });

}

function showRepos() {
    main.innerHTML = `<div class="col-md-12"><h3 class="page-heading mb-3">En Son Repolar</h3></div>`;
    repos.push.forEach(repo => {
        main.innerHTML += `
            <div class="col-md-12 mb-2 card-body">
                    <div class="row p-4 border border-dark rounded">
                        <div class="col-md-12 text-center"> 
                            <div class="row">
                                <div class="col-md-2 text-center">
                                    <img class="img-fluid rounded" src="./images/${repo.language}.png">
                                </div>
                                <div class="col-md-10 text-center">
                                    <h5><a href="${repo.html_url}" target = "_blank" id = "repoName" class="stretched-link text-dark mb-5">${repo.name}</a></h5>
                                    <button class="btn btn-outline-success mt-3">
                                        Starlar  <span class="badge badge-light" id="repoStar">${repo.stargazers_count}</span>
                                    </button>

                                    <button class="btn btn-outline-warning mt-3">
                                        Forklar  <span class="badge badge-light" id ="repoFork">${repo.forks_count}</span>
                                    </button>
                                </div>
                            </div>   
                        </div>
                </div>

            </div> 
            `;
    });


}

function showTimeline() {
    main.innerHTML = `<div class="col-md-12"><h3 class="page-heading mb-3">Timeline</h3></div>`;
    timeline.push.forEach(time => {
        main.innerHTML += `
            <div class="col-md-12 card-body">
                    <div class="row p-3 border border-dark rounded">
                        <div class="col-md-12"> 
                            <div class="row">
                                <div class="col-md-3">
                                    <img src="${time.actor.avatar_url}" alt="..." class="img-fluid rounded-circle wh-10">
                                </div>
                                <div class="col-md-7 mt-3">
                                    <p>${time.actor.login}</p>
                                    <span class="badge badge-pill badge-danger">${time.payload.action}</span>
                                    <a href="${time.repo.url}" class="badge badge-light">${time.repo.name}</a>
                                </div>
                                <div class="col-md-2 mt-4">
                                    <span class="align-middle time"> ${dayjs(time.created_at).fromNow()}</span>
                                </div>
                            </div>
                            </div>
                                
                            </div>   
                        </div>
                </div>

            </div> 
            `;
    });


}
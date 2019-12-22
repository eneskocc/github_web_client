class UI {
    constructor() {
        this.profileDiv = document.getElementById("profile");
        this.repoDiv = document.getElementById("repos");
        this.lastUsers = document.getElementById("last-users");
        this.inputField = document.getElementById("githubname");
        this.navbar = document.getElementById("navbar");
        this.cardBody = document.querySelector(".card-body");
    }

    clearInput() {
        this.inputField.value = "";
    }

    showUserInfo(user,repos) {
        let starTotal=0;
        repos.forEach(repo => {
            starTotal+=Number(repo.stargazers_count);
                                    
        });
        this.profileDiv.innerHTML = `
           
            <div class="card card-body mb-3">
            <div class="row">
            <div class="col-md-6">
                <a href="${user.html_url}" target = "_blank">
                <img class="img-fluid mb-2 rounded-circle" src="${user.avatar_url}"> </a>
                <hr>
                <div id="fullName"><strong> ${user.name}</strong></div>
                <hr>
                <div id="bio">${user.bio}</div>
                </div>
            <div class="col-md-6">
                    <button class="btn btn-outline-secondary w-100 mt-3" onclick="showFollowers()">
                        Takipçi  <span class="badge badge-light">${user.followers}</span>
                    </button>
                    <button class="btn btn-outline-info w-100 mt-1" onclick="showFollowing()">
                        Takip Edilen  <span class="badge badge-light">${user.following}</span>
                    </button>
                    <button class="btn btn-outline-danger w-100 mt-1" onclick="showRepos()">
                        Repolar  <span class="badge badge-light">${user.public_repos}</span>
                    </button>
                    <button class="btn btn-outline-dark w-100 mt-1" onclick="showRepos()">
                        Toplam Starlanma  <span class="badge badge-dark">${starTotal}</span>
                    </button>
                    <hr>
                    <li class="list-group">
                        <li class="list-group-item borderzero">
                            <img src="images/company.png" width="20px"> <span id="company">${user.company}</span>
                            
                        </li>
                        <li class="list-group-item borderzero">
                            <img src="images/location.png" width="20px"> <span id = "location">${user.location}</a>
                            
                        </li>
                        <li class="list-group-item borderzero">
                            <img src="images/mail.png" width="20px"> <span id="mail">${user.email}</span>
                            
                        </li>
                        
                    </div>
                    
                    <button class="btn btn-outline-warning w-100 mt-3" onclick="showTimeline()">TimeLine</button>
                </div>
            </div>
        `;
    }
    showRepoInfo(repos) {
        this.repoDiv.innerHTML=`<div class="col-md-12"><h3 class="page-heading mb-3">En Son Repolar</h3></div>`;
        repos.forEach(repo => {
            this.repoDiv.innerHTML += `
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
    showError(massage) {

        const div = document.createElement("div");
        div.className = "alert alert-danger";
        div.textContent = massage;
        this.cardBody.appendChild(div);
        setTimeout(() => {
            div.remove();
        }, 2000);
    }

    addSearchedUsersFromUI(username) {
        let users = Storage.getSearchedUsersFromStorage();
        if (users.indexOf(username) === -1) {
            this.lastUsers.innerHTML += `<li class="list-group-item">${username}</li>`;
        }
    }

    clearSearchedUsersFromUI() {
        this.lastUsers.innerHTML = "";
    }
}
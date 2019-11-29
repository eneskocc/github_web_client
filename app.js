const githubForm=document.getElementById("github-form");
const nameInput=document.getElementById("githubname");
const clearLastUsers=document.getElementById("clear-last-users");
const lastUsers=document.getElementById("last-users");
const btnFollowers=document.getElementById("followers");
const main = document.getElementById("repos");
const github=new Github();
const ui=new UI();
const followers=[];
const followering=[];

eventListeners();

function eventListeners() {
    githubForm.addEventListener("submit",getData);
    clearLastUsers.addEventListener("click",clearAllSearched);
    
    document.addEventListener("DOMContentLoaded",getAllSearched);
}

function getData(e) {
    
    let username=nameInput.value.trim();

    if(username===""){
        alert("lütfen bir kullanıcı giriniz..");
    }else{
        github.getGithubData(username)
        .then(response=> {
            if(response.user.message ==="Not Found"){
                ui.showError("kullanıcı bulunamadı");
            }else{
                ui.addSearchedUsersFromUI(username);
                Storage.addSearchedUsersFromStorage(username);
                ui.showUserInfo(response.user);
                ui.showRepoInfo(response.repo);
                followers.push=response.followers;
                
            }
        })
        .catch(err=> ui.showError(err));
    }
    ui.clearInput();
    e.preventDefault();
}

function clearAllSearched() {
    if(confirm("Emin misiniz?")){
        Storage.clearSearchedUsersFromStorage();
        ui.clearSearchedUsersFromUI();
    }
}

function getAllSearched() {
    let users=Storage.getSearchedUsersFromStorage();
    users.forEach(user => {
        lastUsers.innerHTML+=`<li class="list-group-item">${user}</li>`;
    });
}

function showFollowers() {
    main.innerHTML=`<div class="col-md-12"><h3 class="page-heading mb-3">Followers</h3></div>`;
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

function showFollowering() {
    main.innerHTML=`<div class="col-md-12"><h3 class="page-heading mb-3">Followers</h3></div>`;
    followering.push.forEach(profil => {
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
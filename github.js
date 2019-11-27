class Github{
    constructor(){
        this.url="https://api.github.com/users/";
    }

    async getGithubData(username){
        const responseUser= await fetch(this.url+username);
        const responseRepo= await fetch(this.url+username+"/repos");
        const responseFollowers= await fetch(this.url+username+"/followers");

        const userData= await responseUser.json();
        const repoData= await responseRepo.json();
        const followersData= await responseFollowers.json();

        return{
            user:userData,
            repo:repoData,
            followers:followersData
        }
    }
}
class Github{
    constructor(){
        this.url="https://api.github.com/users/";
    }x
    async getGithubData(username){
        const responseUser= await fetch(this.url+username);
        const responseRepo= await fetch(this.url+username+"/repos");
        const responseFollowers= await fetch(this.url+username+"/followers");
        const responseFollowing= await fetch(this.url+username+"/following");
        const responsetimeLine= await fetch(this.url+username+"/received_events?page=1");

        const userData= await responseUser.json();
        const repoData= await responseRepo.json();
        const followersData= await responseFollowers.json();
        const followingData= await responseFollowing.json();
        const timeLineData= await responsetimeLine.json();
        return{
            user:userData,
            repo:repoData,
            followers:followersData,
            following:followingData,
            timeLine:timeLineData
        }
    }
}
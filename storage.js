class Storage{
    static getSearchedUsersFromStorage(){
        let users;
        if(localStorage.getItem("searched")===null){
            users=[];
        }else{
            users=JSON.parse(localStorage.getItem("searched"));
        }
        return users;

    }
    static addSearchedUsersFromStorage(username){
        let users=this.getSearchedUsersFromStorage();
        if(users.indexOf(username)===-1){
            users.push(username);
        }
        localStorage.setItem("searched",JSON.stringify(users));

    }
    static clearSearchedUsersFromStorage(){
        localStorage.removeItem("searched");
    }
}
export const checkAuthentication=()=>{
    try{
        const storedUser=localStorage.getItem("user");
        if(storedUser){
            return JSON.parse(storedUser);
        }
        const cookies=document.cookie.split(';');
       for(let cookie of cookies){
        const [name, value]=cookie.trim().split("=");
        if(name==="user" || name === "userData"){
            return JSON.parse(decodeURIComponent(value));
        }
       }
       return null; 
    }catch(error){
        console.log("Error checking authentication: ",error);
        return null;
    }
};

export const isAuthenticated=()=>{
    return checkAuthentication()!=null;
}
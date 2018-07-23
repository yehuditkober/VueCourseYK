//bind the "onload" event to execute the "initAllUser" function - when the event is raised
//IMPORTANT: do not call the function with (), only point to the function
onload = initAllUser;


function initAllUser() {
 
    //----------------------------------------------------------
    //showb all the users from the local storage 


    //step 1 - get the prev content from the local storage
    let allUsers = localStorage.getItem("allUsers");

    //step 2 - check if the content is null: 
    //if yes - set the "allUsers" to an empty array
    //if not - convert "allUsers" from string to json array
    allUsers = (allUsers) ? JSON.parse(allUsers) : [];



    let userList = "";

    //step 3 - loop over the array and add every user to the html output
    for(let singleUser of allUsers) {
        userList += `<li>
            <ol style="color:${singleUser.color}">
            <li><h2>full Name: </h2> ${singleUser.fullName}</li>
            <li><h2>age: </h2> ${singleUser.age}</li>
            <li><h2>birth date: </h2> ${singleUser.bdate}</li>
            </ol>
            </li>`;
       
    }
    

    //step 4 - set the result as conent in the html page
    document.getElementById("userList").innerHTML = JSON.parse(localStorage.allUsers)[localStorage.allUsers-1];
    //----------------------------------------------------------

}




function loginUser() {
    let fullNameVal=document.getElementById("fullName");
    let ageVal=document.getElementById("age");
    let bdateVal=document.getElementById("bdate");
    let colorVal=document.getElementById("colorChoice");
   
    //validation checking
    if(fullNameVal.value.length>=3 &&
       ageVal.value <= 120 && ageVal.value >= 10) {


        //create a new JSON object with the input values
        let newUser = {
            fullName: fullNameVal.value,
            age: ageVal.value,
            bdate: bdateVal.value,
            color: colorVal.value
        };
        //----------------------------------------------------------
        //add the new user to the session storage - as the current loged in user
        sessionStorage.setItem("currentUser", JSON.stringify(newUser));
        //----------------------------------------------------------


        //----------------------------------------------------------
        //add the new user to the local storage 


        //step 1 - get the prev content from the local storage
        let prevUsers = localStorage.getItem("allUsers");

        //step 2 - check if the content is null: 
        //if yes - set the "prevUsers" to an empty array
        //if not - convert "prevUsers" from string to json array
        prevUsers = (prevUsers) ? JSON.parse(prevUsers) : [];

        //step 3 - add to the "prevUsers" array a new element (the new user)
        prevUsers.push(newUser);

        //step 4 - convert the "prevUsers" array to a string, and insert this value to the local storage
        localStorage.setItem("allUsers", JSON.stringify(prevUsers));
        //----------------------------------------------------------


        //----------------------------------------------------------
        // empty all the input elements
        fullNameVal.value = "";
        ageVal.value = "";
        bdateVal.value = "";
        colorVal.value = "#000000";
        //----------------------------------------------------------



        //update the list of all the users
        initAllUser();

        //update the name of the current user in the hrader section
        document.getElementById("userName").innerText = newUser.fullName;
    }
    else {
        alert("please enter all the requiered fields")
    }
   
}



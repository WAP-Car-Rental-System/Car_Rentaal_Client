/**eLibrary.js
*@author habtom W.michael
 */



(function(){
    "use strict"
    getAllCars();

    function getAllCars(){
        const editButton = $("<button>",{
            "text":"Rent",
            "id":"rentButton",
            "name":"rent",
        "css":{
            "color":"blue",
            "backgraund-color": "gray"
        }});
        fetch("https://elibraryrestapi.herokuapp.com/elibrary/api/book/list")
        .then((response)=>{
            if(response.ok){
                return response.json();
            }else{
                return Promise.reject({status:response.status,statusText: response.statusText});
            }
        })
        .then(cars=>{
            let content="";
            if(cars.length>0){
                cars.forEach(function(car, i){
                    content+=`
                    <tr>
                        <th scope="row">${i+1}.</th>
                <td>${car.brand}</td>
                <td>${car.model}</td>
                <td>${car.productionYear}</td>
                <td>${car.mileage}</td>
                <td>${car.color}</td>
                <td>${car.rentPrice}</td>
                <td>${car.rentPrice}</td>
                <td>${editButton.get(0).outerHTML}</td>
                    </tr>
                    `;
                });
            }else{
                content+=`
                <tr>
                <td style="text-align:center;" colspan="6" >We are sorry, currently no Cars Available</td>
                </tr>
                `;
            };
            $("#addNewBookForm").hide();
            document.querySelector("#tableBodyCarList").innerHTML=content;

        })
        .catch(errs=>{
            const tableBodyErrorMsg= `
            <tr>
            <td style="text-align:center;" colspan="6">
            <p style='color:#cc0000'>we are sorry. eCarRental Service is unavailable. Please try again later.</p>
            </td>
            </tr>
            `;
            $("#addNewCarForm").hide();
            document.getElementById("#tableBodyCarList").innerHTML=tableBodyErrorMsg;
           
            console.log("Error message",errs);
        });
    }
//************ */

    $("#buttonNewCar").click(function(event){
        event.preventDefault();
      
        $("#addNewCarForm").show();
        $("#carDatTable").hide();
        const formstate = $("#buttonNewCar").attr("data-formstate");
        if(formstate=="off"){
            $("#buttonNewCar").text("Close");
            $("#listOfCars").text("New Car Registration Form");
            $("#divNewCarForm").show("slow");
            $("#brand").focus();
            $("#buttonNewCar").attr("data-formstate","on");
        }else{
            $("#buttonNewCar").text("Register A New Car");
            $("#listOfCars").text("List Of All Cars");
            $("#divNewCarForm").show("slow");
            $("#brand").focus();
            $("#buttonNewBook").attr("data-formstate","off");
        }

    });
// on submitting the form
function saveNewCar(){
    const bookRegistrationForm=document.getElementById("addNewCarForm");
    const txtBrand= $("#brand");
   
   
    const txtModel=$("#model");
    
    const txtProductionYear= $("#productionYear");
    const txtMileage=$("#mileage");
    const txtColor=$("#color");
    const txtRentPrice=$("#rentPrice");
    bookRegistrationForm.addEventListener("submit",function(e){
        e.preventDefault();
        const brand = txtBrand.val();
        const model=txtModel.val();
        const productionYear= txtProductionYear.val();
        const mileage=txtMileage.val();
        const color=txtColor.val();
        const rentPrice= txtRentPrice.val();
       
        const newBookData={
            "brand":brand,
            "model":model,
            "productionYear":productionYear,
            "mileage":mileage,
            "color":color,
            "rentPrice":rentPrice
        };
        console.log(newCarData);
        fetch("https://elibraryrestapi.herokuapp.com/elibrary/api/book/add",{
            method:"post",
            body:JSON.stringify(newCarData),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(function(response){
            return{"status":"ok"};
        }).then(function(jsonResponseData){
           // console.log(jsonResponseData);
            getAllCars();
           
            txtBrand.Value="";
            txtModel.Value="";
            txtProductionYear.Value="0.0";
            txtMileage.Value="";
            txtColor.Value="";
            txtRentPrice.Value="";
            txtIsbn.focus();
            $("#addNewCarForm").hide();
            $("#carDatTable").hide();

        }).catch(function(error){
            console.error(error);
            $("#addNewCarForm").hide();
        })
       
    });

   
}
saveNewCar();
})();






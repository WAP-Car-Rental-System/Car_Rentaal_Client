/**eCarRentalUser.js
*@author habtom W.michael
 */



(function(){
    "use strict"
    getAllCars();
    function getAllCars(){
        const rentButton = $("<button>",{
            "text":"Edit",
            "id":"editButton",
            "name":"edit",
        "css":{
            "color":"blue",
            "backgraund-color": "gray"
        }});
        
        fetch("http://localhost:8080/careRent/car/list")
        .then((response)=>{
            if(response.ok){
                console.log(response);
                return response.json();
            }else{
                return Promise.reject({status:response.status,statusText: response.statusText});
            }
        })
        .then(cars=>{
            console.log("Car List Size=" +(cars.length>0));
            let content="";
            let size= cars.length;
            if(cars.length>0){
                cars.forEach(function(car, i){
                    content+=`
                    <tr>
                        <th scope="row">${i+1}.</th>
                        <td>${car.carBrand}</td>
                        <td>${car.carModel}</td>
                        <td>${car.carProductionYear}</td>
                        <td>${car.mileage}</td>
                        <td>${car.carColor}</td>
                        <td>${car.transmission}</td>
                        <td> 
                              <button type='button'  
                                  onclick=addCarCopy(${car.carID});  
                                  class='btn btn-primary btn-lg' data-toggle="modal" data-target="#ModalAdd"> 
                                  Add car Copy
                                 </button>
                        </td>
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
            //$("#addNewCarForm").hide();
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
            //$("#addNewCarForm").hide();
            document.getElementById("#tableBodyCarList").innerHTML=tableBodyErrorMsg;
           
            console.log("Error message",errs);
        });
    }
//************ */

    $("#buttonNewCar").click(function(event){
        event.preventDefault();
      
        //$("#addNewCarForm").show();
        //$("#carDatTable").hide();
        const formstate = $("#buttonNewCar").attr("data-formstate");
        if(formstate=="off"){
            $("#buttonNewCar").text("Close");
            $("#listOfCars").text("New Car Registration Form");
            $("#divNewCarForm").show("slow");
            $("#brand").focus();
            $("#buttonNewCar").attr("data-formstate","on");
        }else {
            $("#buttonNewCar").text("Add New Car");
            $("#listOfCars").text("List Of All Cars");
            $("#divNewCarForm").hide("slow");
            $("#buttonNewCar").attr("data-formstate","off");
            //$("#brand").focus();
            //$("#buttonNewBook").attr("data-formstate","off");
        }

    });

  function addCarCopy(carId){
     console.log(carId);
  } 
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
       
        const newCarData={
            "carBrand":brand,
            "carModel":model,
            "carProductionYear":productionYear,
            "mileage":mileage,
            "carColor":color,
            "transmission":"Automatic"};
        console.log(newCarData);
        fetch("http://localhost:8080/careRent/car/newCar",{
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
            txtBrand.focus();
            location.reload();
            //$("#addNewCarForm").hide();
            //$("#carDatTable").hide();

        }).catch(function(error){
            console.error(error);
            //$("#addNewCarForm").hide();
        })
       
    });

   
}
saveNewCar();
})();






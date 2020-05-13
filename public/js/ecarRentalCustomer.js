/**eCarRentalCustomer.js
*@author habtom W.michael
 */



(function(){
    "use strict"
    getAllCars();

    function getAllCars(){
        const rentButton = $("<button>",{
            "text":"Rent",
            "id":"rentButton",
            "name":"rent",
        "css":{
            "color":"blue",
            "backgraund-color": "gray"
        }});
        fetch("http://localhost:8080/careRent/car/rent")
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
                        <td>${car.carBrand}</td>
                        <td>${car.carModel}</td>
                        <td>${car.carProductionYear}</td>
                        <td>${car.mileage}</td>
                        <td>${car.carColor}</td>
                        <td>${car.transmission}</td>
                       <td>${car.rentPrice}</td>
               
                       <td> 
                       <button type='button'  
                           onclick=addCarCopy(${car.carID});  
                           class='btn btn-primary btn-lg' data-toggle="modal" data-target="#ModalAdd"> 
                           Rent
                 
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
            $("#addNewPaymentForm").hide();
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
           
            document.getElementById("#tableBodyCarList").innerHTML=tableBodyErrorMsg;
           
            console.log("Error message",errs);
        });
    }
//************ */




var rentPrice;

    $("#${car.carID}").click(function(event){
        rentPrice=$("#rentPrice").val();
        event.preventDefault();
      
        $("#addNewPaymentForm").show();
        $("#carDatTable").hide();
        const formstate = $("#buttonNewStatus").attr("data-formstate");
        if(formstate=="off"){
            $("#buttonNewStatus").text(" ");
            $("#listOfCars").text("Payment Form");
            $("#divNewPaymentForm").show("slow");
            $("#dateFrom").focus();
            $("#buttonNewStatus").attr("data-formstate","on");
        }else{
            $("#buttonNewStatus").text("");
            $("#listOfCars").text("List Of Available Cars");
            $("#divNewCarForm").show("slow");
            $("#brand").focus();
            $("#buttonNewStatus").attr("data-formstate","off");
        }

    });
// on submitting the form
function savePayment(){
    const bookRegistrationForm=document.getElementById("addNewPaymentForm");
    const txtDateFrom= $("#dateFrom");
    const txtReturnDate=$("#returnDate");
    const txtRentPrice=$("#rentPrice");
    const txtLicenseNo= $("#licenseNo");
    const txtFullName=$("#fullName");
    const txtAddress=$("#address");

    bookRegistrationForm.addEventListener("submit",function(e){
        e.preventDefault();
        const dateFrom = txtDateFrom.val();
        const returnDate=txtReturnDate.val();
        const rentPrice= txtRentPrice.val();
        const licenseNo = txtLicenseNo.val();
        const fullName=txtFullName.val();
        const address= txtAddress.val();
        const newPaymentData={
            "dateFrom":dateFrom,
            "returnDate":returnDate,
            "rentPrice":rentPrice,
            "licenseNo":licenseNo,
            "fullName":fullName,
            "address":address
        };
        console.log(newPaymentData);
        fetch("https://elibraryrestapi.herokuapp.com/elibrary/api/book/add",{
            method:"post",
            body:JSON.stringify(newPaymentData),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(function(response){
            return{"status":"ok"};
        }).then(function(jsonResponseData){
           // console.log(jsonResponseData);
           
           
           txtDateFrom.Value="";
           txtReturnDate.Value="";
            txtRentPrice.Value="";
            txtLicenseNo.Value="";
            txtFullName.Value="";
             txtAddress.Value="";
            $("#addNewPaymentForm").hide();
            $("#carDatTable").hide();
            $("#listOfCars").text("Congratulations Payment Done sucessfully!, We are happy to see you again");
        }).catch(function(error){
            console.error(error);
            $("#addNewPaymentForm").hide();
        })
       
    });

   
}
savePayment();
})();







generateOrderID();

function generateOrderID() {
    $.ajax({
        url: "http://localhost:8080/back_End/sales/SaleIdGenerate",
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (resp) {
            let id = resp.value;
            console.log("id" + id);

            if (id === null) {
                $("#oid").val("O00-001");
            } else {
                let tempId = parseInt(id.split("-")[1]);
                tempId = tempId + 1;
                if (tempId <= 9) {
                    $("#oid").val("O00-00" + tempId);
                } else if (tempId <= 99) {
                    $("#oid").val("O00-0" + tempId);
                } else {
                    $("#oid").val("O00-" + tempId);
                }
            }
        },
        error: function (ob, statusText, error) {
            console.log(ob);
            console.log(statusText);
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Request failed",
                showConfirmButton: false,
                timer: 1500
            });
        }
    });
}

$("#Customer_Id").empty();
$.ajax({
    url:  "http://localhost:8080/back_End/customer",
    method: "GET",
    dataType: "json",
    success: function (res) {
        console.log(res);

        for (let i of res.data) {
            let id = i.code;

            $("#Customer_Id").append(`<option>${id}</option>`);
        }
        console.log(res.message);
    },
    error: function (error) {
        let message = JSON.parse(error.responseText).message;
        console.log(message);
    }

});

$("#Customer_Id").click(function () {
    var search = $("#Customer_Id").val();
    $.ajax({
        url: "http://localhost:8080/back_End/customer/searchCus?code="+ search,
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (res) {
            console.log(res);
            $("#cusName").val(res.name);
        },
        error: function (error) {
            let message = JSON.parse(error.responseText).message;
            console.log(message);
        }
    })
});

$("#Item_Code").empty();
$.ajax({
    url:  "http://localhost:8080/back_End/item",
    method: "GET",
    dataType: "json",
    success: function (res) {
        console.log(res);

        for (let i of res.data) {
            let id = i.code;

            $("#Item_Code").append(`<option>${id}</option>`);
        }
        console.log(res.message);
    },
    error: function (error) {
        let message = JSON.parse(error.responseText).message;
        console.log(message);
    }

});

$("#Item_Code").click(function () {
    var search = $("#Item_Code").val();
    $.ajax({
        url: "http://localhost:8080/back_End/item/searchItemId?code="+ search,
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (res) {
            console.log(res);
            $("#itemName").val(res.name);
            $("#itemPrice").val(res.salePrice);
            $("#qtyOnHand").val(res.qty);
        },
        error: function (error) {
            let message = JSON.parse(error.responseText).message;
            console.log(message);
        }
    })
});


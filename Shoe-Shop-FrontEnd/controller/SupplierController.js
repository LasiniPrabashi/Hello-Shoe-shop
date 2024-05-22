$(document).ready(function() {
    loadAllSupplier();
});

/**
 * Supplier Save
 * */
$("#btnSaveSupplier").attr('disabled', false);
$("#btnUpdateSupplier").attr('disabled', false);
$("#btnDeleteSupplier").attr('disabled', false);


/**
 * Supplier Save
 * Supplier ID
 * */
function generateSupplierID() {
    $("#supplier_code").val("S00-001");

    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url:"http://localhost:8080/back_End/supplier/SupplierIdGenerate",
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        contentType: "application/json",
        dataType: "json",
        success: function(resp) {
            let id = resp.value;
            console.log("id" + id);

            if (id === null) {
                $("#supplier_code").val("S00-001");
            } else {
                let tempId = parseInt(id.split("-")[1]) + 1;
                let newId = "S00-" + ("000" + tempId).slice(-3);
                $("#supplier_code").val(newId);
            }
        },
        error: function(ob, statusText, error) {
            console.error(error);
        }
    });
}

/**
 * Button Add New Supplier
 * */
$("#btnSaveSupplier").click(function() {
    let formData = $("#supplierForm").serializeArray();

    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: "http://localhost:8080/back_End/supplier",
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        data: formData,
        dataType: "json",
        success: function(res) {
            saveUpdateAlert("Supplier", res.message);
            loadAllSupplier();
        },
        error: function(xhr, status, error) {
            unSuccessUpdateAlert("Supplier", JSON.parse(xhr.responseText).message);
        }
    });
});

/**
  lear input fields Values Method
* */
function setTextFieldValuesS(code, name, category, address1, address2, address3, address4, address5, contact1, contact2, email) {
    $("#Supplier_code").val(code);
    $("#name").val(name);
    $("#category").val(category);
    $("#S_address_1").val(address1);
    $("#S_address_2").val(address2);
    $("#S_address_3").val(address3);
    $("#S_address_4").val(address4);
    $("#S_address_5").val(address5);
    $("#ContactNo1").val(contact1);
    $("#ContactNo2").val(contact2);
    $("#email").val(email);

    $("#Supplier_code").focus();

    $("#btnSaveSupplier").attr('disabled', false);
    $("#btnUpdateSupplier").attr('disabled', false);
    $("#btnDeleteSupplier").attr('disabled',false);
}


/**
 * load all Supplier Method
 * */
function loadAllSupplier() {
    $("#suppliersTable").empty();
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: "http://localhost:8080/back_End/supplier",
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        dataType: "json",
        success: function(res) {
            for (let supplier of res.data) {
                let code = supplier.code;
                let name = supplier.name;
                let category = supplier.category;
                let address = supplier.address || {};
                let contact1 = supplier.contact1;
                let contact2 = supplier.contact2;
                let email = supplier.email;

                let ad1 = address.address1 || '';
                let ad2 = address.address2 || '';
                let ad3 = address.address3 || '';
                let ad4 = address.address4 || '';
                let ad5 = address.address5 || '';
                let addressColumn =  `${ad1}, ${ad2}, ${ad3}, ${ad4}, ${ad5}`;

                let row = `<tr><td>${code}</td><td>${name}</td><td>${category}</td><td>${addressColumn}</td><td>${contact1}</td><td>${contact2}</td><td>${email}</td></tr>`;
                $("#suppliersTable").append(row);
            }
            blindClickEventsS()
            generateSupplierID();
            setTextFieldValuesS("", "", "", "", "", "", "", "", "", "", "");
        },
        error: function(error) {
            console.error(error);
        }
    });
}

/**
 * Table Listener Click and Load textFields
 * */
function blindClickEventsS() {
    $("#suppliersTable").on("click", "tr", function () {
        let code = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let category = $(this).children().eq(2).text();
        let addressColumn = $(this).children().eq(3).text(); // Assuming address is in one column

        // Split address into individual components
        let addressComponents = addressColumn.split(', ');
        let address1 = addressComponents[0] || '';
        let address2 = addressComponents[1] || '';
        let address3 = addressComponents[2] || '';
        let address4 = addressComponents[3] || '';
        let address5 = addressComponents[4] || '';

        let contact1 = $(this).children().eq(4).text();
        let contact2 = $(this).children().eq(5).text();
        let email = $(this).children().eq(6).text();


        // Set values to respective input fields
        $("#supplier_code").val(code);
        $("#name").val(name);
        $("#category").val(category);
        $("#S_address_1").val(address1);
        $("#S_address_2").val(address2);
        $("#S_address_3").val(address3);
        $("#S_address_4").val(address4);
        $("#S_address_5").val(address5);
        $("#ContactNo1").val(contact1);
        $("#ContactNo2").val(contact2);
        $("#email").val(email);

    });

    $("#btnSaveSupplier").attr('disabled',false);
}

/**
 * Update Supplier
 * */
$("#btnUpdateSupplier").click(function () {
    let formData = $("#supplierForm").serialize();

    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: "http://localhost:8080/back_End/supplier",
        method: "PUT",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        data: formData,
        dataType: "json",
        success: function (res) {
            saveUpdateAlert("Supplier updated", res.message);
            loadAllSupplier();
        },
        error: function (xhr, status, error) {
            unSuccessUpdateAlert("Supplier update failed", JSON.parse(xhr.responseText).message);
        }
    });
});


/**
 * Delete Supplier
 * */
$("#btnDeleteSupplier").click(function () {
    let id = $("#supplier_code").val();
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: "http://localhost:8080/back_End/supplier?code=" + id,
        method: "DELETE",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        dataType: "json",
        success: function (resp) {
            saveUpdateAlert("Supplier", resp.message);
            loadAllSupplier();
        },
        error: function (xhr, status, error) {
            let message = JSON.parse(xhr.responseText).message;
            unSuccessUpdateAlert("Supplier", message);
        }
    });
});

/**
 * Search id and name Load Table
 * */
$("#form1").on("keypress", function (event) {
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    if (event.which === 13) {
        var search = $("#form1").val();

        $("#suppliersTable").empty();
        $.ajax({
            url: "http://localhost:8080/back_End/supplier/searchSupplier",
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            data: {
                code: search, // Provide the 'code' parameter
                name: search  // Provide the 'name' parameter
            },
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                console.log(res);
                if (res) {
                    let code = res.code;
                    let name = res.name;
                    let category = res.category;
                    let address = res.address || '';
                    let contact1 = res.contact1;
                    let contact2 = res.contact2;
                    let email = res.email;

                    let ad1 = address.address1 || '';
                    let ad2 = address.address2 || '';
                    let ad3 = address.address3 || '';
                    let ad4 = address.address4 || '';
                    let ad5 = address.address5 || '';

                    // Concatenate address properties
                    let addressColumn = `${ad1}, ${ad2}, ${ad3}, ${ad4}, ${ad5}`;


                    let row = "<tr><td>" + code + "</td><td>" + name + "</td><td>" + category +  "</td><td>" + addressColumn + "</td><td>" + contact1 + "</td><td>" + contact2 + "</td><td>"  + email +  "</td></tr>";
                    $("#suppliersTable").append(row);
                    blindClickEventsS()
                }
            },
            error: function (error) {
                loadAllSupplier()
                let message = JSON.parse(error.responseText).message;
                Swal.fire({
                    icon: "error",
                    title: "Request failed",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });
    }
});

/**
 * Clear Method
 */
function clearDetails() {
    $('#name,#category,#S_address_1,#S_address_2,#S_address_3,#S_address_4,#S_address_5,#ContactNo1,#ContactNo2,#email').val("");

}

$("#btnClearSupplier").click(function () {
    clearDetails();
});


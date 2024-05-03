
loadAllSupplier();

/**
 * Employee Save
 * */
$("#btnSaveSupplier").attr('disabled', false);
$("#btnUpdateEmployee").attr('disabled', false);
$("#btnDeleteEmployee").attr('disabled', false);

/**
 * Employee Save
 * Employee ID
 * */
function generateSupplierID() {
    $("#supplier_code").val("E00-001");
    $.ajax({
        url: "http://localhost:8080/back_End/supplier/SupplierIdGenerate",
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (resp) {
            let id = resp.value;
            console.log("id" +id);

            if (id === null){
                $("#supplier_code").val("E00-001" );
            }else {
                let tempId = parseInt(id.split("-")[1]);
                tempId = tempId + 1;
                if (tempId <= 9) {
                    $("#supplier_code").val("E00-00" + tempId);
                } else if (tempId <= 99) {
                    $("#supplier_code").val("E00-0" + tempId);
                } else {
                    $("#supplier_code").val("E00-" + tempId);
                }
            }
        },
        error: function (ob, statusText, error) {

        }
    });
}

/**
 * Button Add New Employee
 * */

$("#btnSaveSupplier").click(function (){

    let formData = $("#supplierForm").serialize();
    console.log(formData);
    $.ajax({
        url: "http://localhost:8080/back_End/supplier",
        method: "POST",
        data: formData,
        dataType: "json",
        success: function (res) {
            console.log(res)
            saveUpdateAlert("Employee", res.message);
            // loadAllEmployee()


        }, error: function (error) {
            unSuccessUpdateAlert("Employee", JSON.parse(error.responseText).message);
        }
    });
});

function setTextFieldValues(code, name,category,address1,address2,address3,address4,address5,contact1,contact2,email) {
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

    $("#supplier_code").focus();
    // checkValidity(employeeValidations);

    $("#btnSaveSupplier").attr('disabled', false);
    $("#btnUpdateEmployee").attr('disabled', false);
    $("#btnDeleteEmployee").attr('disabled',false);
}
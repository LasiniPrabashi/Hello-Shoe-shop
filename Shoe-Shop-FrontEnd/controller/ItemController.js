
loadAllItem();

$("#btnSaveInventory").attr('disabled', false);
$("#btnUpdateInventory").attr('disabled', false);
$("#btnDeleteInventory").attr('disabled', false);

$("#btnSaveInventory").click(function() {

    var image = $("#imgItem");
    var imageUrl = image.attr('src');
    if (!imageUrl || imageUrl === '../../assest/img/login.jpg') {
        alert("Error");
    }

    let formData = $("#InventoryForm").serializeArray();
    formData.push({name: "itemPicture", value: imageUrl});


    $.ajax({
        success: function(res) {
            saveUpdateAlert("Item", res.message);
            loadAllItem()
        },
        url: "http://localhost:8080/back_End/item",
        method: "POST",
        data: formData,
        dataType: "json",
        error: function(xhr, status, error) {
            unSuccessUpdateAlert("Item", JSON.parse(xhr.responseText).message);
        }
    });
});


function loadAllItem() {
    $("#inventoryTable").empty();
    $.ajax({
        url: "http://localhost:8080/back_End/item",
        method: "GET",
        dataType: "json",
        success: function (res) {
            console.log(res);

            for (let i of res.data) {
                let code = i.code;
                let name = i.name;
                let qty = i.qty;
                let itemPicture = i.itemPicture || '';
                let category = i.category;
                let size = i.size;
                let supplier = i.supplier;
                let supName = i.supName;
                let salePrice = i.salePrice;
                let buyPrice = i.buyPrice;
                let expectedProfit = i.expectedProfit;
                let profitMargin = i.profitMargin;
                let status = i.status;


                // Access address properties correctly

                let supId = supplier.code;
                let row = `<tr><td>${code}</td><td>${name}</td><td>${qty}</td><td>${category}</td><td>${size}</td><td>${supId}</td><td>${supName}</td><td>${salePrice}</td><td>${buyPrice}</td><td>${expectedProfit}</td><td>${profitMargin}</td><td>${status}</td></tr>`;
                $("#inventoryTable").append(row);
            }
            blindClickEventsI();

            setTextFieldValuesI("", "", "", "", "", "", "", "", "", "", "", "", "");
            console.log(res.message);
        },
        error: function (error) {
            let message = JSON.parse(error.responseText).message;
            console.log(message);
        }

    });

}


$("#supplier_id").empty();
$.ajax({
    url:  "http://localhost:8080/back_End/supplier",
    method: "GET",
    dataType: "json",
    success: function (res) {
        console.log(res);

        for (let i of res.data) {
            let id = i.code;

            $("#supplier_id").append(`<option>${id}</option>`);
        }
        console.log(res.message);
    },
    error: function (error) {
        let message = JSON.parse(error.responseText).message;
        console.log(message);
    }

});

$("#supplier_id").click(function () {
    var search = $("#supplier_id").val();
    $.ajax({
        url: "http://localhost:8080/back_End/supplier/searchSupplier?code="+ search,
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (res) {
            console.log(res);
            $("#supName").val(res.name);
        },
        error: function (error) {
            let message = JSON.parse(error.responseText).message;
            console.log(message);
        }
    })
});

$('#itemPicture').change(function() {
    var fileInput = $('#itemPicture')[0];
    var file = fileInput.files[0];

    if (file && (file.type.includes('image') || file.type === 'image/gif')) {
        var reader = new FileReader();
        reader.onload = function (e) {

            //itmCaptureClear();
            $('#imgItem').attr('src', e.target.result);
        };
        reader.readAsDataURL(file);
        // $("#itmClear").prop("disabled", false);
        $(this).val("");
    } else {
        //$('#itemImgFileError').text('Please upload an image or GIF.');
        //$('#itemImgFileError').css("border", "1px solid #ced4da");
    }

});

function setTextFieldValuesI(code, name, qty, Item_pic, category, supplier, Supplier_name, Unit_price, buyPrice, expectedProfit, profitMargin, Status) {
    $("#itemId").val(code);
    $("#itemName").val(name);
    $("#qty").val(qty);
    $("#Item_pic").val(Item_pic);
    $("#category").val(category);
    $("#size").val(size);
    $("#supplier_id").val(supplier);
    $("#supName").val(Supplier_name);
    $("#salePrice").val(Unit_price);
    $("#buyPrice").val(buyPrice);
    $("#expectedProfit").val(expectedProfit);
    $("#profitMargin").val(profitMargin);
    $("#status").val(Status);

    $("#itemId").focus();
    $("#btnSaveInventory").attr('disabled', false);
    $("#btnUpdateEmployee").attr('disabled', false);
    $("#btnDeleteEmployee").attr('disabled', false);

}

$("#btnUpdateInventory").click(function () {
    let formData = $("#InventoryForm").serialize();

    $.ajax({
        url: "http://localhost:8080/back_End/item",
        method: "PUT",
        data: formData,
        dataType: "json",
        success: function (res) {
            saveUpdateAlert("Item updated", res.message);
            loadAllSupplier();
        },
        error: function (xhr, status, error) {
            unSuccessUpdateAlert("Item update failed", JSON.parse(xhr.responseText).message);
        }
    });
});

$("#btnDeleteInventory").click(function () {
    let id = $("#itemId").val();
    $.ajax({
        url: "http://localhost:8080/back_End/item?code=" + id,
        method: "DELETE",
        dataType: "json",
        success: function (resp) {
            saveUpdateAlert("Supplier", resp.message);
            loadAllItem()
        },
        error: function (xhr, status, error) {
            let message = JSON.parse(xhr.responseText).message;
            unSuccessUpdateAlert("Supplier", message);
        }
    });
});

function blindClickEventsI() {
    $("#inventoryTable").on("click", "tr", function () {
        let code = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let qty = $(this).children().eq(2).text();
       /* let Item_pic = $(this).children().eq(3).text();*/
        let category = $(this).children().eq(3).text();
        let size = $(this).children().eq(4).text();
        let supplier = $(this).children().eq(5).text();
        let Supplier_name = $(this).children().eq(6).text();
        let Unit_price = $(this).children().eq(7).text();
        let buyPrice = $(this).children().eq(8).text();
        let expectedProfit = $(this).children().eq(9).text();
        let profitMargin = $(this).children().eq(10).text();
        let Status = $(this).children().eq(11).text();


        // Set values to respective input fields
        $("#itemId").val(code);
        $("#itemName").val(name);
        $("#qty").val(qty);
       /* $("#Item_pic").val(Item_pic);*/
        $("#category").val(category);
        $("#size").val(size);
        $("#supplier_id").val(supplier);
        $("#supName").val(Supplier_name);
        $("#salePrice").val(Unit_price);
        $("#buyPrice").val(buyPrice);
        $("#expectedProfit").val(expectedProfit);
        $("#profitMargin").val(profitMargin);
        $("#status").val(Status);

    });

    $("#btnSaveInventory").attr('disabled',false);
}

$("#form1").on("keypress", function (event) {
    if (event.which === 13) {
        var search = $("#form1").val();
        $("#inventoryTable").empty();
        $.ajax({
            url: "http://localhost:8080/back_End/item/searchItem?code="+ search,
            method: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                console.log(res);
                if (res) {
                    let code = i.code;
                    let name = i.name;
                    let qty = i.qty;
                    let itemPicture = i.itemPicture || '';
                    let category = i.category;
                    let size = i.size;
                    let supplier = i.supplier;
                    let supName = i.supName;
                    let salePrice = i.salePrice;
                    let buyPrice = i.buyPrice;
                    let expectedProfit = i.expectedProfit;
                    let profitMargin = i.profitMargin;
                    let status = i.status;


                    // Access address properties correctly

                    let supId = supplier.code;
                    let row = `<tr><td>${code}</td><td>${name}</td><td>${qty}</td><td>${category}</td><td>${size}</td><td>${supId}</td><td>${supName}</td><td>${salePrice}</td><td>${buyPrice}</td><td>${expectedProfit}</td><td>${profitMargin}</td><td>${status}</td></tr>`;
                    $("#inventoryTable").append(row);
                    blindClickEventsI()
                }
            },
            error: function (error) {
                loadAllItem()
                let message = JSON.parse(error.responseText).message;
                Swal.fire({
                    icon: "error",
                    title: "Request failed",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        })
    }

});

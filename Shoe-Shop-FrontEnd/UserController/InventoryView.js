
loadAllItemD()

function loadAllItemD() {
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

$("#form1").on("keypress", function (event) {
    if (event.which === 13) {
        var search = $("#form1").val();
        $("#inventoryTable").empty();

        $.ajax({
            url: "http://localhost:8080/back_End/item/searchItem",
            method: "GET",
            data: {
                code: search,
                name: search
            },
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                console.log(res);
                if (res) {
                    let code = res.code;
                    let name = res.name;
                    let qty = res.shoeType;
                    let category = res.size;
                    let size = res.qty;
                    let supplier = res.supplier;
                    let supName = res.supName;
                    let salePrice = res.salePrice;
                    let buyPrice = res.buyPrice;
                    let expectedProfit = res.expectedProfit;
                    let profitMargin = res.profitMargin;
                    let status = res.status;

                    let supId = supplier_id.code;


                    let row = "<tr>" +
                        "<td>" + code + "</td>" +
                        "<td>" + name + "</td>" +
                        "<td>" + category + "</td>" +
                        "<td>" + size + "</td>" +
                        "<td>" + qty + "</td>" +
                        "<td>" + supId + "</td>" +
                        "<td>" + supName + "</td>" +
                        "<td>" + salePrice + "</td>" +
                        "<td>" + buyPrice + "</td>" +
                        "<td>" + expectedProfit + "</td>" +
                        "<td>" + profitMargin + "</td>" +
                        "<td>" + status + "</td>" +
                        "</tr>";
                    $("#inventoryTable").append(row);
                    blindClickEventsI();
                }
            },
            error: function (error) {
                loadAllItem();
                let message = JSON.parse(error.responseText).message;
                console.error("Error:", message);
            }
        });
    }
});
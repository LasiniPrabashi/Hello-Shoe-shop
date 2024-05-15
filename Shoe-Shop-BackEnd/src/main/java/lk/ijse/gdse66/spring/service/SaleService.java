package lk.ijse.gdse66.spring.service;

import lk.ijse.gdse66.spring.dto.CustomDTO;
import lk.ijse.gdse66.spring.dto.SaleDetailsDTO;
import lk.ijse.gdse66.spring.dto.SalesDTO;
import lk.ijse.gdse66.spring.entity.SaleDetails;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;

public interface SaleService {

    void placeOrder(@RequestBody SalesDTO dto);
    ArrayList<SalesDTO> LoadOrders();
    ArrayList<SaleDetailsDTO> LoadOrderDetails();

    @ResponseBody
    CustomDTO OrderIdGenerate();
    @ResponseBody
    CustomDTO getSumOrders();

    SaleDetails getOrderById(String id);
}

package lk.ijse.gdse66.spring.service;

import lk.ijse.gdse66.spring.dto.CustomDTO;
import lk.ijse.gdse66.spring.dto.SaleDetailsDTO;
import lk.ijse.gdse66.spring.dto.SalesDTO;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;

public interface SaleService {

    void placeOrder(@RequestBody SalesDTO dto);

    ArrayList<SalesDTO> LoadSales();

    ArrayList<SaleDetailsDTO> LoadSalesDetails();

    @ResponseBody
    CustomDTO SaleIdGenerate();

    @ResponseBody
    CustomDTO getSumSales();
}

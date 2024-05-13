package lk.ijse.gdse66.spring.service.impl;

import jakarta.transaction.Transactional;
import lk.ijse.gdse66.spring.dto.CustomDTO;
import lk.ijse.gdse66.spring.dto.SaleDetailsDTO;
import lk.ijse.gdse66.spring.dto.SalesDTO;
import lk.ijse.gdse66.spring.entity.Sales;
import lk.ijse.gdse66.spring.repo.SaleRepo;
import lk.ijse.gdse66.spring.service.SaleService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@Transactional
public class SaleServiceImpl implements SaleService{

    @Autowired
    private SaleRepo repo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public void placeOrder(SalesDTO dto) {
        if (repo.existsById(dto.getOId())){
            throw new RuntimeException("Order Id "+ dto.getOId()+ "Already Exist.Please Enter another id..!");
        }
        repo.save(mapper.map(dto, Sales.class));

    }

    @Override
    public ArrayList<SalesDTO> LoadSales(){
        return mapper.map(repo.findAll(), new TypeToken<ArrayList<SalesDTO>>() {
        }.getType());

    }

    @Override
    public ArrayList<SaleDetailsDTO> LoadSalesDetails(){
        return mapper.map(repo.findAll(), new TypeToken<ArrayList<SaleDetailsDTO>>() {
        }.getType());

    }

    @Override
    public CustomDTO SaleIdGenerate() {
        return new CustomDTO(repo.getLastIndex());

    }

    @Override
    public CustomDTO getSumSales() {
        return null;
    }

}

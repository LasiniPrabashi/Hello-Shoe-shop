package lk.ijse.gdse66.spring.service.impl;

import jakarta.transaction.Transactional;
import lk.ijse.gdse66.spring.dto.CustomDTO;
import lk.ijse.gdse66.spring.dto.SaleDetailsDTO;
import lk.ijse.gdse66.spring.dto.SalesDTO;
import lk.ijse.gdse66.spring.repo.SaleRepo;
import lk.ijse.gdse66.spring.service.SaleService;
import org.modelmapper.ModelMapper;
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

    }

    @Override
    public ArrayList<SalesDTO> LoadSales(){
        return null;
    }

    @Override
    public ArrayList<SaleDetailsDTO> LoadSalesDetails(){
        return null;
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

package lk.ijse.gdse66.spring.service.impl;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lk.ijse.gdse66.spring.dto.CustomDTO;
import lk.ijse.gdse66.spring.dto.SaleDetailsDTO;
import lk.ijse.gdse66.spring.dto.SalesDTO;
import lk.ijse.gdse66.spring.entity.Item;
import lk.ijse.gdse66.spring.entity.SaleDetails;
import lk.ijse.gdse66.spring.entity.Sales;
import lk.ijse.gdse66.spring.repo.ItemRepo;
import lk.ijse.gdse66.spring.repo.SaleDetailsRepo;
import lk.ijse.gdse66.spring.repo.SaleRepo;
import lk.ijse.gdse66.spring.service.SaleService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
@Transactional
public class SaleServiceImpl implements SaleService{

    @Autowired
    private SaleRepo repo;

    @Autowired
    private ItemRepo itemRepo;

    @Autowired
    private SaleDetailsRepo saleDetailsRepo;

    @Autowired
    private ModelMapper mapper;

    public void placeOrder(SalesDTO dto) {
        if (repo.existsById(dto.getOid())){
            throw new RuntimeException("Order Id "+ dto.getOid()+ "Already Exist.Please Enter another id..!");
        }
        Sales sales = mapper.map(dto, Sales.class);

        Sales save = repo.save(sales);

        for (SaleDetailsDTO saleDetailsDTO : dto.getSaleDetails()) {
            if (saleDetailsDTO.getItemCode() == null) {
                throw new IllegalArgumentException("Code must not be null for sale details");
            }

            // Map DTO to entity
            SaleDetails saleDetails = new SaleDetails();
            saleDetails.setQty(saleDetailsDTO.getQty());
            saleDetails.setUnitPrice(saleDetailsDTO.getUnitPrice());
            saleDetails.setItemCode(saleDetailsDTO.getItemCode());
            saleDetails.setOid(saleDetailsDTO.getOId());

            // Save entity to database
            saleDetailsRepo.save(saleDetails);
        }
        for (SaleDetails sd : save.getSaleDetails()) {
            Item item = itemRepo.findById(sd.getItemCode()).get();
            item.setQty(item.getQty() - sd.getQty());
            itemRepo.save(item);
        }
    }




    @Override
    public ArrayList<SalesDTO> LoadOrders() {
        return mapper.map(repo.findAll(), new TypeToken<ArrayList<SalesDTO>>() {
        }.getType());
    }

    @Override
    public ArrayList<SaleDetailsDTO> LoadOrderDetails() {
        return mapper.map(saleDetailsRepo.findAll(), new TypeToken<ArrayList<SaleDetailsDTO>>() {
        }.getType());
    }

    @Override
    public CustomDTO OrderIdGenerate() {
        return new CustomDTO(repo.getLastIndex());
    }

    @Override
    public CustomDTO getSumOrders() {
        return null;
    }

    @Override
    public SaleDetails getOrderById(String id) {
        // Check if the id is null or empty before invoking findById
        if (id == null || id.isEmpty()) {
            throw new IllegalArgumentException("ID must not be null or empty");
        }


        Optional<SaleDetails> optionalSaleDetails = saleDetailsRepo.findById(id);

        if (optionalSaleDetails.isPresent()) {
            return optionalSaleDetails.get();
        } else {
            throw new EntityNotFoundException("Order with id " + id + " not found");
         }
}

}

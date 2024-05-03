package lk.ijse.gdse66.spring.service.impl;

import jakarta.transaction.Transactional;
import lk.ijse.gdse66.spring.dto.CustomDTO;
import lk.ijse.gdse66.spring.dto.SupplierDTO;
import lk.ijse.gdse66.spring.entity.Employee;
import lk.ijse.gdse66.spring.entity.Supplier;
import lk.ijse.gdse66.spring.repo.SupplierRepo;
import lk.ijse.gdse66.spring.service.SupplierService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@Transactional
public class SupplierServiceImpl implements SupplierService {
    @Autowired
    private SupplierRepo repo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public void saveSupplier(SupplierDTO dto) {
        if (repo.existsById(dto.getCode())){
            throw new RuntimeException("Supplier Already Exists. Please enter another id.");
        }

        Supplier supplier=mapper.map(dto,Supplier.class);
        supplier.setAddress(dto.getAddress());
        repo.save(supplier);

    }

    @Override
    public void updateSupplier(SupplierDTO dto) {
        if (!repo.existsById(dto.getCode())){
            throw new RuntimeException("update failed! supplierId : "+dto.getCode());

        }
        repo.save(mapper.map(dto,Supplier.class));

    }

    @Override
    public void deleteSupplier(String id) {
        if (!repo.existsById(id)){
            throw new RuntimeException("Wrong ID..Please enter valid id..!");
        }
        repo.deleteById(id);
    }

    @Override
    public SupplierDTO searchSupId(String id) {
        return null;
    }

    @Override
    public ArrayList<SupplierDTO> loadAllSupplier() {
        return mapper.map(repo.findAll(), new TypeToken<ArrayList<Supplier>>() {
     }.getType());
    }

    @Override
    public CustomDTO supplierIdGenerate() {
        return new CustomDTO(repo.getLastIndex());
    }

    @Override
    public SupplierDTO getSumSupplier() {
        return null;
    }
}

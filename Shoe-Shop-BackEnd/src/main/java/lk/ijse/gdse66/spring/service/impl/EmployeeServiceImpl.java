package lk.ijse.gdse66.spring.service.impl;

import jakarta.transaction.Transactional;
import lk.ijse.gdse66.spring.dto.CustomDTO;
import lk.ijse.gdse66.spring.dto.EmployeeDTO;
import lk.ijse.gdse66.spring.entity.Employee;
import lk.ijse.gdse66.spring.repo.EmployeeRepo;
import lk.ijse.gdse66.spring.service.EmployeeService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@Transactional
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepo repo;

    @Autowired
    private ModelMapper mapper;


    @Override
    public void saveEmployee(EmployeeDTO dto) {

    }

    @Override
    public void updateEmployee(EmployeeDTO dto) {

    }

    @Override
    public void deleteEmployee(EmployeeDTO dto) {

    }

    @Override
    public Employee searchEmpId(String id) {
        return null;
    }

    @Override
    public ArrayList<EmployeeDTO> loadAllEmployee() {
        return null;
    }

    @Override
    public CustomDTO EmployeeIdGenerate() {
        return null;
    }

    @Override
    public CustomDTO getSumEmployee() {
        return null;
    }
}

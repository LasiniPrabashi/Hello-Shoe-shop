package lk.ijse.gdse66.spring.service;

import lk.ijse.gdse66.spring.dto.CustomDTO;
import lk.ijse.gdse66.spring.dto.EmployeeDTO;
import lk.ijse.gdse66.spring.entity.Employee;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;

public interface EmployeeService {

    void saveEmployee(EmployeeDTO dto);
    void updateEmployee(EmployeeDTO dto);
    void deleteEmployee(EmployeeDTO dto);
    Employee searchEmpId(String id);
    ArrayList<EmployeeDTO> loadAllEmployee();

    @ResponseBody
    CustomDTO EmployeeIdGenerate();
    @ResponseBody
    CustomDTO getSumEmployee();

}

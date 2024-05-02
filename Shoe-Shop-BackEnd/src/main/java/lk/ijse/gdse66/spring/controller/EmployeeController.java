package lk.ijse.gdse66.spring.controller;

import lk.ijse.gdse66.spring.dto.CustomDTO;
import lk.ijse.gdse66.spring.dto.EmployeeDTO;
import lk.ijse.gdse66.spring.embeded.Address;
import lk.ijse.gdse66.spring.entity.Employee;
import lk.ijse.gdse66.spring.service.EmployeeService;
import lk.ijse.gdse66.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/employee")
public class EmployeeController {

    @Autowired
    private EmployeeService service;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public ResponseUtil saveEmployee(@ModelAttribute EmployeeDTO employeeDTO, Address address,String profilePic){
        System.out.println(employeeDTO.toString());
        employeeDTO.setAddress(address);
        service.saveEmployee(employeeDTO);
        return new ResponseUtil("OK", "Successfully Registered.!",null);

          }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(path = "/update")
    public ResponseUtil updateEmployee(@ModelAttribute EmployeeDTO employeeDTO,Address address){
        employeeDTO.setAddress(address);
        service.updateEmployee(employeeDTO);
        return new ResponseUtil("OK", "Successfully Updated. :"+ employeeDTO.getCode(),null);

    }

    @ResponseStatus(HttpStatus.CREATED)
    @DeleteMapping
    public ResponseUtil deleteEmployee(@RequestBody EmployeeDTO dto){
        service.deleteEmployee(dto);
        return new ResponseUtil("OK", "Successfully Deleted. :"+ dto.getCode(),null);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/searchEmployee", params = {"emp_id"})
    public Employee searchEmpId(String emp_id){
        return service.searchEmpId(emp_id);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/loadAllEmployee")
    public ResponseUtil getAllEmployee(){
        return new ResponseUtil("OK", "Successfully Loaded. :",
                service.loadAllEmployee());
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/EmployeeIdGenerate")
    public @ResponseBody
    CustomDTO EmployeeIdGenerate() {
        return service.EmployeeIdGenerate();
    }


    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/employeeCount")
    public CustomDTO getSumEmployee(){
        return service.getSumEmployee();
     }

}

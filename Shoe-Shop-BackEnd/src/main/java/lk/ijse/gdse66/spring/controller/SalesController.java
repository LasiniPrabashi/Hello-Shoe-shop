package lk.ijse.gdse66.spring.controller;

import lk.ijse.gdse66.spring.dto.CustomDTO;
import lk.ijse.gdse66.spring.service.SaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/sales")
public class SalesController {

    @Autowired
    private SaleService service;

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/SaleIdGenerate")
    public @ResponseBody
    CustomDTO SaleIdGenerate(){
        return service.SaleIdGenerate();
  }


}

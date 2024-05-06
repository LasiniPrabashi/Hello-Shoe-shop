package lk.ijse.gdse66.spring.service;

import lk.ijse.gdse66.spring.dto.CustomDTO;
import lk.ijse.gdse66.spring.dto.EmployeeDTO;
import lk.ijse.gdse66.spring.dto.ItemDTO;
import lk.ijse.gdse66.spring.entity.Employee;
import lk.ijse.gdse66.spring.entity.Item;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;

public interface ItemService {

    void saveItem(ItemDTO dto);
    void updateItem(ItemDTO dto);
    void deleteItem(String id);
    ItemDTO searchItemId(String id);
    ArrayList<ItemDTO> loadAllItem();

    @ResponseBody
    CustomDTO getSumItem();
}

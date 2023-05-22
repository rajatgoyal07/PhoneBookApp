package com.mpokket.contactbackend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contacts")
public class ContactController {
    private final ContactService contactService;

    @Autowired
    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @GetMapping
    public List<ContactEntity> getAllContacts() {
        return contactService.getAllContacts();
    }

    @PostMapping
    public ContactEntity createContact(@RequestBody ContactEntity contact) {
        return contactService.createContact(contact);
    }

    @PutMapping("/{id}")
    public ContactEntity updateContact(@PathVariable Long id, @RequestBody ContactEntity updatedContact) {
        return contactService.updateContact(id, updatedContact);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteContact(@PathVariable Long id) {
        contactService.deleteContact(id);
        return ResponseEntity.ok().build();
    }
}

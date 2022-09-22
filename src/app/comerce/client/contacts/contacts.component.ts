import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { InformationsService } from 'src/app/services/informations.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  modalReference: NgbModalRef;
  isLoading = false
  page = 1
  @Input() contacts
  @Input() allTypeContacts=[]
  objectKeys = Object.keys;
  contactFormGroup: FormGroup;
  items = { 
    typeContact : "active",
    civilite : "active",
    nomPrenom : "active",
    telephone:"active",
    mobile:"active",
    email:"active",
  };

  itemsVariable = { 
    typeContact : "active",
    civilite : "active",
    nomPrenom : "active",
    telephone:"active",
    mobile:"active",
    email:"active",
  };
  
  id = 0
  contact = {
    id: 0,
    typeContact : "",
    civilite : "",
    nomPrenom : "",
    telephone:"",
    mobile:"",
    email:""
  }

  erreurContact = {
    typeContact : "",
    civilite : "",
    nomPrenom : "",
    telephone:"",
    mobile:"",
    email:""
  }

  public visible = false;
  closeResult = '';

  constructor(
    private modalService: NgbModal,
    private http: HttpClient, 
    public informationGenerale: InformationsService,) {

  }

  options2: NgbModalOptions = {
    container: '.session-modal-container'
  };

  open(content) {
  
    this.modalReference = this.modalService.open(content, this.options2);
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
  }

  openModifier(content,contact) {
  
    for(let i = 0; i < this.contacts.length; i++){
      if(this.contacts[i].id == contact.id){
        for(let key in this.contact){
          this.contact[key] = this.contacts[i][key]
        }
      }
    }

    this.modalReference = this.modalService.open(content,contact);
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
  }

  JoinAndClose() {
    this.modalReference.close();
  }

  ngOnInit(): void {

  }

  
  controleInputs() {
    var tabErreur = {
      typeContact : "typeContact",
      civilite : "civilite",
      nomPrenom : "nomPrenom",
      telephone:"telephoneContact",
      mobile:"mobileContact",
      email:"emailContact"
    }
    
    for(let key in this.erreurContact){
      this.erreurContact[key] = ""
      document.getElementById(tabErreur[key]).classList.remove("border-erreur")
    }

    var isValid = true

    for(let key in this.erreurContact){
      if(this.contact[key] == ""){
        document.getElementById(tabErreur[key]).classList.add("border-erreur")
        this.erreurContact[key] = "Veuillez remplir ce champ"
        isValid = false
      }
    }   
    return isValid
  }

  enregistrerContact() {
    if (!this.controleInputs()) {
      return
    }
    this.id++;
    this.contacts.push(this.contact);  
    this.contact = {
      id : this.id,
      typeContact : "",
      civilite : "",
      nomPrenom : "",
      telephone:"",
      mobile:"",
      email:""
    }
    this.JoinAndClose()
  }

  tabEmpty = []
  inisialiserEmptyTab(){
    this.tabEmpty = []
    for(let i = 0; i < (6 - this.contacts.length); i++){
      this.tabEmpty.push({})
    }
    return true
  }

  modifierContact(id) {
    if (!this.controleInputs()) {
      return
    } 
   
    this.supprimerContact(this.contact.id)
    
    this.contacts.push(this.contact);  
    
    this.contact = {
      id : this.id,
      typeContact : "",
      civilite : "",
      nomPrenom : "",
      telephone:"",
      mobile:"",
      email:""
    }
    this.JoinAndClose()

  }

  supprimerContact(id){
    for(let i = 0; i < this.contacts.length; i++){
      if(this.contacts[i].id == id){
        this.contacts.splice(i,1);
      }
    }
  }

}

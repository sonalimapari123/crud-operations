import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PersonService } from './person.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  title = 'crud';
  personDetails: any;
  personForm: any = FormGroup;
  modalTitle: any;
  isUpdateMode: boolean = false;

  constructor(private personService: PersonService, private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit() {
    this.initializeForm();
    this.getData();
  }

  initializeForm() {
    this.personForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      email: new FormControl(''),
      dateOfBirth: new FormControl(''),
      avtar: new FormControl(''),
      country: new FormControl('')
    });
  }

  getData() {
    this.personService.getperson().subscribe((data: any) => {
      console.log(data);
      this.personDetails = data;
    });
  }

  openModal(mode: 'add' | 'update', item?: any) {
    this.isUpdateMode = mode === 'update' && !!item;
    this.modalTitle = this.isUpdateMode ? 'Update Person Form' : 'Add Person Form';
    if (this.isUpdateMode) {
      this.populateForm(item);
    } else {
      this.personForm.reset();
    }

    const modalElement = this.el.nativeElement.querySelector('#exampleModal');
    this.renderer.addClass(modalElement, 'show');
    this.renderer.setStyle(modalElement, 'display', 'block');
    this.renderer.setAttribute(modalElement, 'aria-modal', 'true');
  }

  populateForm(item: any) {
    this.personForm.patchValue({
      id: item.id,
      name: item.name,
      email: item.email,
      dateOfBirth: item.dateOfBirth,
      avtar: '', // Ensure not setting value for file input here
      country: item.country
    });
  }

  submit() {
    if (this.isUpdateMode) {
      this.updatePerson();
    } else {
      this.addPerson();
    }
  }

  addPerson() {
    this.personService.addperson(this.personForm.value).subscribe((data) => {
      console.log(data);
      this.hideModal();
      this.getData();
    });
  }

  updatePerson() {
    const id = this.personForm.value.id;
    const updatedData = this.personForm.value;
    this.personService.updateperson(id, updatedData).subscribe((data) => {
      console.log(data);
      this.hideModal();
      this.getData();
    });
  }
  close(){
    this.hideModal();
  }

  hideModal() {
    const modalElement = this.el.nativeElement.querySelector('#exampleModal');
    this.renderer.removeClass(modalElement, 'show');
    this.renderer.setStyle(modalElement, 'display', 'none');
    this.renderer.setAttribute(modalElement, 'aria-modal', 'false');
  }

  calculateAge(dateOfBirth: string): number {
    const dob = new Date(dateOfBirth);
    const ageDate = new Date(Date.now() - dob.getTime());
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
  delete(id:any){
    // const id = this.personForm.value.id;
this.personService.deletePerson(id).subscribe((data)=>{
  console.log(data);
  this.getData();
})
  }
  
  
}

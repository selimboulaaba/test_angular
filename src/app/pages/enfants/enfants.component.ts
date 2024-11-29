import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Enfant } from 'src/app/models/Enfant';
import { EnfantsService } from 'src/app/services/enfants.service';
import { ToastServiceService } from 'src/app/services/toast-service.service';

@Component({
  selector: 'app-enfants',
  templateUrl: './enfants.component.html',
  styleUrls: ['./enfants.component.css']
})
export class EnfantsComponent implements OnInit {

  enfants!: Enfant[];
  enfant!: Enfant;
  profileForm!: FormGroup;
  parentLoading = true;
  childLoading = true;
  username: string = "";
  checked: boolean = false;

  constructor(private enfantsService: EnfantsService, private fb: FormBuilder, private toastService: ToastServiceService) { }

  ngOnInit(): void {
    this.fetchEnfants();
  }

  fetchEnfants() {
    this.enfantsService.getEnfants().subscribe(
      (data: Enfant[]) => {
        this.enfants = data;
        setTimeout(() => {
          this.parentLoading = false;
        }, 1000);
        console.log(data);
        this.selectChild(data[0].id)
      }
    )
  }

  selectChild(id: number) {
    this.username = "";
    this.checked = false;
    this.childLoading = true;
    console.log(id)
    this.enfantsService.getEnfant(id).subscribe(
      (data: Enfant) => {
        this.enfant = data;
        setTimeout(() => {
          this.childLoading = false;
        }, 1000);
        console.log(data);
        this.initializeForm();
      }
    )
  }

  initializeForm() {
    if (this.profileForm) {
      this.profileForm.reset();
    }
    this.profileForm = this.fb.group({
      id: [this.enfant.id, Validators.required],
      parent: [this.enfant.parent.id, Validators.required],
      first_name: [this.enfant.user.first_name, Validators.required],
      last_name: [this.enfant.user.last_name, Validators.required],
      birthday: [this.enfant.user.birthday, Validators.required],
      gender: [this.enfant.user.gender, Validators.required],
    });
  }

  updateChild() {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }
    console.log(this.profileForm.value)
    this.enfantsService.updateEnfant(this.profileForm.value).subscribe(
      (data: any) => {
        this.toastService.showSuccess('Enfant Updated!');
      },
      (error: any) => {
        this.toastService.showError('There has been an Error!');
      }
    )
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Profile } from 'src/app/models/Profile';
import { ProfileService } from 'src/app/services/profile.service';
import { ToastServiceService } from 'src/app/services/toast-service.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile!: Profile;
  profileForm!: FormGroup;
  loading = true;

  constructor(private profileService: ProfileService, private fb: FormBuilder, private toastService: ToastServiceService) { }

  ngOnInit(): void {
    this.fetchProfile();
  }

  fetchProfile() {
    this.profileService.getProfile().subscribe(
      (data: Profile) => {
        this.profile = data;
        console.log(data);
        this.initializeForm();
      }
    )
  }

  initializeForm() {
    this.profileForm = this.fb.group({
      username: [this.profile.username, Validators.required],
      first_name: [this.profile.first_name, Validators.required],
      last_name: [this.profile.last_name, Validators.required],
      birthday: [this.profile.birthday, Validators.required],
      gender: [this.profile.gender, Validators.required],
      telephone: [this.profile.telephone, Validators.required],
      email: [{ value: this.profile.email, disabled: true }, [Validators.required]],
    });
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  updateProfile() {
    this.profileForm.get('email')?.enable();
    this.profileService.updateProfile(this.profileForm.value).subscribe(
      (data: any) => {
        this.toastService.showSuccess('Profile Updated!');
      },
      (error: any) => {
        this.toastService.showError('There has been an Error!');
      }
    )
  }

}

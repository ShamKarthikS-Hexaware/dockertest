import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { HumanService } from "../human.service";

@Component({
  selector: "app-add-human",
  templateUrl: "./add-human.component.html",
  styleUrls: ["./add-human.component.css"],
})
export class AddHumanComponent implements OnInit {
  form!: FormGroup;

  constructor(
    public fb: FormBuilder,
    private _router: Router,
    public service: HumanService
  ) {}

  ngOnInit(): void {
    this.submit();
  }

  submit() {
    this.form = this.fb.group({
      name: ["", [Validators.required]],
      age: ["", [Validators.required]],
      planet: ["", [Validators.required]],
    });
  }

  add() {
    if (this.form.valid) {
      this.service.addHuman(this.form.value).subscribe((res) => {
        this._router.navigate(["/list-human/"]);
      });
    }
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  };
}

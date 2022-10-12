import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Human } from "../human";
import { HumanService } from "../human.service";

@Component({
  selector: "app-edit-human",
  templateUrl: "./edit-human.component.html",
  styleUrls: ["./edit-human.component.css"],
})
export class EditHumanComponent implements OnInit {
  data!: Human;
  id!: any;
  form!: FormGroup;
  private sub!: Subscription;

  constructor(
    public fb: FormBuilder,
    private _router: Router,
    public service: HumanService,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    var id = this.actRoute.snapshot.params["id"];
    this.service.getHumanById(id).subscribe((data: Human) => {
      this.data = data;
    });
    this.update();
  }

  update() {
    this.form = new FormGroup({
      name: new FormControl("", [Validators.required]),
      age: new FormControl("", [Validators.required]),
      planet: new FormControl("", [Validators.required]),
    });
  }

  edit() {
    if (this.form.valid) {
      var id = this.actRoute.snapshot.params["id"];
      this.service.editHuman(id, this.form.value).subscribe((res) => {
        this._router.navigate(["/list-human/"]);
      });
    }
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  };
}

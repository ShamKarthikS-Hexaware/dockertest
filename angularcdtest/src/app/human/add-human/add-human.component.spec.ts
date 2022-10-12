import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";
import { HumanService } from "../human.service";
import { AddHumanComponent } from "./add-human.component";

describe("AddHumanComponent", () => {
  let mockrouter: any;
  let mockHumanService: any;
  let fixture: ComponentFixture<AddHumanComponent>;
  let component: AddHumanComponent;

  beforeEach(() => {
    mockHumanService = jasmine.createSpyObj(["addHuman"]);
    mockrouter = jasmine.createSpyObj("Router", ["navigate"]);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AddHumanComponent],
      providers: [
        FormBuilder,
        {
          provide: HumanService,
          useValue: mockHumanService,
        },
        {
          provide: Router,
          useValue: mockrouter,
        },
      ],
    });

    fixture = TestBed.createComponent(AddHumanComponent);
    component = fixture.componentInstance;
  });

  describe("add", () => {
    beforeEach(() => {
      mockHumanService.addHuman.and.returnValue(of(true));
      fixture.detectChanges();
    });

    it("should add Human and navigate to list Human", () => {
      component.form.setValue({
        name: "name",
        age: "age",
        planet: "planet",
      });
      component.add();
      mockrouter.navigate.and.returnValue(Promise.resolve(true));
      expect(mockrouter.navigate).toHaveBeenCalledWith(["/list-human/"]);
    });
  });
});

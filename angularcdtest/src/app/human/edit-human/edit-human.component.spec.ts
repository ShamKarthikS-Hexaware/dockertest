import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";
import { Human } from "../human";
import { HumanService } from "../human.service";
import { EditHumanComponent } from "./edit-human.component";

describe("EditHumanComponent", () => {
  let mockrouter: any;
  let mockActivatedRoute: any;
  let mockdata: Human;
  let mockHumanService: any;
  let component: EditHumanComponent;
  let fixture: ComponentFixture<EditHumanComponent>;

  beforeEach(() => {
    mockdata = {
      name: "name",
      age: "age",
      planet: "planet",
    };

    mockHumanService = jasmine.createSpyObj(["getHumanById", "editHuman"]);
    mockrouter = jasmine.createSpyObj("Router", ["navigate"]);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [EditHumanComponent],
      providers: [
        FormBuilder,
        { provide: HumanService, useValue: mockHumanService },
        {
          provide: ActivatedRoute,
          useValue: (mockActivatedRoute = {
            snapshot: { params: { id: "1" } },
          }),
        },
        { provide: Router, useValue: mockrouter },
      ],
    });
    fixture = TestBed.createComponent(EditHumanComponent);
    component = fixture.componentInstance;
  });

  it("should get the Human by id", () => {
    component.id = mockActivatedRoute.snapshot.params["id"];
    mockHumanService.getHumanById.and.returnValue(of(mockdata));
    fixture.detectChanges();
    expect(component.data).toEqual(mockdata);
  });

  describe("edit", () => {
    beforeEach(() => {
      component.id = mockActivatedRoute.snapshot.params["id"];
      mockHumanService.getHumanById.and.returnValue(of(mockdata));
      mockHumanService.editHuman.and.returnValue(of(true));
      fixture.detectChanges();
    });

    it("should edit the Human by id", () => {
      component.id = mockActivatedRoute.snapshot.params["id"];
      component.form.setValue({
        name: "name",
        age: "age",
        planet: "planet",
      });
      component.edit();
      mockrouter.navigate.and.returnValue(Promise.resolve(true));
      expect(mockrouter.navigate).toHaveBeenCalledWith(["/list-human/"]);
    });
  });
});

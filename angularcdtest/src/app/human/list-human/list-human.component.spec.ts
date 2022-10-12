import { ComponentFixture, TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { HumanService } from "../human.service";
import { ListHumanComponent } from "./list-human.component";
import { Human } from "../human";

describe("ListHumanComponent", () => {
  let mockpaginator: any;
  let mockdata: Human[] = [];
  let mockHumanService: any;
  let fixture: ComponentFixture<ListHumanComponent>;
  let component: ListHumanComponent;

  beforeEach(() => {
    mockdata = [
      {
        name: "name",
        age: "age",
        planet: "planet",
      },
    ];

    mockHumanService = jasmine.createSpyObj(["getHuman", "deleteHuman"]);
    mockpaginator = jasmine.createSpyObj("MatPaginator", ["pageIndex"]);

    TestBed.configureTestingModule({
      declarations: [ListHumanComponent],
      providers: [
        {
          provide: HumanService,
          useValue: mockHumanService,
        },
      ],
    });

    fixture = TestBed.createComponent(ListHumanComponent);
    component = fixture.componentInstance;
  });

  it("should get all the Humans", async () => {
    mockHumanService.getHuman.and.returnValue(of(mockdata));
    fixture.detectChanges();
    expect(component.data).toBe(mockdata);
  });

  describe("delete", () => {
    beforeEach(() => {
      mockHumanService.deleteHuman.and.returnValue(of(true));
      component.dataSource.data = mockdata;
      component.paginator = mockpaginator;
    });

    it("should delete the Human by id", () => {
      component.delete(0, 0);
      expect(component.data.length).toBe(0);
    });
  });
});

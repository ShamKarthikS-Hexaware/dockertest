import { Component, ViewChild, OnInit } from "@angular/core";
import { HumanService } from "../human.service";
import { Human } from "../human";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-list-human",
  templateUrl: "./list-human.component.html",
  styleUrls: ["./list-human.component.css"],
})
export class ListHumanComponent implements OnInit {
  data: Human[] = [];
  dataSource = new MatTableDataSource<Human>();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  displayedColumns: string[] = ["name", "age", "planet", "action"];

  constructor(public service: HumanService) {}

  ngOnInit(): void {
    this.service.getHuman().subscribe((data: Human[]) => {
      this.data = data;
      this.dataSource = new MatTableDataSource<Human>(this.data);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    });
  }

  delete(index: number, id: number) {
    const data = this.dataSource.data;
    data.splice(this.paginator.pageIndex * this.paginator.pageSize + index, 1);
    this.dataSource.data = data;
    this.service.deleteHuman(id).subscribe();
  }
}

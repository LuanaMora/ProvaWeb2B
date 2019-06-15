import { Component, OnInit, ViewChild } from '@angular/core';
import { Vacina } from '../model/vacina';
import { VacinaService } from '../vacina.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { DialogComponent } from 'src/shared/dialog/dialog.component';

@Component({
  selector: 'app-vacina',
  templateUrl: './vacina.component.html',
  styleUrls: ['./vacina.component.css']
})
export class VacinaComponent implements OnInit {

  vacinaModel: Vacina;
  public vacinaList: Array<Vacina>;
  public edit: boolean;

  displayedColumns: string[] = ['actionsColumn', 'idVacina', 'dtVacina', 'peso', 'dosagem', 'aplicador', 'descricaomedicamento', 'animal'];
  public dataSource: any;

  @ViewChild(MatPaginator) paginatorCustom: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private vacinaService: VacinaService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.vacinaModel = new Vacina();
    this.listAll();
  }

  listAll() {
    this.vacinaService.listAll().subscribe(sucesso => {
      if (sucesso != null)
      console.log(sucesso);
      this.atualizaTable(sucesso);
    },
      error => {
        console.log(error);
      });
  }

  atualizaTable(sucesso: any) {
    this.dataSource = new MatTableDataSource<Vacina>(sucesso);
    this.dataSource.paginator = this.paginatorCustom;
    this.dataSource.sort = this.sort;
  }

  update(){
    
  }


  salvar() {
    console.log("Salvar Vacina");
    console.log(this.vacinaModel);
    if (this.edit == true) {
      this.vacinaService.update(this.vacinaModel).subscribe(sucesso => {
        if (sucesso != null)
          console.log(sucesso);
          this.listAll();
      },
        error => {
          console.log(error);
        });
    } else {
      this.vacinaService.save(this.vacinaModel).subscribe(sucesso => {
        if (sucesso != null)
          console.log(sucesso); 
          this.listAll();
      },
        error => {
          console.log(error);
        });
    }
  }

  delete(id: number) {
    this.vacinaService.delete(id).subscribe(sucesso => {
      if (sucesso != null)
        console.log(sucesso);
      this.listAll(); //Não usa-se o atualizaTable() porque o mesmo irá tentar buscar um código que ja foi deletado do banco 
    },
      error => {
        console.log(error);
      });
  }


}

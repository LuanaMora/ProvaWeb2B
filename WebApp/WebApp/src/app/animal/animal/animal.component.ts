import { Component, OnInit, ViewChild } from '@angular/core';
import { Animal } from 'src/app/vacina/model/animal';
import { AnimalService } from '../animal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css']
})
export class AnimalComponent implements OnInit {

  animalModel: Animal;
  public animalList: Array<Animal>;
  public edit: boolean;

  displayedColumns: string[] = ['actionsColumn', 'idAnimal', 'descricao'];
  public dataSource: any;

  @ViewChild(MatPaginator) paginatorCustom: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private animalService: AnimalService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit() {
      this.animalModel = new Animal();
      this.listAll();
  }

  listAll() {
    this.animalService.listAll().subscribe(sucesso => {
      if (sucesso != null)
      console.log(sucesso);
      this.atualizaTable(sucesso);
    },
      error => {
        console.log(error);
      });
  }

  atualizaTable(sucesso: any) {
    this.dataSource = new MatTableDataSource<Animal>(sucesso);
    this.dataSource.paginator = this.paginatorCustom;
    this.dataSource.sort = this.sort;
  }

  salvar() {
    console.log("Salvar Animal");
    console.log(this.animalModel);
    if (this.edit == true) {
      this.animalService.update(this.animalModel).subscribe(sucesso => {
        if (sucesso != null)
          console.log(sucesso);
          this.listAll();
      },
        error => {
          console.log(error);
        });
    } else {
      this.animalService.save(this.animalModel).subscribe(sucesso => {
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
    this.animalService.delete(id).subscribe(sucesso => {
      if (sucesso != null)
        console.log(sucesso);
      this.listAll(); //Não usa-se o atualizaTable() porque o mesmo irá tentar buscar um código que ja foi deletado do banco 
    },
      error => {
        console.log(error);
      });
  }


}

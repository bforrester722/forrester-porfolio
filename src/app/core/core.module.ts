import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { DataService } from './data.service';
import { FirestoreService } from './firestore.service';
import { ProjectService } from './project.service';

@NgModule({
    imports: [ HttpClientModule ],
    providers: [ DataService, FirestoreService, ProjectService ]
})
export class CoreModule { }
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipeFilterPipe } from './pipe-filter.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [PipeFilterPipe],
  declarations: [PipeFilterPipe]
})
export class AppCustomModule { }

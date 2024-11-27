import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LayoutService } from "./service/app.layout.service";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-footer',
    templateUrl: './app.footer.component.html',
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    standalone: true,
    imports: [],
})
export class AppFooterComponent {
    constructor(public layoutService: LayoutService) { }
}

import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { UserService } from '@core';

import { MSTopbarNavLink, MSTopbarService } from '../../services/topbar.service';

@Component({
  selector: 'ms-topbar',
  templateUrl: './topbar.component.html',
  host: {
    '[class.alain-ms__topbar]': 'true',
    '[class.alain-ms__topbar-single]': 'allNav',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MSTopbarComponent implements OnInit {
  inited = false;

  links: MSTopbarNavLink[];

  @Input() allNav = false;

  constructor(private srv: MSTopbarService, public userSrv: UserService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.srv.getData().subscribe(() => {
      this.inited = true;
      this.mergeLinks();
      this.cdr.detectChanges();
    });
  }

  private mergeLinks() {
    const res = this.srv.data.navLinks;
    this.links = [res.finance, res.workorder, res.support].map(i => {
      if (i.className == null) {
        i.className = '';
      }
      if (!i.links || i.links.length === 0) {
        i.links = null;
      } else {
        i.className += ' alain-ms__topbar-dd';
      }
      return i;
    });
  }
}

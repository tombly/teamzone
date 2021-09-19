import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  dataService: DataService
  rows: MemberRow[];

  constructor(d: DataService) {
    this.dataService = d;
    this.rows = [];
  }

  ngOnInit(): void {
    this.dataService.membersChange.subscribe((value) => {
      this.updateRows();
      this.updateTime();
    });

    this.updateRows();
    this.updateTime();

    setInterval(() => {
      this.updateTime();
    }, 1000);
  }

  updateRows(): void {
    this.rows = [];
    for (let member of this.dataService.members) {
      this.rows.push({
        name: member.name,
        timeZone: member.timeZone,
        hour: '',
        minute: '',
        ampm: ''
      });
    }
  }

  updateTime(): void {
    for (let member of this.rows) {
      const now = DateTime.now().setZone(member.timeZone);
      member.hour = this.zeroPad((now.hour % 12).toString());
      member.minute = this.zeroPad(now.minute.toString());
      if (now.hour > 12) {
        member.ampm = 'PM';
      }
      else {
        member.ampm = 'AM';
      }
    }
  }

  // Returns a zero-padded string of length 2.
  zeroPad(n: string): string {
    const width = 2;
    const z = '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }
}

export class MemberRow {
  name: string = '';
  timeZone: string = '';
  hour: string = '';
  minute: string = '';
  ampm: string = '';
}

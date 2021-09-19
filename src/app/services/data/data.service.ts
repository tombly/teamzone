import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  members: Member[] = [];
  membersChange: Subject<Member[]> = new Subject<Member[]>();

  constructor() {
    let storedJson = localStorage.getItem('members') || '';
    if (storedJson !== '') {
      this.members = JSON.parse(storedJson);
    }
  }

  reset(): void {
    this.members = [];
    localStorage.setItem('members', JSON.stringify(this.members));
    this.membersChange.next(this.members);
  }

  addMember(name: string, timeZone: string): void {
    this.members.push({
      name: name,
      timeZone: timeZone
    });
    this.members.sort((a, b) => (a.name > b.name) ? 1 : -1)
    localStorage.setItem('members', JSON.stringify(this.members));
  }
}

export class Member {
  name: string = '';
  timeZone: string = '';
}

import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  userId!: any;
  userDetails: any;
  username!: string;
  employerName!: string;
  employeeName!: string;
  checkInDisable = true
  checkOutDisable = true

  // Attencance 
  isLoading: boolean = false;
  todayDate: any = '';
  todayCheckLogs: any[] = [];
  todaySortedLogs: any[] = [];
  currentTime: any = ''
  today: number = Date.now()
  todayLogs: any[] = []
  status: any;

  constructor(
    private _itemService: ItemService,
    private _auth: AuthService,
  ) {
    setInterval(() => {
      const currentDate = new Date();
      this.currentTime = currentDate.toLocaleString();
    }, 1000);
    this.getAllAttendance()

    this.todayDate = new Date().toLocaleDateString();

  }

  updateAttendance(checkType: string, e: any) {

    const employeeProfile = this._auth.loadFromLocalStorage();
    const employeeId = employeeProfile.userId
    const employeeEmail = employeeProfile.email

    const attendaceData = {
      "attendance_log": {
        type: checkType,
        user_id: employeeId,
        user_email: employeeEmail,
        is_approved: false,
        timestamp: new Date().toISOString(),
      }
    }
    this.isLoading = true;
    this._itemService.create(attendaceData, '').subscribe(data => {
      this.isLoading = false;
      console.log(this.isLoading);

      this.getAllAttendance()
    })

  }

  getAllAttendance() {
    this.isLoading = true;
    const attendanceData = this._itemService.getAll('attendance_log').subscribe({
      next: (x: any) => {
        this.isLoading = false;
        console.log(this.isLoading);
        this.enableButtons(x)
        // this.getMonthlyAttendance(data)
      },
      error: (err: any) => {
        console.log(err);

      }
    });


  }

  async enableButtons(data: any) {
    let todayDate: any = new Date()
    todayDate = todayDate.toLocaleDateString()
    const attendanceList = data.data.map((date: any, index: number) => {
      const yymmddFormat = new Date(date.data.attendance_log.timestamp).toLocaleDateString()
      if (todayDate === yymmddFormat) {
        if (!this.todayCheckLogs.includes(date)) this.todayCheckLogs.push(date)
      }
      return yymmddFormat
    })

    this.listTodaysLogs()

    if (attendanceList.includes(todayDate)) {
      const checkList = attendanceList.filter((date: any) => todayDate === date)

      if (checkList.length % 2 === 0) {
        this.checkInDisable = false
        this.checkOutDisable = true
      } else {
        this.checkInDisable = true
        this.checkOutDisable = false
      }
    } else {
      this.checkInDisable = false
      this.checkOutDisable = true
    }


  }

  listTodaysLogs() {
    this.todaySortedLogs = this.todayCheckLogs.sort((a: any, b: any) => {
      return new Date(a.data.attendance_log.timestamp).getTime() - new Date(b.data.attendance_log.timestamp).getTime()
    })
    const logs = []
    for (let i = 0; i < this.todaySortedLogs.length; i + 2) {
      logs.push(this.todaySortedLogs.splice(i, 2))
    }
    this.manageTodaysLogs(logs)
  }

  manageTodaysLogs(logs: any) {
    this.todayLogs = logs.map((log: any, index: number) => {
      const checkinTime = new Date(log[0]?.data.attendance_log.timestamp)
      const checkoutTime: any = log[1]?.data.attendance_log.timestamp ? new Date(log[1]?.data.attendance_log.timestamp) : ''
      let diffTime: any = {}
      if (checkoutTime) {
        const diff = checkoutTime.getTime() - checkinTime.getTime()
        const days = Math.floor(diff / (60 * 60 * 24 * 1000));
        const hours = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
        const minutes = Math.floor(diff / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));
        const seconds = Math.floor(diff / 1000) - ((days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60));
        diffTime = { day: days, hour: hours, minute: minutes, second: seconds }
      }

      const obj = {
        id: index,
        checkin: checkinTime.toLocaleTimeString(),
        checkout: checkoutTime ? checkoutTime.toLocaleTimeString() : '',
        workTime: diffTime
      }
      return obj
    })
  }
}

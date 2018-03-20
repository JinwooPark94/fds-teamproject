// observable-event-http.component
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

// Observable operators
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-main',
  templateUrl: 'main.component.html'
})

export class MainComponent implements OnInit, OnDestroy {
  clickStatus = false;
  inputText: FormControl = new FormControl('');
  subscription: Subscription;
  listAddress: Object;

  constructor(public http: HttpClient) {}

  ngOnInit() {
    // ① valueChanges 이벤트 옵저버블을 구독하면 컨트롤 값의 변경 내용을 옵저버블 스트림으로 수신할 수 있다.
    this.subscription = this.inputText.valueChanges
      // ③ debounceTime 오퍼레이터는 다음 이벤트를 즉시 발생시키지 않고 지정 시간만큼 지연시킨다.
      .debounceTime(500)
      // ④ switchMap 오퍼레이터는 옵저버블을 받아서 새로운 옵저버블을 생성한다.
      .switchMap(InputValue => this.getInputData(InputValue))
      // ⑥ 옵저버블을 subscribe 오퍼레이터로 구독하면 옵저버가 데이터 스트림을 사용할 수 있다.
      .subscribe(AddressData => this.listAddress = AddressData);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getInputData(Inputdd: string): Observable<any> {
    const params = new HttpParams()
      .set('confmKey', 'U01TX0FVVEgyMDE4MDMxODIxMzA0MzEwNzczNjI=')
      .set('countPerPage', '5')
      .set('keyword', Inputdd )
      .set('resultType', 'json');

    return this.http
      .get<any>(`http://www.juso.go.kr/addrlink/addrLinkApi.do`, { params })
      .map(address => (address.results.juso))
      .do(console.log)
      // ⑦ Error handling
      .catch(err => {
        if (err.status === 404) {
          console.log(`[ERROR] Not found user:`);
          return Observable.of<any>(err);
        } else {
          throw err;
        }
      });
  }
    // const url = 'http://www.juso.go.kr/addrlink/addrLinkApi.do';
    // console.log(formData);
    // const params = new HttpParams()
    //   .set('confmKey', 'U01TX0FVVEgyMDE4MDMxODIxMzA0MzEwNzczNjI=')
    //   .set('countPerPage', '5')
    //   .set('keyword', this.inputText)
    //   .set('resultType', 'json');

    // this.http.get(url, { params })
    //   .subscribe(res => {
    //     return res.results.juso;
    // });
}

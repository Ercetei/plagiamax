import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../shared/services/user.service';
import {HttpErrorResponse} from '@angular/common/http';
import {HttpClient} from '@angular/common/http';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import {AngularFireLiteDatabase, AngularFireLiteAuth, AngularFireLiteFirestore} from 'angularfire-lite';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.component.scss'],
  providers: [NgbCarouselConfig]
})
export class HomeComponent implements OnInit {
  csrf: any;
  userClaims: any;
  images = [
    '../../assets/img/banner-1.jpg',
    '../../assets/img/banner-2.jpg'
  ];

  databaseData;
  databaseList;
  databaseQuery;

  firestoreData;
  firestoreList;
  firestoreQuery;

  authState;

  constructor(private router: Router,
    private userService: UserService,
    config: NgbCarouselConfig,
    private http: HttpClient,
    public db: AngularFireLiteDatabase,
    public auth: AngularFireLiteAuth,
    public firestore: AngularFireLiteFirestore
  ) {
    // customize default values of carousels used by this component tree
    config.interval = 10000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;
  }

    ngOnInit() {

        // Realtime Database
        this.db.read('hello/hello').subscribe((data) => {
            this.databaseData = data;
        });


        // Realtime Database list retrieval
        this.databaseList = this.db.read('hello');


        // Realtime Database query
        this.db.query('hello').limitToLast(1).orderByKey().on('value').subscribe((data) => {
            this.databaseQuery = data;
        });

        // Firestore
        this.firestore.read('hello/hellodoc').subscribe((data) => {
            this.firestoreData = data;
        });

        // Firestore  list retrieval
        this.firestoreList = this.firestore.read('hello');

        // Firestore Query
        this.firestore.query('query').limit(1).on().subscribe((data) => {
            this.firestoreQuery = data;
        });

        // Firestore batched writes
        this.firestore.batch()
            .set('batchCollection/batchDoc', {set: 'this is a batch set'})
            .update('batchCollection/batchDoc', {update: 'this is a batch update'})
            .commit()
            .subscribe(() => {
                console.log('batched writes complete');
            });

        // Firestore transaction
        this.firestore.transaction().get('hello/hellodoc').subscribe((payload1) => {
            console.log(payload1.data);
            payload1.next.get('batchHello/batchDoc').subscribe((payload2) => {
                console.log(payload2.data);
                payload2.next
                    .set('transaction/tranDoc', {hellofromTrans: 'this is a set from the transaction'})
                    .run()
                    .subscribe(() => console.log('transaction complete'));
            });
        });


        // Authentication
        this.auth.isAuthenticated().subscribe((isAuth) => {
            this.authState = isAuth;
        });


    }

    // Login Button Clicked
    login() {
        this.auth.signin('test@gmail.com', '123456');
    }
  
  // Login Button Clicked
    logout() {
        this.auth.signout();
    }


}
